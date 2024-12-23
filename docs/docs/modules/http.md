---
sidebar_position: 2
---

# http

this module is used for exposing http routes for use in apis and other purposes.

## concept

files are organized within the `http` directory in any manner desired. a common pattern used is to have directories in the same structure that your urls will ultimately be, however, this is entirely up to you. exa.js on start will process all files recursively that are present in the `http` directory.

## internal handling

http server and routes and implemented using express.js, a well known and trusted http server. everything express.js supports is also supported in exa.js.

## anatomy of an http file

the following is the structure of an http file

```js title="http/sample.js"
import authorized from '#app/middleware/authorized.js';

export default new class {

    routes = {
        'get /hello/world': 'world',
    }

    middleware = {
        '*': [authorized]
    }

    async world(req, res) {
        return res
            .status(200)
            .send({
                message: 'hello world'
            });
    }

};
```

### routes

each route is a key composed of the http method and route path or pattern with a string value of the name of the method it should call. because this just wraps express.js internally, it supports everything express.js supports, including:

basic routes
```js
routes = {
    'get /hello/world': 'world',
}
```

regex routes
```js
routes = {
    'get /pets/(dog|cat)': 'pet',
}
```

param routes
```js
routes = {
    'get /blogs/:blog_id': 'get_blog',
}
```

### middleware

one or more pieces of middleware can be ran prior to the route method being called. this middleware is great for many purposes such as authentication, setting context variables, or performing pre-route logic.

a middleware file looks like this:

```js title="middleware/authorized.js"
export default async (req, res, next) => {
    // middleware logic
    if (req.headers.authorization !== 'abc123') {
        return res
            .status(401)
            .send();
    }

    return next();
};
```

this middleware checks an api key to see if it's the right value. if it's not, a 401 unauthorized response is received, otherwise `next()` is called which either calls the next middleware in the chain or calls the route method.

to use middleware, add key/value pairs to the `middleware` object. the key should be the method name and the value should be an array of middleware to run.

```js
// apply authorized middleware to all routes
middleware = {
    '*': [authorized],
}

// apply authorized middleware to one route
middleware = {
    hello: [authorized],
}

// apply authorized middleware to all routes except for hello
middleware = {
    '*': [authorized],
    hello: []
}

// apply common and authorized middleware to all routes
middleware = {
    '*': [common, authorized],
}
```

middleware precedence is top to bottom. this is why everything works in the third example. `hello` has a value of blank array.
