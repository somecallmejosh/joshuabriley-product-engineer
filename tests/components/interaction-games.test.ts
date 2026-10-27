import { describe, expect, it } from 'vitest';
import { isCorrectOrder, moveItem, tabOrderRounds } from '~/lib/games/tab-order';
import { clampLevel, matchesOutline, outlineIssues, outlineRounds } from '~/lib/games/outline';
import { describeOffset, gridPieces, isSnapped, offsetFromGrid } from '~/lib/games/snap-grid';
import { DRIFT_LABELS, driftRounds, scoreDrift } from '~/lib/games/spot-the-drift';
import { saveBest, readBest } from '~/lib/game-best';

const noDashes = (text: string) => expect(text).not.toMatch(/[—–]/);

describe('tab order', () => {
  it('moves items one step and stays in bounds', () => {
    expect(moveItem(['a', 'b', 'c'], 1, -1)).toEqual(['b', 'a', 'c']);
    expect(moveItem(['a', 'b', 'c'], 1, 1)).toEqual(['a', 'c', 'b']);
    expect(moveItem(['a', 'b', 'c'], 0, -1)).toEqual(['a', 'b', 'c']);
    expect(moveItem(['a', 'b', 'c'], 2, 1)).toEqual(['a', 'b', 'c']);
  });

  it.each(tabOrderRounds.map((r) => [r.id, r] as const))('round %s is well formed', (_id, round) => {
    const ids = round.fields.map((f) => f.id).sort();
    expect([...round.correct].sort()).toEqual(ids);
    expect([...round.start].sort()).toEqual(ids);
    expect(isCorrectOrder(round.start, round.correct)).toBe(false);
    expect(isCorrectOrder(round.correct, round.correct)).toBe(true);
    // Every area named in the layout belongs to a field, and every field has an area.
    const areas = new Set(round.areas.join(' ').split(/\s+/).filter((a) => a !== '.'));
    expect([...areas].sort()).toEqual(round.fields.map((f) => f.area).sort());
    noDashes(round.explanation);
  });
});

describe('fix the outline', () => {
  it('reports structural problems in plain language', () => {
    expect(outlineIssues([{ text: 'A', level: 1 }, { text: 'B', level: 2 }])).toEqual([]);
    expect(outlineIssues([{ text: 'A', level: 1 }, { text: 'B', level: 3 }])).toEqual([
      '"B" jumps from h1 to h3, skipping a level.',
    ]);
    expect(outlineIssues([{ text: 'A', level: 1 }, { text: 'B', level: 1 }])).toContain(
      'There are 2 h1 headings; a page usually needs one.',
    );
    expect(outlineIssues([{ text: 'A', level: 2 }])).toEqual([
      'There is no h1 naming the page.',
      'The first heading should be the h1.',
    ]);
  });

  it('clamps levels to 1-6', () => {
    expect(clampLevel(0)).toBe(1);
    expect(clampLevel(7)).toBe(6);
  });

  it.each(outlineRounds.map((r) => [r.id, r] as const))('round %s starts broken and ends clean', (_id, round) => {
    const target = round.headings.map((h) => ({ text: h.text, level: h.level }));
    expect(outlineIssues(target)).toEqual([]);
    expect(matchesOutline(round.headings.map((h) => h.start), round.headings)).toBe(false);
    expect(matchesOutline(round.headings.map((h) => h.level), round.headings)).toBe(true);
    noDashes(round.explanation);
  });
});

describe('snap to grid', () => {
  it('measures signed distance to the nearest grid line', () => {
    expect(offsetFromGrid(16)).toBe(0);
    expect(offsetFromGrid(19)).toBe(3);
    expect(offsetFromGrid(21)).toBe(-3);
    expect(offsetFromGrid(20)).toBe(4);
  });

  it('describes offsets for screen readers', () => {
    expect(describeOffset({ x: 16, y: 24 })).toBe('on the grid');
    expect(describeOffset({ x: 17, y: 30 })).toBe('1 pixel too far right, 2 pixels too high');
  });

  it('starts every piece off the grid on both axes', () => {
    for (const p of gridPieces) {
      expect(isSnapped(p)).toBe(false);
      expect(offsetFromGrid(p.x)).not.toBe(0);
      expect(offsetFromGrid(p.y)).not.toBe(0);
    }
  });
});

describe('spot the drift', () => {
  it('scores found, missed and wrong picks', () => {
    expect(scoreDrift(['padding', 'border'], ['padding', 'radius', 'icon-size'])).toEqual({
      found: ['padding'],
      missed: ['radius', 'icon-size'],
      wrong: ['border'],
    });
  });

  it.each(driftRounds.map((r) => [r.id, r] as const))('round %s is consistent', (_id, round) => {
    expect(round.options).toHaveLength(6);
    expect(new Set(round.options).size).toBe(6);
    expect(round.drifted).toHaveLength(3);
    for (const p of round.drifted) expect(round.options).toContain(p);
    // The spoken specs must agree with the answer: drifted rows differ, others match.
    for (const p of round.options) {
      expect(DRIFT_LABELS[p]).toBeTruthy();
      const { system, production } = round.specs[p];
      expect(system !== production).toBe(round.drifted.includes(p));
    }
    noDashes(round.explanation);
  });
});

describe('best scores', () => {
  it('keeps the better score in either direction', () => {
    localStorage.clear();
    expect(readBest('t')).toBeNull();
    expect(saveBest('t', 3)).toBe(3);
    expect(saveBest('t', 2)).toBe(3);
    expect(saveBest('t', 5)).toBe(5);
    expect(saveBest('n', 40, false)).toBe(40);
    expect(saveBest('n', 55, false)).toBe(40);
    expect(saveBest('n', 31, false)).toBe(31);
  });
});
