import config from '#exa/core/config.js';
import connection from '#exa/database/connection.js';
import { glob } from 'glob';

let models = {};

export const init = async () => {
    let files = await glob(`${config.paths.root}${config.paths.models}/*.js`);

    for (const file of files) {
        let { default: model } = await import(file);
        let name = /([a-z_]+)\.js/.exec(file)[1];

        models[name] = model;
    }

    for (const model_name in models) {
        let model = models[model_name];

        model.init(
            model.fields,
            {
                sequelize: connection.instance,
                modelName: model.table_name,
                freezeTableName: true,
                hooks: model.hooks || {},
                ...(model.options || {})
            }
        );

        model.bulk_create = model.bulkCreate;
        model.find_one = model.findOne;
        model.find_all = model.findAll;
        model.find_or_create = model.findOrCreate;
        model.find_and_count_all = model.findAndCountAll;
        model.belongs_to = model.belongsTo;
        model.has_one = model.hasOne;
        model.has_many = model.hasMany;
        model.belongs_to_many = model.belongsToMany;
    }

    // process associations, must be done after all models have been initialized
    for (const model_name in models) {
        let model = models[model_name];

        model.associate && model.associate(models);
    }
};

export default models;
