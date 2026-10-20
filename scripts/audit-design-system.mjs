#!/usr/bin/env node
/**
 * Fail on design-system drift. Contract: design-system/tokens.json + rules.json.
 *
 *   npm run audit:design                          check (exit 1 on new violations)
 *   npm run audit:design -- --update-baseline     lock in fixes (only ever shrinks)
 *   npm run audit:design -- --init-baseline       first run only; refuses if one exists
 *
 * Known violations live in design-system/baseline.json, counted per
 * file + rule + value. Anything beyond those counts fails, so the backlog can
 * only go down. token-sync problems are never baselined.
 */
import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  buildSystem,
  checkSource,
  checkTokenSync,
  compareBaseline,
  isIgnored,
  shrinkBaseline,
  toBaseline,
} from './lib/design-rules.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const at = (p) => path.join(root, p);
const rel = (file) => path.relative(root, file).split(path.sep).join('/');
const readJson = async (p) => JSON.parse(await readFile(at(p), 'utf8'));
const BASELINE = 'design-system/baseline.json';

const args = new Set(process.argv.slice(2));
const tokens = await readJson('design-system/tokens.json');
const rules = await readJson('design-system/rules.json');
const system = buildSystem(tokens, rules);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])));
  return nested.flat();
}

const files = (await Promise.all(rules.scan.roots.map((r) => walk(at(r)))))
  .flat()
  .map(rel)
  .filter((f) => rules.scan.extensions.includes(path.extname(f)) && !isIgnored(f, system))
  .sort();

const violations = (await Promise.all(files.map(async (f) => checkSource(await readFile(at(f), 'utf8'), f, system)))).flat();

const { default: tailwindConfig } = await import(pathToFileURL(at('tailwind.config.mjs')).href);
const syncProblems = checkTokenSync(tokens, await readFile(at('src/styles/site.css'), 'utf8'), tailwindConfig.theme?.extend ?? {});

const exists = await access(at(BASELINE)).then(() => true, () => false);

if (args.has('--init-baseline')) {
  if (exists) {
    console.error(`[design] ${BASELINE} already exists. Use --update-baseline to record fixes; new violations must be fixed, not baselined.`);
    process.exit(1);
  }
  await writeFile(at(BASELINE), `${JSON.stringify(toBaseline(violations), null, 2)}\n`);
  console.log(`[design] Wrote ${BASELINE}: ${violations.length} existing violations across ${new Set(violations.map((v) => v.file)).size} files.`);
}

const baseline = exists || args.has('--init-baseline') ? await readJson(BASELINE) : {};

if (args.has('--update-baseline')) {
  await writeFile(at(BASELINE), `${JSON.stringify(shrinkBaseline(violations, baseline), null, 2)}\n`);
  console.log(`[design] ${BASELINE} updated (ratchet: counts only go down).`);
}

const current = args.has('--update-baseline') ? await readJson(BASELINE) : baseline;
const { fresh, fixed } = compareBaseline(violations, current);
const failures = [...syncProblems, ...fresh].sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
const known = Object.values(current).reduce((n, keys) => n + Object.values(keys).reduce((a, b) => a + b, 0), 0);

if (failures.length) {
  const byFile = Map.groupBy(failures, (v) => v.file);
  console.error(`\n[design] ${failures.length} design-system violation(s). See design-system/rules.json for why and how to fix each rule.\n`);
  for (const [file, list] of byFile) {
    console.error(file);
    for (const v of list) {
      const where = v.line ? `:${v.line}` : '';
      const note = v.allowed ? ` (baseline allows ${v.allowed} of ${v.count} in this file)` : '';
      console.error(`  ${where.padEnd(6)} ${v.rule.padEnd(22)} ${v.value}  ${v.message}${note}`);
    }
  }
  console.error('\nFix the code. Do not edit the baseline, rules.json or tokens.json to make this pass unless Josh asked for that design-system change.\n');
  process.exit(1);
}

console.log(`[design] OK: ${files.length} files, tokens in sync, no new violations. Backlog: ${known} baselined.`);
if (fixed > 0) console.log(`[design] ${fixed} baselined violation(s) fixed. Lock them in with: npm run audit:design -- --update-baseline`);
