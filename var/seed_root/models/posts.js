const Sequelize = require('sequelize');

export default (sequelize, DataTypes) => {
    class posts extends Sequelize.Model {

    }

    posts.init(
        {
            post_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            body: DataTypes.TEXT,
            created_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'posts',
            freezeTableName: true,

            hooks: {
                async beforeCreate(instance) {
                    instance.created_at = util.now();
                }
            }
        }
    );

    return posts;
};
