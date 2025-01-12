export default new class {

    safe_parse(json, def) {
        try {
            return JSON.parse(json);
        } catch {
            return def ?? json;
        }
    }

    merge(...objects) {
        return objects.reduce((acc, obj) => {
            if (obj && typeof obj === 'object') {
                return { ...acc, ...obj };
            }
            return acc;
        }, {});
    }

    minify(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            return JSON.stringify(parsed);
        } catch (error) {
            throw new Error('invalid json');
        }
    }

    compare(obj1, obj2) {
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
            return obj1 === obj2;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        return keys1.every(key => {
            if (!keys2.includes(key)) {
                return false;
            }
            return this.compare(obj1[key], obj2[key]);
        });
    }

};
