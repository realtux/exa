---
sidebar_position: 3
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
