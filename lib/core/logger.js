import chalk from 'chalk';

export default new class {

    error(...msg) {
        console.log(`${chalk.red('!')}`, ...msg);
    }

    warning(...msg) {
        console.log(`${chalk.yellow('*')}`, ...msg);
    }

    info(...msg) {
        console.log(`${chalk.cyan('*')}`, ...msg);
    }

}
