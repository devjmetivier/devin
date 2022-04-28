#! /usr/bin/env node
import boxen from 'boxen';
import chalk from 'chalk';
const lines = [
    chalk.bold('Devin Metivier'),
    'Software Engineer 🤓',
    '',
    chalk.bold('       Web: ') + chalk.cyan('https://devinmetivier.com/'),
    chalk.bold('   Twitter: ') + chalk.cyan('https://twitter.com/devjmetivier'),
    chalk.bold('    GitHub: ') + chalk.cyan('https://github.com/devjmetivier'),
    chalk.bold('  LinkedIn: ') + chalk.cyan('https://linkedin.com/in/devjmetivier'),
];
const message = lines.join('\n');
const box = boxen(message, { borderColor: 'magenta', borderStyle: 'round', margin: 1, padding: 1 });
process.stdout.write(box + '\n');
