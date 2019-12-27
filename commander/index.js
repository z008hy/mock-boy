const path = require('path')
const nodemon = require('nodemon')
const chalk = require('chalk')
const program = require('commander')
const ip = require('ip')
const fs = require('fs-extra')
const config = require('../.config')
const { name, version } = require('../package.json')

program.name(name)
program.version(version)

program
  .command('config <option> [key] [value]')
  .description(`set config (log_path / api_path / port) of ${name}`)
  .action((option, key, value) => {
    if (option === 'set') {
      if (key === 'api_path') {
        fs.ensureDirSync(path.resolve(value, 'logs'))
        fs.ensureDirSync(path.resolve(value, 'apis'))
        fs.copySync(path.resolve(__dirname, '../apis'), path.resolve(value, 'apis'), { overwrite: true })
      }
      config.set(key, value)
    }
    if (option === 'list') {
      console.log(config.list())
    }
  })

program
  .command('run')
  .description(`run ${name}`)
  .action(() => {
    const port = config.get('port')
    const api_path = config.get('api_path')
    if (!port) {
      return console.log(chalk.red(`please use "${name} config set port **" set your run port` ));
    }
    if (!api_path) {
      return console.log(chalk.red(`please use "${name} config set api_path **" set your api file path` ));
    }
    nodemon({
      script: path.resolve(__dirname, '../src/app.js'),
      ext: 'js json',
      watch: [ 
        path.resolve(__dirname, '../src/'),
        config.getApiPath(),
      ],
      legacyWatch: true,
      ignore: ['node_modules/**', 'logs/**']
    })
    
    nodemon.on('start', function () {
      const baseUrl = `http://${ip.address()}:${port}/`
      console.log(chalk.green(`${name} has started @[${baseUrl}]`));
      console.log(chalk.green(`you api path is [${api_path}]`));
    }).on('quit', function () {
      console.log(chalk.red(`${name} has quit`));
      process.exit();
    }).on('restart', function (files) {
      console.log(chalk.green(`${name} restarted due to: `), files);
    });
  })

program.on('command:*', () => {
  program.outputHelp()
})
program.parse(process.argv)