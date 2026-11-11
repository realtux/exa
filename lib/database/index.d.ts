import { Model, ModelStatic, Sequelize } from 'sequelize';

export type exa_model = ModelStatic<Model> & {
    bulk_create: ModelStatic<Model>['bulkCreate'],
    find_one: ModelStatic<Model>['findOne'],
    find_all: ModelStatic<Model>['findAll'],
    find_or_create: ModelStatic<Model>['findOrCreate'],
    find_and_count_all: ModelStatic<Model>['findAndCountAll'],
    belongs_to: ModelStatic<Model>['belongsTo'],
    has_one: ModelStatic<Model>['hasOne'],
    has_many: ModelStatic<Model>['hasMany'],
    belongs_to_many: ModelStatic<Model>['belongsToMany'],
};

export const connection: {
    instance: Sequelize,
};

export const models: Record<string, exa_model>;
