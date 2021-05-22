#! /usr/bin/env 
!#
 
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
  (oop goops)
  (srfi srfi-18)
  (ice-9 iconv)
  (ice-9 receive)
  (ice-9 regex)
  (web socket server))

;;regex objects for button press or command from ajax
;;operation operators, commands, digits, and refresh display directive
(define regex-opr (make-regexp "^opr([a]|[s]|[d]|[m]|[c]|[r]|[e])$"))
;;(define regex-cmd (make-regexp "^cmd([e])$"))
(define regex-dig (make-regexp "^dig([0-9]{1}|[p])$"))
(define regex-dsp (make-regexp "^dsp$"))


(define (handler data) 
	(let ((digit (string (string-ref data 3))))
	  (cond 
	    ((regexp-exec regex-dig data)    	
	    	(string-append "{ \"data\": "  "\" " digit "\"}" ))
	    ((regexp-exec regex-opr data)
	    	(string-append "{ \"data\": "  "\" " digit "\"}" ))
	    (else #f))))
    
(run-ws-server handler (make-server-socket #:port 9090))


