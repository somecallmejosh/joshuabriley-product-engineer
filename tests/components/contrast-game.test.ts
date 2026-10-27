import { describe, expect, it } from 'vitest';
import {
  AA_NORMAL,
  blend,
  contrastRatio,
  formatRatio,
  makeRound,
  parseRgb,
  scoreJustEnough,
  strengthForRatio,
  type Pairing,
} from '~/lib/contrast-game';

const ink = { token: '--ink', label: 'ink', rgb: [26, 27, 30] as [number, number, number] };
const paper = { token: '--paper', label: 'paper', rgb: [250, 251, 252] as [number, number, number] };
const accent = { token: '--accent', label: 'accent blue', rgb: [46, 92, 138] as [number, number, number] };

describe('contrastRatio', () => {
  it('matches the WCAG extremes', () => {
    expect(contrastRatio([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 5);
    expect(contrastRatio([119, 119, 119], [119, 119, 119])).toBe(1);
  });

  it('matches a known AA boundary color', () => {
    // #767676 on white is the classic lightest grey that passes AA.
    expect(contrastRatio([118, 118, 118], [255, 255, 255])).toBeCloseTo(4.54, 2);
  });

  it('is symmetric', () => {
    expect(contrastRatio(ink.rgb, paper.rgb)).toBe(contrastRatio(paper.rgb, ink.rgb));
  });
});

describe('parseRgb', () => {
  it('reads both computed-style syntaxes', () => {
    expect(parseRgb('rgb(46, 92, 138)')).toEqual([46, 92, 138]);
    expect(parseRgb('rgb(46 92 138)')).toEqual([46, 92, 138]);
    expect(parseRgb('nonsense')).toBeNull();
  });
});

describe('blend and strengthForRatio', () => {
  it('returns the endpoints at 0% and 100%', () => {
    expect(blend(ink.rgb, paper.rgb, 100)).toEqual(ink.rgb);
    expect(blend(ink.rgb, paper.rgb, 0)).toEqual(paper.rgb);
  });

  it('finds a strength near the requested ratio', () => {
    const s = strengthForRatio(ink.rgb, paper.rgb, 4);
    expect(contrastRatio(blend(ink.rgb, paper.rgb, s), paper.rgb)).toBeCloseTo(4, 0);
  });
});

describe('makeRound', () => {
  const pairings: Pairing[] = [
    { fg: ink, bg: paper },
    { fg: paper, bg: accent },
  ];

  it('never lands inside the ambiguous band around 4.5:1', () => {
    for (let i = 0; i < 500; i++) {
      const round = makeRound(pairings);
      expect(Math.abs(round.ratio - AA_NORMAL)).toBeGreaterThanOrEqual(0.15);
      expect(round.passes).toBe(round.ratio >= AA_NORMAL);
      expect(round.strength).toBeGreaterThanOrEqual(1);
      expect(round.strength).toBeLessThanOrEqual(100);
    }
  });

  it('produces both outcomes', () => {
    const outcomes = new Set(Array.from({ length: 200 }, () => makeRound(pairings).passes));
    expect(outcomes).toEqual(new Set([true, false]));
  });

  it('rejects palettes with nothing to fade', () => {
    expect(() => makeRound([{ fg: paper, bg: paper }])).toThrow();
  });
});

describe('formatRatio', () => {
  it('truncates so a failing ratio never displays as passing', () => {
    expect(formatRatio(4.4999)).toBe('4.49:1');
    expect(formatRatio(7)).toBe('7.00:1');
  });
});

describe('scoreJustEnough', () => {
  it('rewards landing just above the threshold', () => {
    expect(scoreJustEnough(4.49)).toBe(0);
    expect(scoreJustEnough(4.5)).toBe(100);
    expect(scoreJustEnough(4.7)).toBe(90);
    expect(scoreJustEnough(6.5)).toBe(0);
    expect(scoreJustEnough(12)).toBe(0);
  });
});
