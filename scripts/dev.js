// webpack --config config/webpack.config.js --watch
const path = require('path');
const { spawn } = require('child_process');
const chalk = require('chalk');

const command = (line) => {
    console.log(chalk.cyan(line))
    const args = line.split(' ');
    
    return new Promise((res, rej) => {
        const ls = spawn(args[0], args.slice(1));

        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.log(chalk.red(`stderr: ${data}`));
            rej(data);
        });

        ls.on('close', (code) => {
            console.log(chalk.red(`child process exited with code ${code}`));
            res(code);
        });
    });
}

const commands = [
    `webpack --config ${path.resolve(__dirname, '../config/webpack.config.js')} --watch`,
    `node ${path.resolve(__dirname, '../server/index.js')}`
].map(l => ( command(l) ));

Promise.all(commands)
.then(m => {
    console.log('hello world');
    console.log(m);
})
.catch(err => {
    console.log(err);
});
