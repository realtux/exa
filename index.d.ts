declare module '@exajs/core' {
    const exa: any;
    export default exa;
}

declare module '@exajs/core/database' {
    const connection: any;
    const models: any;
    export { connection, models };
}

declare module '@exajs/core/database/models' {
    const models: any;
    export default models;
}

declare module '@exajs/core/database/connection' {
    const connection: any;
    export default connection;
}

declare module '@exajs/core/system/sequelize' {
    const sequelize: any;
    export default sequelize;
    export * from 'sequelize';
}

declare module '@exajs/core/util' {
    import hash from '#exa/util/hash.js';
    import json from '#exa/util/json.js';
    import string from '#exa/util/string.js';
    export { hash, json, string };
}
