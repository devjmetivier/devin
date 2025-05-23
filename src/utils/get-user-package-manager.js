export function getUserPkgManager() {
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent) {
        if (userAgent.startsWith('yarn'))
            return 'yarn';
        if (userAgent.startsWith('pnpm'))
            return 'pnpm';
        if (userAgent.startsWith('bun'))
            return 'bun';
    }
    return 'npm';
}
