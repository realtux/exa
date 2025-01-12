---
sidebar_position: 7
---

# views

sometimes an application is not api first and should render traditional html views. the views module facilitates exactly this.

## creating a view

the built-in template engine for exa.js is `nunjucks`. documentation for this template engine can be viewed here: https://mozilla.github.io/nunjucks/.

start by creating a new template in the views folder called `sample.html`

```html title="views/sample.html"
<h4>my first exa.js app</h4>

my name is {{ name }} and i am {{ age }} years old.

here are a list of things i like:
<ul>
    {% for like in likes %}
        <li>{{ like }}</li>
    {% endfor %}
</ul>
```

## use view in http route

create a route which will render a view including variable substitutions.

```js title="http/sample.js"
export default new class {

    routes = {
        'get /': 'home',
    }

    async home(req, res) {
        return res
            .status(200)
            .render('sample.html', {
                name: 'bob',
                age: 42,
                likes: ['tacos', 'dogs', 'ice cream']
            });
    }

};
```

## using other view engines

not supported at the moment but will be in a future version.
