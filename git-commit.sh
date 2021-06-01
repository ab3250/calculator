#!/usr/bin/env bash
git add .
git commit -m "$(date +"%Y_%m_%d_%I_%M_%p")"
git push -u origin master
git push -u local master



#GUILE_LOAD_PATH="$PWD:$GUILE_LOAD_PATH" guile test.scm
#/media/stor/gentoo-files/execs/compilers/programs/scheme/guile/SSE/upstream/guile-websocket#
#sudo lighttpd -D -f /etc/lighttpd/lighttpd.conf
