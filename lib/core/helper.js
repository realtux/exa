export default new class {

    deep_merge(target, source) {
        if (typeof target === 'object' && target !== null &&
            typeof source === 'object' && source !== null) {

            for (const key of Object.keys(source)) {
                if (typeof source[key] === 'object' && source[key] !== null) {
                    if (!target.hasOwnProperty(key)) {
                        target[key] = Array.isArray(source[key]) ? [] : {};
                    }

                    this.deep_merge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }

        return target;
    }

}
