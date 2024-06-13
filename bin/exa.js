#!/usr/bin/env node

import init from './scripts/init.js';

let command = process.argv[2];

switch (command) {
    case 'init':
        init();
        break;
    default:
        console.log('exajs command not found');
}
