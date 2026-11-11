---
sidebar_position: 6
---

# console

this module is used for creating console scripts that are intended to run independently from the rest of the application. these could be invoked by a developer manually or via cronjobs.

## concept

zero or more files are created in the `console` directory. each file represents a single script that can be ran. these scripts inherit all the same environment that the main application has, so from a runtime standpoint, both are equivalent.

## file structure

a console script looks like this:

```js title="console/sample.js"
export default new class {

    async run() {
        // do something here
        console.log('running console command `sample`');
    }

};
```

## staying alive

`console.exit` in `config/master.js` applies to every command. the default is `true`, so the process exits when `run()` finishes even if a database or redis connection is still open.

a single command can override that by setting `exit` on itself:

```js title="console/worker.js"
export default new class {

    exit = false

    async run() {
        // this command keeps running after run() returns
    }

};
```

leave `exit` unset to use the config value. a missing command still exits with code `1`.

## running a console command

all the following examples assume a script called `sample` is located at `console/sample.js`.

### bare metal

```bash
# from root directory
npm run console -- sample

# via cronjob
npm --prefix /path/to/app run console -- sample
```

### while using docker

```bash
# from root directory
./docker.sh console sample

# via cronjob
/path/to/app/docker.sh console sample
```
