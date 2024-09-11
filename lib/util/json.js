export default new class {

    safe_parse(json, def) {
        try {
            return JSON.parse(json);
        } catch {
            return def ?? json;
        }
    }

};
