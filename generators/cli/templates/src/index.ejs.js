#!/usr/bin/env node

/**
 * Require dependencies
 *
 */
import program from 'commander'
import chalk from 'chalk'
import { exec } from 'child_process'
import pkg from '../package.json'

/**
 * list function definition
 *
 */
const list = (directory, options) => {
  const cmd = 'ls'
  const params = []

  if (options.all) {
    params.push('a')
  }
  if (options.long) {
    params.push('l')
  }

  let parameterizedCommand = params.length ? cmd + ' -' + params.join('') : cmd

  if (directory) {
    parameterizedCommand += ' ' + directory
  }

  let output = (error, stdout, stderr) => {
    if (error) console.log(chalk.red.bold.underline('exec error:') + error)
    if (stdout) console.log(chalk.green.bold.underline('Result:') + stdout)
    if (stderr) console.log(chalk.red('Error: ') + stderr)
  }

  exec(parameterizedCommand, output)
}

program
  .version(pkg.version)
  .command('list [directory]')
  .option('-a, --all', 'List all')
  .option('-l, --long', 'Long list format')
  .action(list)

program.parse(process.argv)

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help()
