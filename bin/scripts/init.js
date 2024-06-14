import fs from 'node:fs/promises';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execSync } from 'node:child_process';

export default async () => {
    console.log('starting initialization...');

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

    // update package.json
    let package_json = JSON.parse(await fs.readFile(`${project_path}/package.json`));

    // ensure user gets latest version
    package_json.dependencies['@exajs/core'] = 'latest';

    // drop the extra watch, this is for dev only
    package_json.scripts.watch = package_json.scripts.watch.replace(' --watch ../..', '');

    await fs.writeFile(`${project_path}/package.json`, JSON.stringify(package_json, null, 4));

    console.log('running npm install...');

    // npm install
    process.chdir(project_path);
    execSync('npm i', { stdio: 'inherit' });

    console.log('creating a new git repo...');

    // git init
    execSync('git init', { stdio: 'inherit' });

    // done
    console.log('-------');
    console.log('installation complete, run `npm run watch` to start your application');
}
