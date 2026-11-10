#!/usr/bin/env node
/**
 * Claude Code PreToolUse hook (.claude/settings.json). The first time a
 * session edits UI code, it puts the design system in front of the model:
 * where system.json is, the guidelines no script can check, and the audit
 * to run before calling the work done. Later edits in the session pass
 * through silently. Never blocks: any failure just exits 0.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const UI_CODE = /(^|\/)(src\/(components|styles|pages|layouts)\/|tailwind\.config\.mjs$)/;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

try {
  const input = JSON.parse(readFileSync(0, 'utf8') || '{}');
  const file = path.relative(root, input.tool_input?.file_path ?? '');
  if (!UI_CODE.test(file) || file.startsWith('..')) process.exit(0);

  const marker = path.join(tmpdir(), `jb-design-context-${String(input.session_id ?? 'none').replace(/[^\w-]/g, '')}`);
  if (existsSync(marker)) process.exit(0);
  writeFileSync(marker, file);

  const rules = JSON.parse(readFileSync(path.join(root, 'design-system/rules.json'), 'utf8'));
  const guidelines = rules.guidelines.map((g) => `- ${g.id}: ${g.rule}`).join('\n');
  const context = [
    `You are about to edit UI code (${file}). This site has a design system you must build from.`,
    '',
    'Read design-system/system.json before writing UI: every token (CSS variable and Tailwind key), the enforced rules, and each component with its props and an example page. Use an existing component or token before writing new markup or CSS. If the file looks stale, run `npm run design:context`.',
    '',
    'Guidelines no script checks:',
    guidelines,
    '',
    'Before calling the work done, run `npm run audit:design` and fix what it reports. Never edit baseline.json, add exceptions, or add tokens to make it pass; those need Josh’s approval. A new pattern is not part of the system until it is on /style-guide/ and in src/lib/component-catalogue.ts.',
  ].join('\n');

  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: context } }));
} catch {
  process.exit(0);
}
