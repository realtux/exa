## exa.js by [tux](https://github.com/realtux)
exa.ja is a minimal node.js web framework that has a strong focus on simplicity, modularity, and convention over configuration.

---

### quickstart
```bash
npx @exajs/core init [project name]
```
this will create the exa.js template project structure in the current directory. a brief description of this template is below.

---

### project template
- **config**  
*contains a `master.js` configuration file. this is used for project level configuration. for environment level configuration, it's recommended to use a `.env` file in the root and transfer relevant env using `process.env` into `master.js`.*

- **console**  
*contains console scripts that can be invoked with `npm run console <script name>`. see docs for proper format.*

- **http**  
*contains api logic organized in one or more files. each file contains route definitions, middleware, and handlers. see docs for proper format*

- **library**  
*contains user defined library files. this is generally relevant js files for your project that don't fit anywhere else.*

- **middleware**  
*contains express.js compatible middleware. middleware is configured for use in api logic.*

- **models**  
*contains sequelize.js compatible database model files. to use a different database orm, set `database.use = false` in `config/master.js` which will disable automatic initialization of the `models` folder.*

- **public**
*contains publicly available static files. in development, this is served with `express.static()` at base url `/public`. in production, this should be served with a normal web server.*

- **views**  
*contains view templates for traditional non-async frontends. use `res.render(path, variables)` instead of `res.send()` in your api logic.*

---

### modularity options
the most amount of features are enabled by default since none of them clash. to disable a specific feature of your project and replace it with something else, set `use: false` for the corresponding key in `config/master.js`.

the following features can be disabled if desired:
- console
- http
- models (database)
- public
- views
