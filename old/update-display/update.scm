(define (update-display-text data)
  (set! dsp-data (zip
		  (string->list
		   (substring
		    (string-delete (lambda(x)(eqv? x #\.))
				   (format  #f "~11,,,@a" (format #f "~11,,,@s" data))) 1 10))
		  '(#\" #\. #\" #\" #\" #\" #\" #\" #\" #\"))))


(define (format:out-fixed modifier number pars)
    (unless (or (number? number) (string? number))
      (format-error "argument is not a number or a number string"))

    (let ((l (length pars)))
      (let ((width (format:par pars l 0 #f "width"))
            (digits (format:par pars l 1 #f "digits"))
            (scale (format:par pars l 2 0 #f))
            (overch (format:par pars l 3 #f #f))
            (padch (format:par pars l 4 format:space-ch #f)))

        (cond
         ((and (number? number)
               (or (inf? number) (nan? number)))
          (format:out-inf-nan number width digits #f overch padch))

         (digits
          (format:parse-float number #t scale)
          (if (<= (- format:fn-len format:fn-dot) digits)
              (format:fn-zfill #f (- digits (- format:fn-len format:fn-dot)))
              (format:fn-round digits))
          (if width
              (let ((numlen (+ format:fn-len 1)))
                (when (or (not format:fn-pos?) (eq? modifier 'at))
                  (set! numlen (+ numlen 1)))
                (when (and (= format:fn-dot 0) (> width (+ digits 1)))
                  (set! numlen (+ numlen 1)))
                (when (< numlen width)
                  (put-fill-chars (- width numlen) (integer->char padch)))
                (if (and overch (> numlen width))
                    (put-fill-chars width (integer->char overch))
                    (format:fn-out modifier (> width (+ digits 1)))))
              (format:fn-out modifier #t)))

         (else
          (format:parse-float number #t scale)
          (format:fn-strip)
          (if width
              (let ((numlen (+ format:fn-len 1)))
                (when (or (not format:fn-pos?) (eq? modifier 'at))
                  (set! numlen (+ numlen 1)))
                (when (= format:fn-dot 0)
                  (set! numlen (+ numlen 1)))
                (when (< numlen width)
                  (put-fill-chars (- width numlen) (integer->char padch)))
                (if (> numlen width)	; adjust precision if possible
                    (let ((dot-index (- numlen
                                        (- format:fn-len format:fn-dot))))
                      (if (> dot-index width)
                          (if overch ; numstr too big for required width
                              (put-fill-chars width (integer->char overch))
                              (format:fn-out modifier #t))
                          (begin
                            (format:fn-round (- width dot-index))
                            (format:fn-out modifier #t))))
                    (format:fn-out modifier #t)))
              (format:fn-out modifier #t)))))))


 ;; format general flonums (~G)

  (define (format:out-general modifier number pars)
    (unless (or (number? number) (string? number))
      (format-error "argument is not a number or a number string"))

    (let ((l (length pars)))
      (let ((width (if (> l 0) (list-ref pars 0) #f))
            (digits (if (> l 1) (list-ref pars 1) #f))
            (edigits (if (> l 2) (list-ref pars 2) #f))
            (overch (if (> l 4) (list-ref pars 4) #f))
            (padch (if (> l 5) (list-ref pars 5) #f)))
        (cond
         ((and (number? number)
               (or (inf? number) (nan? number)))
          ;; FIXME: this isn't right.
          (format:out-inf-nan number width digits edigits overch padch))
         (else
          (format:parse-float number #t 0)
          (format:fn-strip)
          (let* ((ee (if edigits (+ edigits 2) 4)) ; for the following algorithm
                 (ww (if width (- width ee) #f)) ; see Steele's CL book p.395
                 (n (if (= format:fn-dot 0) ; number less than (abs 1.0) ?
                        (- (format:fn-zlead))
                        format:fn-dot))
                 (d (if digits
                        digits
                        (max format:fn-len (min n 7)))) ; q = format:fn-len
                 (dd (- d n)))
            (if (<= 0 dd d)
                (begin
                  (format:out-fixed modifier number (list ww dd #f overch padch))
                  (put-fill-chars ee #\space)) ;~@T not implemented yet
                (format:out-expon modifier number pars))))))))
