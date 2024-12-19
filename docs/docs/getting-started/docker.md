---
sidebar_position: 3
---

# docker

exa.js is intended to be used with or without docker in both development and production. in either case it's useful to rely on configuration via `.env` for variables that differ between environments as a `.env` file can easily be made available to docker containers. configuration via `config/master.js` is useful for variables related to exa.js itself as well as variables that don't change between environments.

## compose file

```txt title="docker-compose.yml"
services:
    app:
        container_name: exa_app
        image: node:20
        tty: true
        ports:
            - "8118:8118"
        volumes:
            - .:/opt/src
        working_dir: /opt/src
        command: >
            bash -c '
            if [ "$EXAENV" = "development" ]; then 
                npm i; npm run watch
            else 
                npm i; npx --yes jmig migrate; npm start
            fi'
        env_file:
            - .env
    console:
        container_name: exa_console
        image: node:20
        tty: true
        init: true
        volumes:
            - .:/opt/src
        working_dir: /opt/src
        env_file:
            - .env
        profiles:
            - nostart
```
