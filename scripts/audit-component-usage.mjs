#!/usr/bin/env node
/** Check production reachability and the style guide's component catalogue. */
import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const src = path.join(root, 'src');
const relative = (file) => path.relative(root, file).split(path.sep).join('/');
async function walk(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map(async (entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  }))).flat();
}
const exists = async (file) => { try { await access(file); return true; } catch { return false; } };
const files = (await walk(src)).filter((file) => /\.(astro|ts|js|mjs|mdx?|css)$/.test(file));
const graph = new Map();
const missing = [];
for (const file of files) {
  const raw = await readFile(file, 'utf8');
  const source = file.endsWith('.astro')
    ? (raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '') + '\n' + [...raw.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((match) => match[1]).join('\n')
    : /\.mdx?$/.test(file) ? raw.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, '') : raw;
  const dependencies = [];
  const imports = [];
  const syntax = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function collect(node) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) imports.push(node.moduleSpecifier.text);
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) imports.push(node.arguments[0].text);
    ts.forEachChild(node, collect);
  }
  collect(syntax);
  for (const specifier of imports) {
    const ref = specifier.split('?')[0];
    const target = ref.startsWith('~/') ? path.join(src, ref.slice(2)) : ref.startsWith('.') ? path.resolve(path.dirname(file), ref) : null;
    if (!target) continue;
    const candidates = [target, ...['.astro', '.ts', '.js', '.mjs', '/index.ts'].map((ext) => target + ext)];
    let resolved;
    for (const candidate of candidates) if (await exists(candidate)) { resolved = candidate; break; }
    if (resolved) dependencies.push(resolved);
    else missing.push(`${relative(file)} → ${specifier}`);
  }
  graph.set(file, dependencies);
}
const reachable = new Set();
function visit(file) {
  if (reachable.has(file)) return;
  reachable.add(file);
  for (const dependency of graph.get(file) ?? []) visit(dependency);
}
for (const file of files) {
  const name = relative(file);
  if ((name.startsWith('src/pages/') && !name.startsWith('src/pages/style-guide/')) || name.startsWith('src/content/')) visit(file);
}
const components = files.filter((file) => relative(file).startsWith('src/components/') && file.endsWith('.astro') && !relative(file).startsWith('src/components/style-guide/'));
const unused = components.filter((file) => !reachable.has(file)).map(relative);
const catalogue = await readFile(path.join(src, 'lib/component-catalogue.ts'), 'utf8');
const documented = new Set([...catalogue.matchAll(/"path": "([^"]+)"/g)].map((match) => match[1]));
const live = new Set(components.filter((file) => reachable.has(file)).map(relative));
const undocumented = [...live].filter((file) => !documented.has(file));
const stale = [...documented].filter((file) => !live.has(file));
const issues = { 'Missing imports': missing, 'Unused components': unused, 'Missing catalogue entries': undocumented, 'Obsolete catalogue entries': stale };
for (const [label, entries] of Object.entries(issues)) if (entries.length) console.error(`${label}:\n${entries.map((entry) => `  ${entry}`).join('\n')}`);
const failed = Object.values(issues).some((entries) => entries.length);
console.log(`${live.size} production components; ${documented.size} documented. ${failed ? 'Audit failed.' : 'No unused components or stale entries.'}`);
process.exitCode = failed ? 1 : 0;
