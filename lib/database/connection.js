import chalk from 'chalk';
import config from '#exa/core/config.js';
import { Sequelize } from 'sequelize';

let connection = {};

export const init = async () => {
    connection.sequelize = new Sequelize(
        config.database.name,
        config.database.username,
        config.database.password,
        {
            host: config.database.host,
            port: config.database.port,
            dialect: 'mysql',
            dialectOptions: {
                decimalNumbers: true,
                timezone: 'local',
            },
            logQueryParameters: config.environment.development,
            logging: config.environment.development
                ? args => console.log(chalk.blue(args))
                : false,
            timezone: 'UTC',
            define: {
                underscored: true,
                timestamps: false,
                charset: 'utf8'
            }
        }
    );
};

export default connection;
