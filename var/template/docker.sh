#!/usr/bin/env bash

# load env
. .env

# switch to current directory
scriptdir=$(dirname "$0")
cd $scriptdir

case $* in
    console* )
        docker compose run --rm console node app console ${@:2}
        ;;
    rmig* )
        docker compose exec app rmig ${@:2}
        ;;
    npm* )
        docker run -it --rm -v .:/opt/src -w /opt/src node:20 npm ${@:2}
        ;;
esac