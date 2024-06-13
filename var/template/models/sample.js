import { Model, DataTypes } from '@exajs/core/system/sequelize';
import util from '#app/library/util.js';

class sample extends Model {

    static table_name = 'sample'

    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: DataTypes.TEXT,
        created_at: DataTypes.DATE,
    }

    static hooks = {
        async beforeCreate(instance) {
            instance.created_at = util.now();
        }
    }

}

export default sample;
