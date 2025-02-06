import crypto from 'node:crypto';

export default new class {

    sha1(string) {
        return crypto
            .createHash('sha1')
            .update(string?.toString() ?? crypto.randomBytes(1024))
            .digest('hex');
    }

    sha2(string) {
        return crypto
            .createHash('sha256')
            .update(string?.toString() ?? crypto.randomBytes(1024))
            .digest('hex');
    }

};
