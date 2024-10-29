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
        docker compose run --rm console %%RUNTIME%% app.js console ${@:2}
        ;;
    jmig* )
        docker compose exec app %%PACKAGE_X%% jmig ${@:2}
        ;;
    %%PACKAGE_M%%* )
        docker run -it --rm -v .:/opt/src -w /opt/src %%IMAGE%% %%PACKAGE_M%% ${@:2}
        ;;
esac
