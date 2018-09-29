#!/usr/bin/env node
const fs = require('fs');
const child_process = require('child_process');
const inquirer = require('inquirer');
const logSymbols = require('log-symbols');
const validate = require('validate-npm-package-name');
const Util = require('../util/Util.js');

const questions = [{
        type: 'input',
        name: 'name',
        message: 'Input a bot name...'
    },
    {
        type: 'password',
        name: 'token',
        message: 'Input your Discord client token...'
    }
]

inquirer.prompt(questions).then((answer) => {
    const validated = validate(answer.name)
    if (validated.errors !== undefined) {
        validated.errors.forEach((err) => {
            console.log(`${logSymbols.error} ${err}`);
        });
        return;
    }
    const dir = answer.name;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
        console.log(`${logSymbols.info} Creating new folder...`)
        fs.writeFile(`${dir}/package.json`, _fetchPackage(dir), (err) => {
            if (err) return console.log(`${logSymbols.error} Error while creating package.json.`);
        });
        console.log(`${logSymbols.info} Creating index.js...`)
        fs.writeFile(`${dir}/index.js`, _fetchScript(answer.token, dir), err => {
            if (err) return console.log(`${logSymbols.error} Error while creating index.js.`)
        });
        console.log(`${logSymbols.info} Installing dependencies...`)
        child_process.exec(`cd ${dir} && npm install`, (err, stdout, stderr) => {
            console.log(`${logSymbols.success} Done!`)
        });
    }
});

  function _fetchPackage(dir) {
    return `{
			"name": "${dir}",
			"version": "0.0.1",
			"description": "A Discord bot, generated using discordtools.",
			"main": "index.js",
			"author": "discordtools",
			"dependencies": {
				"discord.js": "^11.3.2"
			}
		}`;
  }

  function _fetchScript(token, name) {
    const tokenValue = token.length > 0 ? token : 'client-token';
    return `// ${name}, generated using discordtools.
			const Discord = require('discord.js');
			const client = new Discord.Client();
			client.on('ready', () => {
				console.log('Bot has started!');
			});
			client.login('${tokenValue}');`;
  }

module.exports = Cli;
