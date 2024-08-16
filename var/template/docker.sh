#!/usr/bin/env bash

# load env
. .env

# switch to current directory
cd $(dirname "$0")

case $* in
    dev* )
        docker compose up
        ;;
    start* )
        docker compose up -d
        ;;
    stop* )
        docker compose down
        ;;
    shell* )
        docker compose exec app bash
        ;;
    console* )
        docker compose run --rm console node app.js console ${@:2}
        ;;
    jmig* )
        docker compose exec app npx jmig ${@:2}
        ;;
    npm* )
        docker run -it --rm -v .:/opt/src -w /opt/src node:20 npm ${@:2}
        ;;
esac
