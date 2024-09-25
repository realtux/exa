export default new class {

    ucwords(string) {
        return (string + '')
            .toLowerCase()
            .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, result => {
                return result.toUpperCase();
            });
    }

    to_slug(string) {
        return (string + '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 ]+/g, '')
            .replace(/ +/g, '-');
    }

    to_currency(amount) {
        if (!amount || isNaN(amount)) {
            return '$0.00';
        }

        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });

        return formatter.format(amount);
    }

    strip_html(str) {
        if (typeof str !== 'string') {
            return str;
        }

        return str.replace(/<(?:.|\n)*?>/gm, '');
    }

};
