import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

// Record the checked-out commit so a successful upload can be verified on the live site.
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error('Invalid build commit');
writeFileSync(new URL('../public/build-info.json', import.meta.url),
  JSON.stringify({ commit, builtAt: new Date().toISOString() }) + '\n');
console.log(`Building nc1395 commit ${commit}`);
