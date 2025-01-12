---
sidebar_position: 2
---

# project structure

this is an overview of each directory in the project and what it is for. this is also the directories present after initialization. everything here is documented in sections under modules.

## directories

### config ([/modules/configuration](/modules/configuration))
contains configuration files for your exa.js project

### console ([/modules/console](/modules/console))
contains console scripts that are intended to be ran in a terminal directly or via cron job.

### http ([/modules/http](/modules/http))
contains api logic organized in one or more files. each file contains route definitions, middleware, and handlers.

### library
contains user defined library files. this is generally relevant js files for your project that don't fit anywhere else. what exists in this folder is not processed or seen by exa.js at all.

### middleware ([/modules/http#middleware](/modules/http#middleware))
contains express.js compatible middleware. middleware is configured for use in api logic.

### migrations ([/modules/migrations](/modules/migrations))
contains [jmig](https://github.com/realtux/jmig) compatible database migrations files. these are used to apply and rollback changes to a database.

### models ([/modules/database](/modules/database))
contains sequelize.js compatible database model files. to use a different database orm, set `database.use = false` in `config/master.js` which will disable automatic initialization of the `models` directory. see docs for proper format.

### public
contains publicly available static files.

### var
contains variable static data, use this to store files that aren't directly used in your project, such as docs, sql files, notes, etc. as with library, what exists in this folder is not processed or seen by exa.js at all.

### views ([/modules/views](/modules/views))
contains view templates for traditional non-async frontends. use `res.render(path, variables)` instead of `res.send()` in your api logic.

### websocket ([/modules/websockets](/modules/websockets))
contains files that represent websocket connection entrypoints. see docs for proper format.
