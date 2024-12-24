---
sidebar_position: 1
---

# quickstart

## initialization

### with node.js

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

### with bun

```bash
# create a new directory for your project
mkdir myproject; cd myproject

# initialize
bunx @exajs/core init

# start dev with auto reload
bun run watch

# --or--

# start production
bun run start
```

initializing will create the exa.js template project structure in the current directory.

## usage

after starting, your terminal should show some startup information such as:

```bash
exa.js by tux - v0.0.17
-----------------------------
2024-12-23T23:09:26.400-06:00
-----------------------------
mode: development
server running on 0.0.0.0:8118
```

depending on which modules are enabled, there may be some additional output.

the seed project created after initialization has an api route `/api/hello/world` created. to see its output, run

```bash
curl http://127.0.0.1:8118/api/hello/world
```
