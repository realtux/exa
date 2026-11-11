export default new class {

    // plain objects merge. arrays and every other value replace what is there
    deep_merge(target, source) {
        if (typeof target !== 'object' || target === null || Array.isArray(target)) {
            return source;
        }

        if (typeof source !== 'object' || source === null || Array.isArray(source)) {
            return source;
        }

        for (const key of Object.keys(source)) {
            let value = source[key];
            let current = target[key];

            let value_is_object = typeof value === 'object' && value !== null && !Array.isArray(value);
            let current_is_object = typeof current === 'object' && current !== null && !Array.isArray(current);

            if (value_is_object) {
                if (!current_is_object) {
                    target[key] = {};
                }

                this.deep_merge(target[key], value);
                continue;
            }

            target[key] = value;
        }

        return target;
    }

}
