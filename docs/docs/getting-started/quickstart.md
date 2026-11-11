---
sidebar_position: 1
---

# quickstart

## initialization

```sh
# create a new directory for your project
mkdir myproject; cd myproject

# initialize
npx @exajs/core init

# start dev with auto reload
npm run watch

# --or--

# start production
npm start
```

initializing will create the exa.js template project structure in the current directory.

## usage

after starting, your terminal should show some startup information such as:

```bash
exa.js by tux - v0.0.32
--------------------------
mode: development
time: 2024-12-23T23:09:26.400-06:00
```

depending on which modules are enabled, there may be some additional output.

the seed project created after initialization has an api route `/api/hello/world` created. to see its output, run

```bash
curl http://127.0.0.1:8118/api/hello/world
```
