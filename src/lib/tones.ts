/**
 * Legacy tone names accepted by the active Metric component.
 * Only the `Tone` type is consumed now — the old per-tone class map was dead
 * code carrying pre-rebrand color literals (text-sunset-deep, text-[#C13A22],
 * etc.) that didn't follow the surface, so it was removed. Components map tone →
 * classes themselves; the single accent is surface-aware via --accent-rgb.
 */

export const TONES = [
  'coral',
  'plum',
  'sage',
  'sunset',
  'navy',
  'sky',
  'lemon',
  'cream',
] as const;

export type Tone = (typeof TONES)[number];
