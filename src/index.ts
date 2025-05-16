#! /usr/bin/env node

import { cancel, confirm, intro, isCancel, note, outro, select, text } from '@clack/prompts';
import chalk from 'chalk';

async function main() {
  intro(chalk.magenta.bold("Welcome to Devin's App Bootstrapper CLI!"));

  const projectName = await text({
    message: 'What will your project be called?',
    validate: (input: string) => (input ? undefined : 'Project name cannot be empty'),
  });
  if (isCancel(projectName)) return cancel('Operation cancelled.');

  const language = await select({
    message: 'Will you be using Typescript or Javascript?',
    options: [
      { value: 'typescript', label: 'Typescript' },
      { value: 'javascript', label: 'Javascript' },
    ],
  });
  if (isCancel(language)) return cancel('Operation cancelled.');

  if (language === 'javascript') {
    note(chalk.redBright('Wrong answer, using TypeScript instead'));
  }

  const tailwind = await confirm({
    message: 'Will you be using Tailwind CSS for styling?',
    initialValue: true,
  });
  if (isCancel(tailwind)) return cancel('Operation cancelled.');

  const rpc = await select({
    message: 'Which of these RPC libraries would you like to use?',
    options: [
      { value: 'trpc', label: 'tRPC' },
      { value: 'hono', label: 'Hono' },
      { value: 'none', label: 'None' },
    ],
  });
  if (isCancel(rpc)) return cancel('Operation cancelled.');

  const auth = await select({
    message: 'What authentication provider would you like to use?',
    options: [
      { value: 'none', label: 'None' },
      { value: 'stytch', label: 'Stytch' },
    ],
  });
  if (isCancel(auth)) return cancel('Operation cancelled.');

  const orm = await select({
    message: 'What databse ORM would you like to use?',
    options: [
      { value: 'drizzle', label: 'Drizzle' },
      { value: 'prisma', label: 'Prisma' },
      { value: 'none', label: 'None' },
    ],
  });
  if (isCancel(orm)) return cancel('Operation cancelled.');

  let databaseProvider: symbol | 'postgres' | 'sqlite' | 'mysql' | 'planetscale' | undefined;
  if (orm !== 'none') {
    databaseProvider = await select({
      message: 'What database provider would you like to use?',
      options: [
        { value: 'sqlite', label: 'SQLite (LibSQL)' },
        { value: 'mysql', label: 'MySQL' },
        { value: 'planetscale', label: 'PlanetScale' },
      ],
    });
  }

  const linter = await select({
    message: 'Would you like to use Biome or Eslint/Prettier for linting/formatting?',
    options: [
      { value: 'biome', label: 'Biome' },
      { value: 'eslint-prettier', label: 'Eslint and Prettier' },
    ],
  });
  if (isCancel(linter)) return cancel('Operation cancelled.');

  const git = await confirm({
    message: 'Do you want to initialize a Git repository and stage the changes?',
    initialValue: true,
  });
  if (isCancel(git)) return cancel('Operation cancelled.');

  const install = await confirm({
    message: 'Should we install dependencies for you?',
    initialValue: true,
  });
  if (isCancel(install)) return cancel('Operation cancelled.');

  const importAlias = await text({
    message: 'What import alias would you like to use?',
    placeholder: '~/',
    initialValue: '~/',
    validate: (input: string) => (input ? undefined : 'Import alias cannot be empty'),
  });
  if (isCancel(importAlias)) return cancel('Operation cancelled.');

  // Print summary
  console.log(`\n${chalk.green('Your selections:')}`);
  console.log(`  Project name: ${chalk.cyan(projectName)}`);
  console.log(`  Language:     ${chalk.cyan(language)}`);
  console.log(`  Tailwind CSS: ${tailwind ? chalk.green('Yes') : chalk.red('No')}`);
  console.log(`  RPC:          ${chalk.cyan(rpc)}`);
  console.log(`  Auth:         ${chalk.cyan(auth)}`);
  console.log(`  ORM:          ${chalk.cyan(orm)}`);
  if (databaseProvider) console.log(`  Database:     ${chalk.cyan(databaseProvider)}`);
  console.log(`  Linter:       ${chalk.cyan(linter)}`);
  console.log(`  Git:          ${git ? chalk.green('Yes') : chalk.red('No')}`);
  console.log(`  Install deps: ${install ? chalk.green('Yes') : chalk.red('No')}`);
  console.log(`  Import alias: ${chalk.cyan(importAlias)}`);

  outro(chalk.yellow('Scaffolding will begin here in the next step...'));
}

main();
