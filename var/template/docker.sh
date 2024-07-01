#!/usr/bin/env bash

# load env
. .env

# switch to current directory
cd $(dirname "$0")

case $* in
    console* )
        docker compose run --rm console node app console ${@:2}
        ;;
    jmig* )
        docker compose exec app npx jmig ${@:2}
        ;;
    npm* )
        docker run -it --rm -v .:/opt/src -w /opt/src node:20 npm ${@:2}
        ;;
esac
