#! /usr/bin/env guile
!#
 
(use-modules  
  (web request)
  (web response)
  (sxml simple)
  (web http)
  (web server)
  (web uri)
  ;;(web client)
  (ice-9 rdelim)
  (rnrs bytevectors)
  (ice-9 binary-ports)
  (oop goops)
  (ice-9 iconv)
  (ice-9 receive)
  (ice-9 regex))

(include "calc-library.scm" )

(define (page-handler request body)
  (cond
   ;;reject empty uri
   ((equal? (request-path-components request) '())
    (not-found request))
   ;;ajax
   ((equal? (request-path-components request) '("ajax")) ;if ajax call
    (respondXHR `(btn ,(parse-payload body))))
   ;process all file requests with approved extensions
   ((regexp-exec regex-extensions (get-extension(last-element (request-path-components request))))
    (static-page request body))
   (else (not-found request))))
    
(run-server page-handler)

