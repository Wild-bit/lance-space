import { spawn } from 'node:child_process';

const branch = process.env.CF_PAGES_BRANCH;
console.log('CF_PAGES_BRANCH', branch);

const buildCommand = branch === 'main' ? 'npm run build' : 'npm run build:staging';

const child = spawn(buildCommand, { shell: true, stdio: 'inherit' });

child.on('exit', (code) => {
  process.exit(code!);
});
