#!/usr/bin/env node
/**
 * WCAG contrast audit for the Calm design system.
 *
 * Walks the text-on-surface pairs the current components actually use (see
 * src/styles/site.css tokens + the primitives), composites any alpha-channel
 * colors over their surface, and reports the resulting contrast ratio against
 * AA (4.5 normal / 3.0 large) and AAA (7.0 normal / 4.5 large).
 *
 * The system is monochrome + one surface-aware accent: cool paper/ink neutrals
 * with a denim-navy accent that brightens to sky-denim on ink surfaces.
 *
 * Run: `node scripts/check-contrast.mjs`  (or `npm run audit:contrast`)
 * Exit code: 1 if any AA / non-text combination fails.
 */

const TOKENS = {
  paper:         '#fafbfc', // page background
  raised:        '#ffffff', // cards / raised surfaces
  ink:           '#1a1b1e', // primary text, dark surfaces
  'ink-muted':   '#565760', // secondary text (AA min on paper)
  'ink-faint':   '#9a9aa1', // decorative only, never body text
  line:          '#e5e7eb', // hairline dividers
  'line-strong': '#d4d7dd', // emphasised hairline
  accent:        '#2e5c8a', // denim navy — accent on LIGHT surfaces
  'accent-dark': '#6ba6d8', // sky denim — accent on INK/dark surfaces
  'accent-ink':  '#234a70', // pressed accent (light-surface press state)
};

/* ─── color math (sRGB → relative luminance → contrast ratio) ─── */

const hexToRgb = (hex) => {
  const m = hex.replace('#', '');
  const n = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};

const compositeOver = (fgHex, alpha, bgHex) => {
  const [r1, g1, b1] = hexToRgb(fgHex);
  const [r2, g2, b2] = hexToRgb(bgHex);
  const r = Math.round(r1 * alpha + r2 * (1 - alpha));
  const g = Math.round(g1 * alpha + g2 * (1 - alpha));
  const b = Math.round(b1 * alpha + b2 * (1 - alpha));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
};

const channelLum = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * channelLum(r) + 0.7152 * channelLum(g) + 0.0722 * channelLum(b);
};

const contrast = (a, b) => {
  const la = luminance(a);
  const lb = luminance(b);
  const [bright, dark] = la > lb ? [la, lb] : [lb, la];
  return (bright + 0.05) / (dark + 0.05);
};

/* ─── audit cases ───
 *
 * Each case: { context, fg, bg, alpha?, role? }
 *   fg / bg — token name or hex (bg is the surface, composited if alpha given)
 *   alpha   — optional opacity on the foreground (e.g. paper/60 → 0.6)
 *   role    — 'text' (default, AA 4.5 / large 3.0), 'large' (>=24px or >=18.66 bold),
 *             'nonText' (icons/focus rings/UI boundaries, >=3.0),
 *             'decorative' (informational only, never fails — e.g. ink-faint,
 *             hairline dividers whose control is identified by text + focus ring)
 */

const T = TOKENS;

const cases = [
  // ── Text on light surfaces (paper / raised white cards) ──
  { context: 'body / heading (ink) on paper',            fg: T.ink,           bg: T.paper },
  { context: 'body / heading (ink) on raised card',      fg: T.ink,           bg: T.raised },
  { context: 'secondary text (ink-muted) on paper',      fg: T['ink-muted'],  bg: T.paper },
  { context: 'secondary text (ink-muted) on raised',     fg: T['ink-muted'],  bg: T.raised },
  { context: 'calm-label (ink-muted) on paper',          fg: T['ink-muted'],  bg: T.paper },
  { context: 'ink-faint decorative text on paper',       fg: T['ink-faint'],  bg: T.paper, role: 'decorative' },

  // ── Accent text on light surfaces (links, hero CTA, nav) ──
  { context: 'accent link / text on paper',              fg: T.accent,        bg: T.paper },
  { context: 'accent link / text on raised',             fg: T.accent,        bg: T.raised },
  { context: 'accent pressed (accent-ink) on raised',    fg: T['accent-ink'], bg: T.raised },

  // ── Buttons / badges (monochrome) ──
  { context: 'primary button (paper on ink)',            fg: T.paper,         bg: T.ink },
  { context: 'ghost button label (ink on paper)',        fg: T.ink,           bg: T.paper },
  { context: 'solid badge (paper on ink)',               fg: T.paper,         bg: T.ink },
  { context: 'outlined badge (ink-muted on raised)',     fg: T['ink-muted'],  bg: T.raised },

  // ── Text on ink / dark surfaces (footer, reveal card, CTA) ──
  { context: 'body (paper) on ink',                      fg: T.paper,         bg: T.ink },
  { context: 'footer link (paper/70) on ink',            fg: T.paper,         bg: T.ink, alpha: 0.70 },
  { context: 'footer muted (paper/60) on ink',           fg: T.paper,         bg: T.ink, alpha: 0.60 },
  { context: 'footer small mono (paper/55) on ink',      fg: T.paper,         bg: T.ink, alpha: 0.55 },
  { context: 'accent link (accent-dark) on ink',         fg: T['accent-dark'],bg: T.ink },

  // ── Text selection highlight (surface-aware) ──
  { context: 'selection: ink on navy/16 tint over paper', fg: T.ink,          bg: compositeOver(T.accent, 0.16, T.paper) },
  { context: 'selection: ink on accent-dark (on ink)',    fg: T.ink,          bg: T['accent-dark'] },

  // ── Non-text: focus rings + UI boundaries (WCAG 1.4.11, >=3.0) ──
  { context: 'focus ring (accent) on paper',             fg: T.accent,        bg: T.paper,   role: 'nonText' },
  { context: 'focus ring (accent) on raised',            fg: T.accent,        bg: T.raised,  role: 'nonText' },
  { context: 'meter fill (ink) vs track (line)',         fg: T.ink,           bg: T.line,    role: 'nonText' },

  // ── Decorative hairlines (dividers; controls carry text + focus affordance) ──
  { context: 'hairline divider (line) on paper',         fg: T.line,          bg: T.paper,   role: 'decorative' },
  { context: 'emphasis hairline (line-strong) on raised', fg: T['line-strong'], bg: T.raised, role: 'decorative' },
];

