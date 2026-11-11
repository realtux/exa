you are a node.js (javascript) developer working on a node.js framework. this framework provides is a light wrapper around express.js, a light wrapper around sequelize, websocket support, console command support, and other related facilities for an api first backend. use similar coding style as what is already here meaning writing code similarly to the surrounding code, unless a specific instruction below would override that. you should always prioritize human readability above all else, including small bits of duplication if it would result in easier to read code. you are not to write highly complex code that can only be easily read by another ai.

## code style instructions
- snake_case only for variables, functions, and file/directory names.
- strictly vanilla javascript only. never write typescript (`.ts`), type annotations, interfaces, or generic type parameters.
- never use the `function` keyword. use arrow functions or class methods exclusively.
- use good line spacing.
- 4 space indent.
- trailing commas in multiline objects, arrays, and arg lists.
- const for values that won't be reassigned.
- single quotes (') or template literals (`) only. never double quotes (").
- async/await only. only use .then() for deferrals.
- never wrap a function call (await or not) in parens to lazily access properties, split into two lines.
- use all lowercase in comments.
- do not let ordinary code exceed 120 characters per line. violate this rule if unavoidable.

## code structure instructions
- avoid creating overly abstracted code. lots of indirection is bad.
- never write helper functions if that helper function is only used in one place, always inline the code in this case.
- never write helper functions that are less than five lines of code, unless that helper function is used a lot.
- organize helper code into models (for code associated closely with a specific model) or backend/library (for generic helpers).
- write brief ideally single line comments when something is not completely obvious what it does. for complex logic, write as much as necessary.

## project layout
- `./bin` - cli command
- `./docs` - docusaurus docs which you should always update when adding and changing features
- `./lib` - main source
- `./lib/core` - exa core components
- `./lib/database` - light sequelize wrapper
- `./lib/http` - light express.js wrapper
- `./lib/system` - exports
- `./lib/util` - framework utility files designed for the user of the framework
- `./var/template` - minimal bootstrapped template project which should show minimal functionality for more components in the framework
