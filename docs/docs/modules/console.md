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

## running a console command

all the following examples assume a script called `sample` is located at `console/sample.js`.

### bare metal

```bash
# from root directory
npm run sample

# via cronjob
npm --prefix /path/to/app run sample
```

### while using docker

```bash
# from root directory
./docker.sh console sample

# via cronjob
/path/to/app/docker.sh console sample
```
