/**
 * The favicon mark: the letter J from Style Script Regular (OFL) — the same
 * face the Logo wordmark is set in — traced to an outline so the tab icon
 * never waits on a web font or renders in a fallback.
 *
 * The glyph is drawn in a 64 x 64 space, optically centred on its own ink
 * bounds (the J leans left and hangs a tail, so bounding-box centring beats
 * centring on the advance width). Consumed only by generate-favicon.mjs.
 */

/** Outlined "J", centred in a 64 x 64 box. */
export const MARK_PATH =
  'M23.98 57Q21.01 57 19.11 54.94Q17.2 52.88 17.2 48.59Q17.2 47.8 17.26 47.01Q17.32 46.23 17.44 45.32Q18.11 40.96 20.86 37.12Q23.62 33.27 27.85 30.34Q32.09 27.4 37.24 25.89Q37.3 25.52 37.3 25.19Q37.3 24.86 37.3 24.55V23.4Q37.3 21.23 37.08 18.71Q36.87 16.2 36.15 14.02Q35.42 11.84 33.94 10.45Q32.45 9.06 29.85 9.06Q29.61 9.06 29.34 9.06Q29.06 9.06 28.76 9.12Q25.67 9.48 23.07 11.57Q20.47 13.66 18.77 16.87Q17.08 20.08 16.59 23.71Q16.53 24.13 16.5 24.49Q16.47 24.86 16.47 25.16Q16.47 27.7 17.74 27.7Q18.11 27.7 18.59 27.4Q18.65 27.34 18.77 27.34Q18.96 27.34 18.96 27.64Q18.96 28.13 18.26 29.12Q17.56 30.12 16.17 30.31H15.75Q14.35 30.31 13.84 29.09Q13.33 27.88 13.33 26.43Q13.33 26.07 13.33 25.73Q13.33 25.4 13.39 25.1Q13.75 21.89 15.35 18.68Q16.96 15.47 19.35 12.84Q21.74 10.21 24.65 8.6Q27.55 7 30.52 7H30.88Q34.45 7 36.66 8.66Q38.87 10.33 40.08 12.99Q41.29 15.66 41.75 18.74Q42.2 21.83 42.2 24.74V24.8Q43.35 24.68 44.53 24.58Q45.71 24.49 46.86 24.49Q47.53 24.49 48.25 24.52Q48.98 24.55 49.71 24.62Q50.67 24.68 50.67 25.1Q50.67 25.58 49.71 25.58H49.52Q49.04 25.58 48.5 25.55Q47.95 25.52 47.47 25.52Q46.13 25.52 44.8 25.64Q43.47 25.77 42.2 26.01Q42.2 26.43 42.17 26.79Q42.14 27.16 42.14 27.52Q42.02 29.64 41.41 32.64Q40.81 35.63 39.72 38.96Q38.63 42.29 37.08 45.5Q35.54 48.71 33.57 51.31Q31.61 53.91 29.22 55.46Q26.82 57 23.98 57ZM23.74 55.24Q26.34 55.24 28.4 53.28Q30.46 51.31 32 48.1Q33.54 44.89 34.6 41.14Q35.66 37.39 36.27 33.79Q36.87 30.18 37.12 27.46Q32.82 29.15 29.37 31.94Q25.92 34.72 23.65 38.14Q21.38 41.56 20.53 45.14Q19.98 47.56 19.98 49.49Q19.98 52.28 21.04 53.76Q22.1 55.24 23.74 55.24Z';

export const MARK_BOX = 64;

/** Hairline compensation, in MARK_BOX units. The script's thin strokes drop
 *  out around 16px without it; much above 1.0 the letterform fattens and
 *  loses the thick/thin contrast that makes it read as a script. */
export const MARK_STROKE = 0.9;

/**
 * The wordmark's period, set after the J on its baseline (the J's bowl
 * bottoms out at y 57). The J shifts left by MARK_SHIFT so "J." stays
 * optically centred. r 4 still lands a whole pixel at 16px.
 */
export const DOT = { cx: 46, cy: 53, r: 4 };
export const MARK_SHIFT = -3;

export const INK = '#1A1B1E';
/** The on-ink accent from site.css, since the badge is ink. */
export const ACCENT_ON_INK = '#6BA6D8';
export const PAPER = '#FAFBFC';

/**
 * Badge viewBox. `scale` is the share of the badge the J fills, so lower
 * values add margin around it — that is how the tab icon gets its breathing
 * room and how the maskable icons stay inside their safe zone.
 */
export function badgeViewBox(scale = 1) {
  const side = MARK_BOX / scale;
  const offset = (MARK_BOX - side) / 2;
  return [offset, offset, side, side].map((n) => +n.toFixed(3)).join(' ');
}
