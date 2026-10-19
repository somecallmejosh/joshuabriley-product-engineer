/**
 * Generate one OG card per page from the manifest (src/lib/og-pages.mjs).
 *
 * Prereq: dev server running on :4321 (Netlify adapter → use `astro dev`,
 * NOT `npm run preview`). Then:  node scripts/generate-og.mjs
 *
 * Renders /og-render/<slug>/ for each entry, screenshots the .og-card element
 * at 2x, supersample-downscales to 1200x630 with ImageMagick, and writes
 * public/images/og/<slug>.png.
 */
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { OG_PAGES, postToOgEntry } from '../src/lib/og-pages.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'public/images/og');
const POSTS_DIR = resolve(ROOT, 'src/content/posts');
const TMP_DIR = '/tmp/og-gen';
// Override with OG_BASE_URL (the pre-commit hook boots a dev server on its own port).
const BASE = process.env.OG_BASE_URL ?? 'http://localhost:4321/og-render';

/** Minimal frontmatter read: pull one scalar key from a post's YAML block. */
function fmValue(block, key) {
  const m = block.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!m) return undefined;
  return m[1].trim().replace(/^['"]|['"]$/g, '');
}

/** Derive OG entries for every non-draft blog post from its frontmatter, so a
 *  new post is picked up automatically (no manifest edit). Mirrors the render
 *  route, which derives the same entries from astro:content. */
function blogEntries() {
  return readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => {
      const raw = readFileSync(resolve(POSTS_DIR, f), 'utf8');
      const block = (raw.match(/^---\n([\s\S]*?)\n---/) ?? [, ''])[1];
      return {
        id: f.replace(/\.mdx?$/, ''),
        title: fmValue(block, 'title'),
        category: fmValue(block, 'category'),
        draft: fmValue(block, 'draft') === 'true',
      };
    })
    .filter((p) => p.title && !p.draft)
    .map(postToOgEntry);
}


mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(TMP_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });

// Optional slugs let a copy change refresh only the affected cards.
const requestedSlugs = new Set(process.argv.slice(2));
const JOBS = [...OG_PAGES, ...blogEntries()].filter((entry) =>
  requestedSlugs.size === 0 || requestedSlugs.has(entry.slug),
);

let ok = 0;
for (const entry of JOBS) {
  await page.goto(`${BASE}/${entry.slug}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelector('astro-dev-toolbar')?.remove());
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);

  const el = await page.$('.og-card');
  if (!el) {
    console.error(`  MISS  ${entry.slug} (no .og-card)`);
    continue;
  }
  const tmp = `${TMP_DIR}/${entry.slug}.png`;
  const out = `${OUT_DIR}/${entry.slug}.png`;
  await el.screenshot({ path: tmp });
  execFileSync('magick', [tmp, '-resize', '1200x630', '-strip', '-quality', '92', out]);
  ok++;
  console.log(`  ok    ${entry.slug}.png  ·  "${entry.headline}"`);
}

await browser.close();
console.log(`\nGenerated ${ok}/${JOBS.length} OG cards → public/images/og/`);
