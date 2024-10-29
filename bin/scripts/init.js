import fs from 'node:fs/promises';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execSync } from 'node:child_process';
import readline from 'node:readline/promises';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export default async () => {
    console.log('starting initialization...');
    console.log();

    let runtime;

    // js runtime chooser
    console.log('which js runtime would you like to use?');
    console.log('[1] node.js');
    console.log('[2] bun');

    switch (await rl.question('choice [1]: ')) {
        case '':
        case '1':
            runtime = 'node';
            break;
        case '2':
            runtime = 'bun';
            break;
    }

    rl.close();

    console.log();

    let initiator = fileURLToPath(import.meta.url);
    let root_dir = path.resolve(path.dirname(initiator), '../..');

    let project_path = process.argv[3] || '';

    if (project_path) {
        project_path = './' + project_path
            .replace(/^[\/\.]+/, '')
            .replace(/\/+$/, '');
    } else {
        project_path = '.';
    }

    await fs.mkdir(project_path, { recursive: true });

    let files = await glob(`${root_dir}/var/template/*`, { dot: true });
    let ignore = ['node_modules', '.env'];

    console.log('creating project files...');

    for (const file of files) {
        const stat = await fs.stat(file);
        const is_dir = stat.isDirectory();
        const filename = file.split('/').slice(-1)[0];

        if (ignore.includes(filename)) {
            continue;
        }

        if (is_dir) {
            await fs.cp(
                file,
                `${project_path}/${filename}`,
                {
                    recursive: true
                }
            );
        } else {
            await fs.copyFile(file, `${project_path}/${filename}`);
        }
    }

    await fs.copyFile(`${project_path}/.env.sample`, `${project_path}/.env`)

    /**
     * process package.json variable changes
     */
    let package_json = JSON.parse(await fs.readFile(`${project_path}/package.json`));

    // ensure user gets latest version
    package_json.dependencies['@exajs/core'] = 'latest';

    // drop the extra watch, this is for dev only
    package_json.scripts.watch = package_json.scripts.watch.replace(' --watch ../..', '');

    package_json = JSON.stringify(package_json, null, 4);

    // replace runtime token
    package_json = package_json
        .replaceAll('%%RUNTIME%%', runtime);

    await fs.writeFile(`${project_path}/package.json`, package_json);

    /**
     * process docker related changes
     */
    let docker_compose = (await fs.readFile(`${project_path}/docker-compose.yml`)).toString();
    let docker_sh = (await fs.readFile(`${project_path}/docker.sh`)).toString();

    let docker_image;
    let docker_command;
    let package_m;
    let package_x;

    switch (runtime) {
        case 'node':
            docker_image = 'node:20';
            docker_command = `npm i; npx --yes jmig migrate; npm start`;
            package_m = 'npm';
            package_x = 'npx';
            break;
        case 'bun':
            docker_image = 'oven/bun:latest';
            docker_command = `bun i; bunx jmig migrate; bun run start`;
            package_m = 'bun';
            package_x = 'bunx';
            break;
    }

    docker_compose = docker_compose
        .replaceAll('%%IMAGE%%', docker_image)
        .replaceAll('%%COMMAND%%', docker_command);

    docker_sh = docker_sh
        .replaceAll('%%RUNTIME%%', runtime)
        .replaceAll('%%IMAGE%%', docker_image)
        .replaceAll('%%COMMAND%%', docker_command)
        .replaceAll('%%PACKAGE_M%%', package_m)
        .replaceAll('%%PACKAGE_X%%', package_x);

    await fs.writeFile(`${project_path}/docker-compose.yml`, docker_compose);
    await fs.writeFile(`${project_path}/docker.sh`, docker_sh);

    console.log('running npm install...');

    // packages install
    process.chdir(project_path);
    execSync(`${package_m} i`, { stdio: 'inherit' });

    console.log('creating a new git repo...');

    // git init
    execSync('git init', { stdio: 'inherit' });

    // done
    console.log('-------');
    console.log(`installation complete, run \`${package_m} run watch\` to start your application`);
}
