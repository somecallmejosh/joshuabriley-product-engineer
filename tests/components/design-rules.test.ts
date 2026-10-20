import { describe, expect, it } from 'vitest';
import tokens from '../../design-system/tokens.json';
import rules from '../../design-system/rules.json';
import tailwindConfig from '../../tailwind.config.mjs';
import { readFileSync } from 'node:fs';
import {
  blankComments,
  buildSystem,
  checkSource,
  checkTokenSync,
  compareBaseline,
  shrinkBaseline,
  toBaseline,
} from '../../scripts/lib/design-rules.mjs';

const system = buildSystem(tokens, rules);
const page = 'src/pages/example.astro';
const rulesIn = (text: string, file = page) => checkSource(text, file, system).map((v) => v.rule);

describe('checkSource', () => {
  it('accepts on-system markup', () => {
    const markup = `<Section tone="paper"><Heading level={2} tone="ink">Hi</Heading>
      <p class="text-ink-muted border-line bg-accent/10 md:text-lg" style="color: var(--ink)">x</p>
      <a href="#bad" class="aria-[current=page]:font-semibold">skip</a></Section>`;
    expect(rulesIn(markup)).toEqual([]);
  });

  it('separates hardcoded token values from off-palette colors', () => {
    expect(rulesIn('<b style="color:#1a1b1e">')).toEqual(['hardcoded-token-color']);
    expect(rulesIn('<b style="color:#244c71">')).toEqual(['off-palette-color']);
    expect(rulesIn('.x { box-shadow: 0 0 0 rgba(46, 92, 138, 0.2); }', 'src/styles/x.css')).toEqual(['hardcoded-token-color']);
    expect(rulesIn('.x { color: rgba(27, 26, 23, .5); }', 'src/styles/x.css')).toEqual(['off-palette-color']);
  });

  it('treats retired legacy values as off-palette', () => {
    const [v] = checkSource('.x { color: #8A4B2E; }', 'src/styles/x.css', system);
    expect(v.rule).toBe('off-palette-color');
    expect(v.message).toMatch(/sunset/);
  });

  it('lets token sources define token values but not invent new ones', () => {
    expect(rulesIn(':root { --ink: #1a1b1e; }', 'src/styles/site.css')).toEqual([]);
    expect(rulesIn('.x { color: #2e2e30; }', 'src/styles/site.css')).toEqual(['off-palette-color']);
  });

  it('flags Tailwind default palette and legacy color classes', () => {
    expect(rulesIn('<p class="text-white bg-blue-500 border-white/10">')).toEqual(Array(3).fill('default-palette-class'));
    const [legacy] = checkSource('<p class="hover:text-navy">', page, system);
    expect(legacy).toMatchObject({ rule: 'legacy-color-class', message: 'legacy alias; use text-ink' });
    expect(rulesIn('<p class="bg-sage-deep">')).toEqual(['legacy-color-class']);
  });

  it('flags arbitrary values outside the primitives, including negatives', () => {
    expect(rulesIn('<p class="md:text-[2rem] -mt-[3px]">')).toEqual(['arbitrary-value', 'arbitrary-value']);
    expect(rulesIn('<p class="text-[2rem]">', 'src/components/primitives/Heading.astro')).toEqual([]);
    expect(rulesIn('<p class="data-[open=true]:block group-[.is-on]:flex">')).toEqual([]);
  });

  it('requires font tokens and keeps the script face on the wordmark', () => {
    expect(rulesIn('.x { font-family: var(--font-hanken), sans-serif; }', 'src/styles/x.css')).toEqual([]);
    expect(rulesIn('.x { font-family: inherit; }', 'src/styles/x.css')).toEqual([]);
    expect(rulesIn(".x { font-family: 'Inter', sans-serif; }", 'src/styles/x.css')).toEqual(['font-family']);
    expect(rulesIn('<span class="font-script">J</span>')).toEqual(['restricted-font']);
    expect(rulesIn('<span class="font-script">J</span>', 'src/components/primitives/Logo.astro')).toEqual([]);
  });

  it('enforces component prop policy', () => {
    const [legacy] = checkSource('<Heading\n  level={2}\n  tone="navy"\n>', page, system);
    expect(legacy).toMatchObject({ rule: 'legacy-prop-value', line: 3, message: 'use tone="ink"' });
    expect(rulesIn('<Section tone="surface-warm" padding="tight">')).toEqual(['forbidden-prop-value']);
    expect(rulesIn('<Text tone="muted" size="sm">')).toEqual([]);
  });

  it('honours documented exceptions', () => {
    expect(rulesIn("{ hex: '#A8412A' }", 'src/components/islands/TokenPlayground.astro')).toEqual([]);
  });

  it('ignores comments but keeps line numbers', () => {
    const text = '/* retired: #C13A22, text-navy */\n<!-- old bg-plum -->\n<b class="text-[3px]">';
    expect(blankComments(text).split('\n')).toHaveLength(3);
    expect(checkSource(text, page, system)).toEqual([expect.objectContaining({ rule: 'arbitrary-value', line: 3 })]);
    expect(rulesIn("import.meta.glob('../content/**/*.mdx'); const c = '#C13A22';")).toEqual(['off-palette-color']);
  });
});

describe('checkTokenSync', () => {
  const siteCss = readFileSync('src/styles/site.css', 'utf8');
  const theme = tailwindConfig.theme?.extend ?? {};

  it('passes for the real site.css and tailwind config', () => {
    expect(checkTokenSync(tokens, siteCss, theme)).toEqual([]);
  });

  it('catches a changed CSS value, a changed Tailwind value and an unclaimed Tailwind color', () => {
    const css = siteCss.replace('--ink: #1a1b1e;', '--ink: #1b1a17;');
    const drifted = {
      ...theme,
      colors: { ...theme.colors, paper: '#FFFFFF', brand: '#FF0000' },
    };
    const problems = checkTokenSync(tokens, css, drifted).map((p) => p.value);
    expect(problems).toEqual(expect.arrayContaining(['--ink', 'colors.paper', 'colors.brand']));
  });
});

describe('baseline', () => {
  const v = (file: string, value: string) => ({ rule: 'off-palette-color', file, line: 1, value, message: '' });
  const baseline = toBaseline([v('a.astro', '#111'), v('a.astro', '#111'), v('b.astro', '#222')]);

  it('accepts known counts, flags extra copies and new files', () => {
    expect(compareBaseline([v('a.astro', '#111'), v('a.astro', '#111')], baseline).fresh).toEqual([]);
    expect(compareBaseline([v('a.astro', '#111'), v('a.astro', '#111'), v('a.astro', '#111')], baseline).fresh).toHaveLength(3);
    expect(compareBaseline([v('c.astro', '#111')], baseline).fresh).toHaveLength(1);
  });

  it('reports fixes and only ever shrinks', () => {
    const now = [v('a.astro', '#111'), v('c.astro', '#999')];
    expect(compareBaseline(now, baseline).fixed).toBe(2);
    expect(shrinkBaseline(now, baseline)).toEqual({ 'a.astro': { 'off-palette-color #111': 1 } });
  });
});
