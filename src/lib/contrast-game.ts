/**
 * Shared module: "Pass or fail?" contrast game for the 404 page.
 * Pure and framework-free. The island reads real token colors from the page,
 * hands them here, and renders whatever round comes back.
 *
 * Every sample is a site token faded toward its background, so the game never
 * introduces a color outside the palette. Ratios follow WCAG 2.x and are judged
 * unrounded, the way the spec requires.
 */

export type Rgb = [number, number, number];

/** Body-text threshold for WCAG AA. */
export const AA_NORMAL = 4.5;

/** Rounds closer than this to the threshold are too close to judge by eye. */
const AMBIGUOUS_BAND = 0.15;

export interface Swatch {
  /** CSS custom property name, e.g. `--ink`. */
  token: string;
  /** Plain-language name used in the screen reader description. */
  label: string;
  rgb: Rgb;
}

export interface Pairing {
  fg: Swatch;
  bg: Swatch;
}

export interface Round {
  fg: Swatch;
  bg: Swatch;
  /** Foreground strength as a whole percentage, 1-100. */
  strength: number;
  ratio: number;
  passes: boolean;
}

/** Parses the `rgb(r, g, b)` / `rgb(r g b)` strings getComputedStyle returns. */
export function parseRgb(value: string): Rgb | null {
  const parts = value.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return null;
  const [r, g, b] = parts.slice(0, 3).map(Number);
  return [r, g, b];
}

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function luminance([r, g, b]: Rgb): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** The color a browser paints for `fg` at `strength`% over an opaque `bg`. */
export function blend(fg: Rgb, bg: Rgb, strength: number): Rgb {
  const a = strength / 100;
  return fg.map((c, i) => c * a + bg[i] * (1 - a)) as Rgb;
}

/** Whole-percent strength whose blended ratio lands nearest `target`. */
export function strengthForRatio(fg: Rgb, bg: Rgb, target: number): number {
  let best = 100;
  let bestGap = Infinity;
  for (let s = 1; s <= 100; s++) {
    const gap = Math.abs(contrastRatio(blend(fg, bg, s), bg) - target);
    if (gap < bestGap) {
      best = s;
      bestGap = gap;
    }
  }
  return best;
}

export function makeRound(pairings: Pairing[], random: () => number = Math.random): Round {
  const usable = pairings.filter(({ fg, bg }) => contrastRatio(fg.rgb, bg.rgb) > 6.4);
  if (usable.length === 0) throw new Error('No pairing has enough contrast to fade.');

  for (let attempt = 0; attempt < 50; attempt++) {
    const { fg, bg } = usable[Math.floor(random() * usable.length)];
    // Half the rounds pass, half fail, so guessing one answer every time scores about 50%.
    const target = random() < 0.5 ? 3 + random() * 1.35 : 4.65 + random() * 1.55;
    const strength = strengthForRatio(fg.rgb, bg.rgb, target);
    const ratio = contrastRatio(blend(fg.rgb, bg.rgb, strength), bg.rgb);
    if (Math.abs(ratio - AA_NORMAL) < AMBIGUOUS_BAND) continue;
    return { fg, bg, strength, ratio, passes: ratio >= AA_NORMAL };
  }
  throw new Error('Could not build an unambiguous round.');
}

/** Two decimals, truncated rather than rounded, so 4.496 never displays as 4.50. */
export function formatRatio(ratio: number): string {
  return `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`;
}

/**
 * "Just enough contrast": 100 points for landing exactly on 4.5:1, falling to 0
 * at 6.5:1. Anything below 4.5:1 fails and scores 0.
 */
export function scoreJustEnough(ratio: number): number {
  if (ratio < AA_NORMAL) return 0;
  return Math.max(0, Math.round(100 - (ratio - AA_NORMAL) * 50));
}
