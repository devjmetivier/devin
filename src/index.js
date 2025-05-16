#! /usr/bin/env node
import chalk from 'chalk';
import boxen from 'boxen';
import inquirer from 'inquirer';
import open from 'open';
const lines = [
    chalk.bold("Hey, I'm Devin! 👋"),
    '',
    "I'm a software engineer who loves turning ideas into",
    'cool stuff on the web. I get a kick out of solving tricky',
    'problems and making things look and feel awesome.',
    '',
    'Big fan of TypeScript, React, Next.js, and building things',
    "that scale (and don't break). Always up for learning something new.",
    '',
    chalk.italic('Connect with me anywhere at the links below! 🚀'),
];
const message = lines.join('\n');
const box = boxen(message, { borderColor: 'magenta', borderStyle: 'round', margin: 1, padding: 1 });
const links = [
    { name: 'Web', url: 'https://devinmetivier.com/', flags: ['web'] },
    { name: 'X', url: 'https://x.com/devjmetivier', flags: ['x'] },
    { name: 'GitHub', url: 'https://github.com/devjmetivier', flags: ['gh', 'github'] },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/devjmetivier', flags: ['linkedin'] },
];
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (key) => {
    const strKey = key.toString();
    if (strKey === 'q' || strKey === 'Q') {
        process.stdout.write('\nLater! 👋\n');
        process.exit(0);
    }
});
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    process.stdout.write('\nUsage: devin [flag]\n\n');
    process.stdout.write('Flags:\n');
    links.forEach((link) => {
        const flagList = link.flags.map((f) => `--${f}`).join(', ');
        process.stdout.write(`  ${flagList.padEnd(18)} Open ${link.name}\n`);
    });
    process.stdout.write('  --help, -h         Show this help message\n');
    process.stdout.write('\nYou can also run without flags for an interactive menu.\n');
    process.exit(0);
}
const flagArg = process.argv.find((arg) => arg.startsWith('--'));
if (flagArg) {
    const flag = flagArg.replace(/^--/, '').toLowerCase();
    const match = links.find((link) => link.flags && link.flags.includes(flag));
    if (match) {
        open(match.url);
        process.stdout.write(`Opening ${match.name}...\n`);
        process.exit(0);
    }
    else {
        process.stdout.write(`Unknown flag: ${flagArg}\n`);
        process.exit(1);
    }
}
process.stdout.write(box + '\n');
(async () => {
    const { selected } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selected',
            message: "Select a link to open (or press 'q' to exit):",
            choices: links.map((link) => ({ name: link.name + ': ' + link.url, value: link.url })),
        },
    ]);
    await open(selected);
    process.exit(0);
})();
