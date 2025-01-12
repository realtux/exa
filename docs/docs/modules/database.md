---
sidebar_position: 4
---

# database

the database module facilitates connecting exa.js to an external database. this module is a thin wrapper around the great and powerful [sequelize.js](https://sequelize.org/) project. the main purpose is to expose and configure models in a slightly more intutitive way.

## anatomy of a model

each model represents a table in the database and is created in the `models` directory. in this example, we'll create a new model to represent a `users` table at `models/users.js`. this example also references an `orgs` model. you'll have to pretend that it exists for now.

```js title="models/users.js"
import { Model, DataTypes } from '@exajs/core/system/sequelize';
import util from '#app/library/util.js';

class users extends Model {

    static table_name = 'users'

    static fields = {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        org_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        content: DataTypes.DESCRIPTION,
        created_at: DataTypes.DATE,
    }

    static associate(models) {
        // associate users to orgs (orgs model must exist obviously)
        models.users
            .belongsTo(models.orgs, {
                as: 'orgs',
                foreignKey: 'org_id',
            });
    }

    static hooks = {
        async beforeCreate(instance) {
            instance.created_at = util.now();
        }
    }

    static options = {
        // sequelize specific options
    }

    static model_method() {
        // method available at users.model_method();
    }

}

export default users;
```

### table_name

specify the name of the table here, pretty straight forward. this will be mapped onto `options.modelName` for sequelize internally.

### fields

defines all fields of a database and their associated types (https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types). this is necessary for proper mapping of mysql types to javascript types. this will be supplied directly to the sequelize `model.init()` function.

### associate

this is a function that will be called (if it exists) after all models have been initialized. the `models` variable will be an object containing all initialized models from the `models/*` directory. sequelize supports associations (https://sequelize.org/docs/v6/core-concepts/assocs/) to perform eager loading in queries and this is a perfect place to organize these associations.

note that although sequelize documents associations being as simple as `A.belongsTo(B)`, in practice this only works when taking advantage of sequelize's conventions which sometimes have bad side effects. this module aims to remove these conventions in favor of more developer control.

what this means is associations in exa.js will require the use of `as` and `foreignKey` almost always, since the alias and foreign key won't be inferred for you. although this is a little extra work, it removes to possibility of encountering convention related problems later.

### hooks

sequelize supports a number of lifecycle hooks (https://sequelize.org/docs/v6/other-topics/hooks/) that can be used to run code at various key points. this will be mapped onto `options.hooks` for sequelize internally.

## options

anything in this object is merged in with the model options for sequelize. this can be used to supply other options or configuration that isn't exposed with the exa.js wrapper.

### other methods

any other static methods created in the model will also be available statically when including the model in your application.

## using a model

so now you have a model, time to use it. say you wanted to create an http route to return all users. to do this, create an http file `http/api/users.js`

```js title="http/api/users.js"
import { models } from '@exajs/core/database';

export default new class {

    routes = {
        'get /api/users': 'all',
    }

    async all(req, res) {
        let users = await models.users
            .findAll();

        return res
            .status(200)
            .send(users);
    }

};
```

:::tip[Tip]
models can also be imported directly such as `import users from '#app/models/users.js';`. we find this unnecessarily reserves important variables (`users` in this case) and probably should be avoided, but know that it is an option.
:::
