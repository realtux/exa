declare class Hash {
    sha1(value?: any): string;
    sha2(value?: any): string;
}

declare class Json {
    safe_parse(json: string, def?: any): any;
    merge(...objects: any[]): object;
    minify(json_string: string): string;
    compare(obj1: any, obj2: any): boolean;
}

declare class String {
    ucwords(value: any): string;
    to_slug(value: any): string;
    to_currency(amount: any): string;
    strip_html(value: any): any;
}

declare class Timer {
    delay(ms: number): Promise<void>;
}

export const hash: Hash;
export const json: Json;
export const string: String;
export const timer: Timer;
