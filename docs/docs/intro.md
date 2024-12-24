---
sidebar_position: 1
sidebar_label: introduction
---

# exa.js

exa.js is a minimal node.js backend framework that has a strong focus on simplicity, modularity, and convention over configuration. it makes available the most important stuff needed for a node.js web framework, and nothing more.

## javascript's 10,000th framework

as if the javascript ecosystem needs another framework... i get it, but please know that this project is the culmination of ~10 years of professional development trying to understand what i/people really need in a framework. this project is the consolidated and cleaned up version of about 30 projects worth of boilerplate patchwork that has been unevenly iterated on and used in some form during this time. i'm certain you'll find use for it, and i certainly will.

## requirements

- node.js v10+
- optional: bun
- optional: docker

## get going in the next two minutes

```bash
# create a new directory for your project
mkdir myproject; cd myproject

# initialize
npx @exajs/core init

# start dev with auto reload
npm run watch

# test
curl http://127.0.0.1:8118/api/hello/world
```

## contributing

this project needs testing and bug fixes more than anything else. it also needs expansion of the core library of helper code.
