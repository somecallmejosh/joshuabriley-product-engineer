/**
 * Rule engine for the design-system audit. Pure functions only: the CLI in
 * scripts/audit-design-system.mjs does the file I/O, so these can be unit
 * tested against strings (tests/components/design-rules.test.ts).
 *
 * The contract lives in design-system/tokens.json + rules.json; nothing here
 * hardcodes a color, font or component policy.
 */

// ── Tokens ──────────────────────────────────────────────────────────────────

/** Flatten DTCG tokens into [{ path, name, type, value, site }], resolving {refs}. */
export function flattenTokens(tokens) {
  const out = [];
  const walk = (node, path, inheritedType) => {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return;
    const type = node.$type ?? inheritedType;
    if ('$value' in node) {
      out.push({ path: path.join('.'), name: path.at(-1), type, value: node.$value, site: node.$extensions?.site ?? {} });
      return;
    }
    for (const [key, child] of Object.entries(node)) {
      if (!key.startsWith('$')) walk(child, [...path, key], type);
    }
  };
  walk(tokens, [], undefined);

  const byPath = new Map(out.map((t) => [t.path, t]));
  for (const token of out) {
    const ref = typeof token.value === 'string' && token.value.match(/^\{(.+)\}$/);
    if (ref) {
      const target = byPath.get(ref[1]);
      if (!target) throw new Error(`tokens.json: ${token.path} references unknown token {${ref[1]}}`);
      token.value = target.value;
      token.ref = target;
    }
  }
  return out;
}

/** Normalize #rgb / #rgba / #rrggbb / #rrggbbaa to #RRGGBB (alpha dropped). */
export function normalizeHex(hex) {
  let h = hex.replace('#', '').toUpperCase();
  if (h.length === 3 || h.length === 4) h = [...h.slice(0, 3)].map((c) => c + c).join('');
  return `#${h.slice(0, 6)}`;
}

export function channelsToHex(r, g, b) {
  return `#${[r, g, b].map((n) => Number(n).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

/** Build everything the source checks need from the two contract files. */
export function buildSystem(tokens, rules) {
  const flat = flattenTokens(tokens);
  const colors = flat.filter((t) => t.type === 'color');

  // hex → the token a literal should be replaced with. Live tokens win over
  // deprecated aliases that share a value (#1A1B1E is ink, not plum).
  const colorIndex = new Map();
  for (const t of [...colors].sort((a, b) => Number(!!a.site.deprecated) - Number(!!b.site.deprecated))) {
    const hex = normalizeHex(t.value);
    if (!colorIndex.has(hex)) colorIndex.set(hex, t);
  }

  const legacyNames = colors.filter((t) => t.site.deprecated).map((t) => t.name);
  const restrictedFonts = flat
    .filter((t) => t.type === 'fontFamily' && t.site.restrictedTo)
    .map((t) => ({ name: t.name, cssVar: t.site.cssVar, allowed: t.site.restrictedTo }));

  return {
    tokens: flat,
    colorIndex,
    legacyNames,
    restrictedFonts,
    components: rules.components ?? {},
    tokenSources: rules.tokenSources ?? [],
    allowArbitrary: (rules.allowArbitraryValuesIn ?? []).map(globToRegExp),
    ignore: (rules.scan?.ignore ?? []).map(globToRegExp),
    exceptions: (rules.exceptions ?? []).map((e) => ({ ...e, re: globToRegExp(e.path) })),
  };
}

// ── Paths ───────────────────────────────────────────────────────────────────

export function globToRegExp(glob) {
  const re = glob
    .split('**')
    .map((part) => part.split('*').map((s) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('[^/]*'))
    .join('.*');
  return new RegExp(`^${re}$`);
}

const matchesAny = (file, regexes) => regexes.some((re) => re.test(file));

export function isIgnored(file, system) {
  return matchesAny(file, system.ignore);
}

function isExempt(file, rule, system) {
  return system.exceptions.some((e) => e.re.test(file) && e.rules.includes(rule));
}

// ── Source checks ───────────────────────────────────────────────────────────

const UTILITY = '(?:text|bg|border(?:-[trblxy])?|from|via|to|fill|stroke|ring(?:-offset)?|outline|decoration|divide|placeholder|caret|shadow)';
const DEFAULT_PALETTE = 'white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|blue|indigo|violet|purple|fuchsia|pink|rose';

const HEX = /(?<![\w&#/.-])#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![\w-])/g;
const RGB = /rgba?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})/g;
const DEFAULT_CLASS = new RegExp(`(?<![\\w-])${UTILITY}-(?:${DEFAULT_PALETTE})(?:-\\d{2,3})?(?:\\/\\d+)?(?![\\w-])`, 'g');
// Tailwind arbitrary values (text-[2rem]); arbitrary *variants* (aria-[x]:) end in ':' and are fine.
const ARBITRARY = /(?<![\w-])-?[a-z][a-z0-9]*(?:-[a-z0-9]+)*-\[[^\]\s'"`]+\](?![:\w])/g;
const FONT_FAMILY = /font-family\s*:\s*([^;}"`]+)|fontFamily\s*:\s*['"`]([^'"`]+)/g;

