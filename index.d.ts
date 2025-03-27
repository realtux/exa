declare module '@exajs/core' {
    const exa: any;
    export default exa;
}

declare module '@exajs/core/database' {
    const connection: any;
    const models: any;
    export { connection, models };
}

declare module '@exajs/core/system/sequelize' {
    const sequelize: any;
    export default sequelize;
    export * from 'sequelize';
}

declare module '@exajs/core/util' {
    class Hash {
        sha1(string?: any): string;
        sha2(string?: any): string;
    }
    class Json {
        safe_parse(json: string, def?: any): any;
        merge(...objects: any[]): object;
        minify(jsonString: string): string;
        compare(obj1: any, obj2: any): boolean;
    }
    class String {
        ucwords(string: any): string;
        to_slug(string: any): string;
        to_currency(amount: any): string;
        strip_html(str: any): any;
    }

    export const hash: Hash;
    export const json: Json;
    export const string: String;
}
