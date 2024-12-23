---
sidebar_position: 3
---

# docker

exa.js is intended to be used with or without docker in both development and production. in either case it's useful to rely on configuration via `.env` for variables that differ between environments as a `.env` file can easily be made available to docker containers. configuration via `config/master.js` is useful for variables related to exa.js itself as well as variables that don't change between environments.

## compose file

the only item in the docker compose file that may need to be changed is the port number. by default it uses the same port that is configured in `config/master.js` for the app.

```yaml title="docker-compose.yml"
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

## helper script

for your convenience, a docker helper script is located in the root directory to help interact with an exa.js project running in docker more easily. the helper script has the following functions:

- `./docker.sh dev` - starts app in foreground
- `./docker.sh start` - starts app in background
- `./docker.sh stop` - stops app
- `./docker.sh shell` - opens shell to the container running the app
- `./docker.sh console <name>` - runs a console command by name
- `./docker.sh jmig <command>` - runs jmig in the app container
  * requires the app to be running
- `./docker.sh npm <args>` - runs npm in the root directory of the app

:::tip[Tip]
if your project was initialized to use `bun`, swap `npm` for `bun` anywhere it appears
:::
