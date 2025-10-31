import { DateTime } from 'luxon';

export default new class {

    field_transforms = {}

    validate(values, ruleset) {
        let errors = [];

        for (const [field, rules] of Object.entries(ruleset)) {
            if (!rules) {
                continue;
            }

            for (const rule of rules.split('|')) {
                const formatted_field = this.capitalize(field);
                const params = rule.split(':');
                const type = params[0];

                let required = ['req', 'req_or'].includes(type);

                if (!required && values[field] == null) {
                    continue;
                }

                switch (type) {
                    case 'req':
                        if (!values[field] && values[field] !== false) {
                            errors.push({
                                field,
                                error: `${formatted_field} is required but not supplied`
                            });
                        }
                        break;
                    case 'req_or':
                        if (values[params[1]]) {
                            continue;
                        }
                        if (!values[field]) {
                            errors.push({
                                field,
                                error: `${formatted_field} (or ${this.capitalize(params[1])}) is required but not supplied`
                            });
                        }
                        break;
                    case 'min': {
                        let min_length = +params[1];

                        if (values[field]?.length < min_length) {
                            errors.push({
                                field,
                                error: `${formatted_field} must be at least ${min_length} characters`
                            });
                        }
                        break;
                    }
                    case 'max': {
                        let max_length = +params[1];

                        if (values[field]?.length > max_length) {
                            errors.push({
                                field,
                                error: `${formatted_field} must be less than ${max_length} characters`
                            });
                        }
                        break;
                    }
                    case 'email':
                        if (typeof values[field] !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[field])) {
                            errors.push({
                                field,
                                error: `${formatted_field} must be a valid email address`
                            });
                        }
                        break;
                    case 'str':
                        if (typeof values[field] !== 'string') {
                            errors.push({
                                field,
                                error: `${formatted_field} must be a string`
                            });
                        }
                        break;
                    case 'bool':
                        if (typeof values[field] !== 'boolean') {
                            errors.push({
                                field,
                                error: `${formatted_field} must be true/false`
                            });
                        }
                        break;
                    case 'int': {
                        let nan = isNaN(parseInt(values[field]));

                        if (nan) {
                            errors.push({
                                field,
                                error: `${formatted_field} must be an integer`
                            });
                        }
                        break;
                    }
                    case 'float': {
                        let nan = isNaN(parseFloat(values[field]));

                        if (nan) {
                            errors.push({
                                field,
                                error: `${formatted_field} must be a decimal`
                            });
                        }
                        break;
                    }
                    case 'array':
                        if (!Array.isArray(values[field])) {
                            errors.push({
                                field,
                                error: `${formatted_field} must be an array`
                            });
                        }
                        break;
                    case 'isodate': {
                        let date = DateTime.fromISO(values[field]);

                        if (!date.isValid) {
                            errors.push({
                                field,
                                error: `${formatted_field} must be a valid ISO date`
                            });
                        }
                        break;
                    }
                }
            }
        }

        return errors;
    }

    to_string(errors) {
        return errors.join('\n');
    }

    capitalize(text) {
        if (this.field_transforms[text]) {
            return this.field_transforms[text];
        }

        return text.toLowerCase()
            .replace(/_/gi, ' ')
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }

}
