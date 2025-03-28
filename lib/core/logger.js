import chalk from 'chalk';

export default new class {

    error(...msg) {
        console.log(`${chalk.red('!')}`, ...this.dim(...msg));
    }

    error_no_dim(...msg) {
        console.log(`${chalk.red('!')}`, ...msg);
    }

    warning(...msg) {
        console.log(`${chalk.yellow('*')}`, ...msg);
    }

    info(...msg) {
        console.log(`${chalk.cyan('*')}`, ...msg);
    }

    dim(...msg) {
        return msg.map(line => {
            if (typeof line !== 'string') {
                return line;
            }

            return line
                .split('\n')
                .map(line => {
                    if (line.match(/^\s*at.+(node_modules|node:internal)/gi)) {
                        return chalk.gray(line);
                    }
                    return line;
                })
                .join('\n');
        });
    }

}
