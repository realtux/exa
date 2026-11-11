import chalk from 'chalk';
import config from '#exa/core/config.js';
import { Sequelize } from 'sequelize';

let connection = {};

export const init = async () => {
    let options = {
        host: config.database.host,
        port: config.database.port,
        dialect: config.database.dialect,
        dialectOptions: {
            decimalNumbers: true,
        },
        logQueryParameters: config.environment.development,
        logging: config.environment.development
            ? args => console.log(chalk.blue(args))
            : false,
        define: {
            underscored: true,
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
        },
    };

    // sqlite rejects every timezone except +00:00, and it already returns utc
    if (config.database.dialect !== 'sqlite') {
        options.timezone = config.database.timezone;
    }

    connection.instance = new Sequelize(
        config.database.name,
        config.database.username,
        config.database.password,
        options,
    );
};

export default connection;
