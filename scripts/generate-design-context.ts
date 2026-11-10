/**
 * Writes design-system/system.json: the same data as /style-guide/system.json,
 * as a file agents can read without a dev server. Run through vite-node so
 * import.meta.glob and the ~ alias resolve: `npm run design:context`.
 * Pass --check to fail (exit 1) when the committed file is out of date.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { buildDesignContext } from '~/lib/design-context';

const target = 'design-system/system.json';
const next = `${JSON.stringify(buildDesignContext(), null, 2)}\n`;
let current = '';
try { current = readFileSync(target, 'utf8'); } catch {}

if (process.argv.includes('--check')) {
  if (current !== next) {
    console.error(`[design:context] ${target} is out of date. Run: npm run design:context`);
    process.exit(1);
  }
  console.log(`[design:context] ${target} is up to date.`);
} else if (current === next) {
  console.log(`[design:context] ${target} unchanged.`);
} else {
  writeFileSync(target, next);
  console.log(`[design:context] wrote ${target}`);
}
