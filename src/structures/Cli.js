#!/usr/bin/env node
const fs = require('fs');
const child_process = require('child_process');
const inquirer = require('inquirer');
// const Util = require('../util/Util.js');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Input the bot name...'
  },
  {
    type: 'name',
    name: 'author',
    message: 'Input the author name...'
  },
  {
    type: 'password',
    name: 'token',
    message: 'Input your Discord client token...'
  }
];
inquirer.prompt(questions).then((answer) => {
  var validated = validatePackage(answer.name);
  if (validated.errors !== undefined) {
    validated.errors.forEach((err) => {
      console.log(err);
    });
    return;
  }
  var dir = answer.name;
  var author = answer.author;
  var token = answer.token;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log('Creating new folder...');
    fs.writeFile(`${dir}/package.json`, _fetchPackage(dir, author), (err) => {
      if (err) return console.error('Error while creating package.json.');
    });
    console.log('Creating index.js...');
    fs.writeFile(`${dir}/index.js`, _fetchScript(token, dir), (err) => {
      if (err) return console.error('Error while creating index.js.');
    });
    console.log('Installing dependencies...');
    child_process.exec(`cd ${dir} && npm install`, (err, stdout, stderr) => {
      console.log('Finalizing... Done!');
    });
  }
});

function _fetchPackage(dir, author) {
  return
  `{
			"name": "${dir}",
			"version": "0.0.1",
			"description": "A Discord bot, built using discordtools.",
			"main": "index.js",
			"author": "${author}",
			"dependencies": {
				"discord.js": "^11.4.2"
			}
		}`;
}

function _fetchScript(token, name) {
  var tokenValue = token.length > 0 ? token : 'client-token';
  return 
  `// ${name}, built using discordtools.
	const Discord = require('discord.js');
	const client = new Discord.Client();

	client.on('ready', () => {
		console.log('Bot has started!');
	});

	client.login('${tokenValue}');`;
}

function validatePackage(name) {
  var warnings = [];
  var errors = [];
  if (name === null) {
    errors.push('Package name cannot be null');
    return finalize(warnings, errors);
  }
  if (name === undefined) {
    errors.push('Package name cannot be undefined');
    return finalize(warnings, errors);
  }
  if (typeof name !== 'string') {
    errors.push('Package name must be a string');
    return finalize(warnings, errors);
  }
  if (!name.length) errors.push('Package name length must be greater than zero.');
  if (name.match(/^\./)) errors.push('Package name cannot start with a period.');
  if (name.match(/^_/)) errors.push('Package name cannot start with an underscore.');
  if (name.trim() !== name) errors.push('Package name cannot contain leading or trailing spaces.');
  var blackListedModulesName = ['node_modules', 'favicon.ico'];
  blackListedModulesName.forEach(function(blacklistedName) {
    if (name.toLowerCase() === blacklistedName) errors.push(`${blacklistedName} is a blacklisted package name.`);
  });
  var builtInModules = [
    'assert',
    'buffer',
    'child_process',
    'cluster',
    'console',
    'constants',
    'crypto',
    'dgram',
    'dns',
    'domain',
    'events',
    'fs',
    'http',
    'https',
    'module',
    'net',
    'os',
    'path',
    'punycode',
    'querystring',
    'readline',
    'repl',
    'stream',
    'string_decoder',
    'sys',
    'timers',
    'tls',
    'tty',
    'url',
    'util',
    'vm',
    'zlib'
  ];
  builtInModules.forEach(function(builtin) {
    if (name.toLowerCase() === builtin) warnings.push(`${builtin} is a built-in package name.`);
  });
  if (name.length > 214) warnings.push('Package name cannot contain more than 214 characters');
  if (name.toLowerCase() !== name) warnings.push('Package name cannot contain uppercase characters.');
  if (/[~'!()*]/.test(name.split('/').slice(-1)[0])) warnings.push('Package name cannot contain special characters.');
  if (encodeURIComponent(name) !== name) {
    var nameMatch = name.match(scopedPackagePattern);
    if (nameMatch) {
      var user = nameMatch[1];
      var pkg = nameMatch[2];
      if (encodeURIComponent(user) === user && encodeURIComponent(pkg) === pkg) return finalize(warnings, errors);
    }
    errors.push('Package name can only contain URL-friendly characters.');
  }
  return finalize(warnings, errors);
}

function finalize(warnings, errors) {
  var result = {
    validForNewPackages: errors.length === 0 && warnings.length === 0,
    validForOldPackages: errors.length === 0,
    warnings: warnings,
    errors: errors
  };
  if (!result.warnings.length) delete result.warnings;
  if (!result.errors.length) delete result.errors;
  return result;
}