/* ─── thresholds & evaluation ─── */

const aaFloor = (role) => (role === 'large' ? 3.0 : 4.5);
const aaaFloor = (role) => (role === 'large' ? 4.5 : 7.0);

const fmt = (n) => n.toFixed(2);
const pad = (s, n) => (s + ' '.repeat(n)).slice(0, n);

const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const YEL = '\x1b[33m';
const GRN = '\x1b[32m';
const DIM = '\x1b[2m';

const rows = [];
let failures = 0;

for (const c of cases) {
  const fgEffective = c.alpha != null ? compositeOver(c.fg, c.alpha, c.bg) : c.fg;
  const ratio = contrast(fgEffective, c.bg);

  let standard, status, color;
  if (c.role === 'decorative') {
    standard = 'decorative';
    status = 'INFO';
    color = DIM;
  } else if (c.role === 'nonText') {
    standard = '>= 3.0 (non-text)';
    if (ratio >= 3.0) { status = 'PASS'; color = GRN; }
    else { status = 'FAIL'; color = RED; failures++; }
  } else {
    standard = c.role === 'large' ? 'AA large (>=3.0)' : 'AA normal (>=4.5)';
    if (ratio >= aaaFloor(c.role)) { status = 'PASS AAA'; color = GRN; }
    else if (ratio >= aaFloor(c.role)) { status = 'PASS AA'; color = YEL; }
    else { status = 'FAIL'; color = RED; failures++; }
  }

  rows.push({
    context: c.context,
    fgHex: fgEffective.toUpperCase(),
    bgHex: c.bg.toUpperCase(),
    ratio,
    standard,
    status,
    color,
  });
}

const headers = ['Context', 'Text', 'Surface', 'Ratio', 'Standard', 'Status'];
const widths = [40, 9, 9, 8, 20, 10];

console.log();
console.log(headers.map((h, i) => pad(h, widths[i])).join(' '));
console.log(widths.map((w) => '-'.repeat(w)).join(' '));

for (const r of rows) {
  const line = [
    pad(r.context, widths[0]),
    pad(r.fgHex, widths[1]),
    pad(r.bgHex, widths[2]),
    pad(`${fmt(r.ratio)}:1`, widths[3]),
    pad(r.standard, widths[4]),
    `${r.color}${pad(r.status, widths[5])}${RESET}`,
  ].join(' ');
  console.log(line);
}

console.log();
const total = rows.length;
const aaa = rows.filter((r) => r.status === 'PASS AAA').length;
const aaOnly = rows.filter((r) => r.status === 'PASS AA').length;
const nonText = rows.filter((r) => r.status === 'PASS').length;
const info = rows.filter((r) => r.status === 'INFO').length;
const fails = rows.filter((r) => r.status === 'FAIL').length;

console.log(`${DIM}${total} combinations checked${RESET}`);
console.log(
  `${GRN}${aaa} pass AAA${RESET}, ${YEL}${aaOnly} pass AA only${RESET}, ` +
  `${GRN}${nonText} non-text pass${RESET}, ${DIM}${info} decorative${RESET}, ` +
  `${fails ? RED : GRN}${fails} fail${RESET}`,
);
console.log();

process.exit(failures > 0 ? 1 : 0);
