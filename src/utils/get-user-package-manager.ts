export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function getUserPkgManager(): PackageManager {
  // This environment variable is set by npm and yarn but pnpm seems less consistent
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith('yarn')) return 'yarn';
    if (userAgent.startsWith('pnpm')) return 'pnpm';
    if (userAgent.startsWith('bun')) return 'bun';
  }

  // If no user agent is set, assume npm
  return 'npm';
}
