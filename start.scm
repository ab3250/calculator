#! /usr/bin/env 
!#
 
(use-modules  
  (web request)
  (web response)
  (sxml simple)
  (web http)
  (web server)
  (web uri)
;;  (web client)
  (ice-9 rdelim)
  (rnrs bytevectors)
  (ice-9 binary-ports)
  (oop goops)
  (srfi srfi-18)
 ;; (system vm trace)
  (ice-9 iconv)
  (ice-9 receive)
  (ice-9 regex)
  (web socket server))

;;(include "ab-library.scm" )

(define (handler data) 
  (cond 
    ((string=? data "dig1")  (string-append "{ \"data\": "  "\" " data "\"}" ))
    ((string=? data "dig2")  (string-append "{ \"data\": "  "\" " data "\"}"))
    (else #f)))
    
(run-ws-server handler (make-server-socket #:port 9090))


