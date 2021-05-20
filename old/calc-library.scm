;;
;;
;;
(use-modules  
  (web request)
  (web response)
  (sxml simple)
  (web http)
  (web server)
  (web uri)
  (ice-9 rdelim)
  (rnrs bytevectors)
  (ice-9 binary-ports)
  (ice-9 regex)
  (ice-9 format)
  (srfi srfi-1)
  (ice-9 string-fun)
  (ice-9 iconv))

(include "mime-lib.scm" )

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;regex objects for button press or command from ajax
;;operation operators, commands, digits, and refresh display directive
(define regex-opr (make-regexp "^opr([a]|[s]|[d]|[m]|[c]|[r]|[e])$"))
;;(define regex-cmd (make-regexp "^cmd([e])$"))
(define regex-dig (make-regexp "^dig([0-9]{1}|[p])$"))
(define regex-dsp (make-regexp "^dsp$"))
;;display register
(define dsp-data "")
;;accepted filetype extensions
(define regex-extensions (make-regexp "^(png|html|js|css|ico)$"))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(define (request-path-components request)
  (split-and-decode-uri-path (uri-path (request-uri request))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(define (not-found request)
  (values (build-response #:code 404)
          (string-append "Resource not found: "
                         (uri->string (request-uri request)))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(define (static-page request body)
  (let ((file-path (string-append "." (uri-path (request-uri request)))))
    (if (file-exists? file-path)
        ;; if file exists
        (let* ((mime-type (mime-guess (get-extension file-path))))
          (if (text-mime-type? mime-type)
              ;; if mime-type text use these values &
              ;; send file port to html port
              (values
               `((content-type . (,mime-type)))
               (lambda (out-port)
                 (call-with-input-file file-path
                   (lambda (in-port)
                     (display (read-delimited "" in-port)
                              out-port)))))
              ;; if mime-type not text use these values
              (values
               `((content-type . (,mime-type)))
               (call-with-input-file file-path
                 (lambda (in-port)
                   (get-bytevector-all in-port))))))
        ;; if file doesn't exist          
        (not-found request))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;respond to ajax calls
(define* (respondXHR #:optional body #:key
		     (status 200)
		     (content-type-params '((charset . "utf-8")))
		     (content-type 'text/html)
		     (extra-headers '())
		     (sxml body))
  (values (build-response
           #:code status
           #:headers `((content-type
                        . (,content-type ,@content-type-params))
                       ,@extra-headers))
          (lambda (port)
            (if sxml                                
                  (sxml->xml body port)))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;called by ajax on each button press
(define (parse-payload body)
  (begin 
    (define btnpress (bytevector->string body "utf-8"))
    (cond
     ;;;;refresh display
     ;;
     ((regexp-exec regex-dsp btnpress)
	dsp-data)
#|
     ;;;;process commands
     ;;
     ((regexp-exec regex-cmd btnpress)
	(update-display-text "cmd")
	dsp-data)
|#
     ;;;;process operators
     ;;
     ((regexp-exec regex-opr btnpress)
      (update-display-text "opr")
      dsp-data)
     ;;;;process digits
     ;;
     ((regexp-exec regex-dig btnpress)
      (update-display-text "dig")
      545500)
     ;;;;unknown button
     ;;
     (else
      (update-display-number -1000004000.1)
      dsp-data))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define (update-display-number data)
  (set! dsp-data (zip (string->list (string-delete (lambda(x)(eqv? x #\.))(format #f "~9,9,2g" data))) '(#\" #\" #\" #\" #\" #\" #\" #\" #\" #\")))
  (display (format #f "~9,,2g" data)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define (update-display-text data)
  (set! dsp-data (zip (string->list (substring(string-delete (lambda(x)(eqv? x #\.)) (format  #f "~11,,,@a" (format #f "~11,,,@s" data))) 1 10)) '(#\" #\. #\" #\" #\" #\" #\" #\" #\" #\"))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(define (clear-display)
  (begin
    (update-display-text "")))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;run at start

((lambda()
   (begin
     (clear-display))))


;;;;;;;

(define (last-element l)
  (cond ((null? (cdr l)) (car l))
        (else (last-element (cdr l)))))
;;;;;;;
;;;;;;;
;;;;;;;
;;;;;;;
(define (format-data-for-display number)(
  (if #t '(#\0))
  ;(zip (string->list(format #f "~10d" (* 100 number))) '(#\" #\" #\" #\" #\" #\" #\" #\. #\" #\"))
    ;(let ((num (string->list(number->string 0))) (displist (make-list 19 #\")))
            ;3
           
            ;displist
           ; '(#\0 #\" #\1 #\" #\2 #\" (#\3 #\" #\4 #\" #\5 #\" #\6 #\" #\7 #\" #\8 #\" #\9)
            ;(format #f "~1,2,,,'*f" 1.5)
          ;(zip '(#\" #\" #\" #\" #\" #\" #\" #\" #\")  (string->list(format #f "~9,2,2,2,'A,'$,'Ef" 999.0)))
          
          ;(zip (string->list(format #f "~10d" (* 100 number))) '(#\" #\" #\" #\" #\" #\" #\" #\. #\" #\")))
          ;'(#\0 #\" #\1 #\" #\2 #\" #\3 #\" #\4 #\" #\5 #\" #\6 #\" #\7 #\" #\8 #\" #\9)
            ; (let loop (len 19)(arr '())
            ;   (if (eq? len 19)
            ;   len
            ;   (loop (- len 1)(append arr #\"))
            ;   )
            ; )
;(if (#f) (display "g")(display "h"))

))



#|
(define* (respondSSE #:optional body #:key
  (status 200)
  (content-type-params '((charset . "utf-8")))
  (content-type 'text/event-stream)
  (extra-headers '((Cache-Control . "no-cache")))
  (sxml body))
(display body)
(values (build-response
           #:code status
           #:headers `((content-type
                        . (,content-type ,@content-type-params))
                       ,@extra-headers))
          (lambda (port)
            (if sxml
                (begin                 
                  (sxml->xml body port))))))
;;;;
(define number 0)
;;;;
|#
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
#|
(define* (respond #:optional body #:key
		  (status 200)
		  (title "Hello hello!")
		  (doctype "<!DOCTYPE html>\n")
		  (content-type-params '((charset . "utf-8")))
		  (content-type 'text/html)
		  (extra-headers '())
		  (sxml (and body (templatize title body))))
  (values (build-response
           #:code status
           #:headers `((content-type
                        . (,content-type ,@content-type-params))
                       ,@extra-headers))
          (lambda (port)
            (if sxml
                (begin
                  (if doctype (display doctype port))
                  (sxml->xml sxml port))))))
|#
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
#|
(define (templatize title body)
  `(html (head (title ,title))
         (body ,@body)))
|#