function lineIndex(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === '\n') starts.push(i + 1);
  return (offset) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
}

function tokenHint(token) {
  const css = token.site.cssVar === '--accent-rgb' ? 'var(--accent)' : token.site.cssVar ? `var(${token.site.cssVar})` : null;
  return `matches token "${token.name}"; use the ${token.name} utility${css ? ` or ${css}` : ''}`;
}

/**
 * Blank out block and HTML comments (keeping newlines, so offsets and line
 * numbers survive): a comment explaining why #C13A22 was retired isn't a use
 * of it. A block comment only counts when it opens after whitespace or
 * punctuation, so globs like 'src/**\/*.mdx' inside strings are left alone.
 */
export function blankComments(text) {
  const blank = (s) => s.replace(/[^\n]/g, ' ');
  return text
    .replace(/<!--[\s\S]*?-->/g, blank)
    .replace(/(^|[\s;{}(,])(\/\*[\s\S]*?\*\/)/g, (_, lead, comment) => lead + blank(comment));
}

/** Return every rule violation in one file's text. `file` is repo-relative with forward slashes. */
export function checkSource(source, file, system) {
  const text = blankComments(source);
  const found = [];
  const lineOf = lineIndex(text);
  const push = (rule, index, value, message) => {
    if (!isExempt(file, rule, system)) found.push({ rule, file, line: lineOf(index), value, message });
  };
  const isTokenSource = system.tokenSources.includes(file);

  const checkColor = (hex, index, literal) => {
    const token = system.colorIndex.get(hex);
    if (token && !token.site.deprecated) {
      if (!isTokenSource) push('hardcoded-token-color', index, literal, tokenHint(token));
    } else {
      push('off-palette-color', index, literal, token ? `retired legacy color "${token.name}"; not in the palette` : 'not in tokens.json');
    }
  };

  for (const m of text.matchAll(HEX)) {
    // In-page anchors (href="#bad") aren't colors.
    if (/(?:href|to)=["']$/.test(text.slice(Math.max(0, m.index - 6), m.index))) continue;
    checkColor(normalizeHex(m[0]), m.index, m[0].toLowerCase());
  }
  for (const m of text.matchAll(RGB)) {
    checkColor(channelsToHex(m[1], m[2], m[3]), m.index, `rgb(${m[1]},${m[2]},${m[3]})`);
  }

  for (const m of text.matchAll(DEFAULT_CLASS)) {
    push('default-palette-class', m.index, m[0], 'Tailwind default palette; use a system color');
  }

  if (system.legacyNames.length) {
    const legacy = new RegExp(`(?<![\\w-])${UTILITY}-(${system.legacyNames.join('|')})(?:\\/\\d+)?(?![\\w-])`, 'g');
    for (const m of text.matchAll(legacy)) {
      const token = system.tokens.find((t) => t.name === m[1] && t.site.deprecated);
      const to = token?.site.replaceWith;
      push('legacy-color-class', m.index, m[0], to ? `legacy alias; use ${m[0].replace(m[1], to)}` : 'retired legacy color with no replacement');
    }
  }

  if (!matchesAny(file, system.allowArbitrary)) {
    for (const m of text.matchAll(ARBITRARY)) {
      push('arbitrary-value', m.index, m[0], 'one-off value; use a primitive or a standard Tailwind step');
    }
  }

  for (const m of text.matchAll(FONT_FAMILY)) {
    const value = (m[1] ?? m[2]).trim();
    if (/var\(--font-/.test(value) || /^(inherit|initial|unset)\b/.test(value)) continue;
    push('font-family', m.index, value, 'literal font stack; use a font utility or var(--font-*)');
  }

  for (const font of system.restrictedFonts) {
    if (font.allowed.includes(file)) continue;
    const re = new RegExp(`(?<![\\w-])(?:font-${font.name}|${font.cssVar})(?![\\w-])`, 'g');
    for (const m of text.matchAll(re)) {
      push('restricted-font', m.index, m[0], `the ${font.name} face is limited to ${font.allowed.join(', ')}`);
    }
  }

  for (const [name, spec] of Object.entries(system.components)) {
    const tag = new RegExp(`<${name}\\b([^>]*)>`, 'g');
    for (const t of text.matchAll(tag)) {
      for (const [prop, policy] of Object.entries(spec.props ?? {})) {
        const attr = new RegExp(`(?<![\\w-])${prop}=["']([^"']+)["']`).exec(t[1]);
        if (!attr) continue;
        const value = attr[1];
        const index = t.index + 1 + name.length + attr.index;
        if (policy.forbidden?.[value]) {
          push('forbidden-prop-value', index, `${name} ${prop}="${value}"`, policy.forbidden[value]);
        } else if (policy.deprecated?.[value]) {
          push('legacy-prop-value', index, `${name} ${prop}="${value}"`, `use ${prop}="${policy.deprecated[value]}"`);
        }
      }
    }
  }

  return found;
}

// ── Token sync ──────────────────────────────────────────────────────────────

/** Custom properties declared in the first :root block of a stylesheet. */
export function parseRootVars(css) {
  const block = css.replace(/\/\*[\s\S]*?\*\//g, '').match(/:root\s*\{([^}]*)\}/);
  const vars = {};
  for (const m of (block?.[1] ?? '').matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) vars[m[1]] = m[2].trim();
  return vars;
}

const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

function leafPaths(obj, prefix) {
  if (obj == null || typeof obj !== 'object' || Array.isArray(obj)) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) => leafPaths(v, `${prefix}.${k}`));
}

function cssValueMatches(token, value) {
  if (token.type === 'color') {
    const channels = value.match(/^(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})$/);
    const hex = channels ? channelsToHex(channels[1], channels[2], channels[3]) : /^#[0-9a-f]+$/i.test(value) ? normalizeHex(value) : null;
    return hex === normalizeHex(token.value);
  }
  if (token.type === 'cubicBezier') {
    const nums = value.match(/^cubic-bezier\(([^)]+)\)$/)?.[1].split(',').map(Number);
    return !!nums && nums.length === 4 && nums.every((n, i) => n === token.value[i]);
  }
  return value === String(token.value);
}

/**
 * tokens.json ↔ site.css :root ↔ tailwind theme.extend, in both directions.
 * `theme` is the resolved tailwind config's `theme.extend`.
 */
export function checkTokenSync(tokens, siteCss, theme, siteCssPath = 'src/styles/site.css') {
  const flat = flattenTokens(tokens);
  const rootVars = parseRootVars(siteCss);
  const problems = [];
  const report = (file, value, message) => problems.push({ rule: 'token-sync', file, line: 0, value, message });

  for (const t of flat) {
    const cssVar = t.site.cssVar;
    if (cssVar && t.type !== 'fontFamily') {
      if (!(cssVar in rootVars)) report(siteCssPath, cssVar, `token "${t.path}" expects ${cssVar} in :root`);
      else if (!cssValueMatches(t, rootVars[cssVar])) report(siteCssPath, cssVar, `${cssVar} is "${rootVars[cssVar]}" but token "${t.path}" is ${JSON.stringify(t.value)}`);
    }

    const refVar = (t.ref ?? t).site.cssVar;
    for (const path of t.site.tailwind ?? []) {
      const value = getPath(theme, path);
      if (value === undefined) {
        report('tailwind.config.mjs', path, `token "${t.path}" expects theme.extend.${path}`);
        continue;
      }
      const first = Array.isArray(value) ? value[0] : value;
      const ok =
        (refVar && String(first).includes(`var(${refVar})`)) ||
        (t.type === 'color' && /^#[0-9a-f]+$/i.test(first) && normalizeHex(first) === normalizeHex(t.value));
      if (!ok) report('tailwind.config.mjs', path, `theme.extend.${path} is ${JSON.stringify(value)}, which doesn't implement token "${t.path}"`);
    }
  }

  const claimed = new Set(flat.flatMap((t) => t.site.tailwind ?? []));
  for (const group of ['colors', 'fontFamily']) {
    if (!theme?.[group]) continue;
    for (const path of leafPaths(theme[group], group)) {
      if (!claimed.has(path)) report('tailwind.config.mjs', path, `theme.extend.${path} has no token in design-system/tokens.json`);
    }
  }
  return problems;
}

// ── Baseline ────────────────────────────────────────────────────────────────

const keyOf = (v) => `${v.rule} ${v.value}`;

/** { file: { "rule value": count } }, sorted so diffs stay readable. */
export function toBaseline(violations) {
  const out = {};
  for (const v of [...violations].sort((a, b) => a.file.localeCompare(b.file) || keyOf(a).localeCompare(keyOf(b)))) {
    out[v.file] ??= {};
    out[v.file][keyOf(v)] = (out[v.file][keyOf(v)] ?? 0) + 1;
  }
  return out;
}

/**
 * Split current violations into those the baseline already accepts and new
 * ones. Matching is by count per file+rule+value, so moving code around a
 * file doesn't trip it, but adding one more copy does.
 */
export function compareBaseline(violations, baseline) {
  const current = toBaseline(violations);
  const fresh = [];
  let fixed = 0;
  for (const [file, keys] of Object.entries(current)) {
    for (const [key, count] of Object.entries(keys)) {
      const allowed = baseline[file]?.[key] ?? 0;
      if (count > allowed) {
        fresh.push(...violations.filter((v) => v.file === file && keyOf(v) === key).map((v) => ({ ...v, allowed, count })));
      }
    }
  }
  for (const [file, keys] of Object.entries(baseline)) {
    for (const [key, allowed] of Object.entries(keys)) fixed += Math.max(0, allowed - (current[file]?.[key] ?? 0));
  }
  return { fresh, fixed };
}

/** Ratchet: lower each baseline count to what's left, never raise or add one. */
export function shrinkBaseline(violations, baseline) {
  const current = toBaseline(violations);
  const out = {};
  for (const [file, keys] of Object.entries(baseline)) {
    for (const [key, allowed] of Object.entries(keys)) {
      const n = Math.min(allowed, current[file]?.[key] ?? 0);
      if (n > 0) (out[file] ??= {})[key] = n;
    }
  }
  return out;
}
