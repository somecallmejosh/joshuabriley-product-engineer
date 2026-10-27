import { describe, expect, it } from 'vitest';
import { GAMES, gameBySlug } from '~/lib/games';
import { gameIllustrationDescriptions, hasGameIllustration } from '~/lib/game-illustrations';
import { isCorrect, validateQuiz, type QuizQuestion } from '~/lib/quiz';

describe('game registry', () => {
  it('gives every game an illustration, and no illustration to a missing game', () => {
    for (const game of GAMES) expect(hasGameIllustration(game.slug), game.slug).toBe(true);
    expect(Object.keys(gameIllustrationDescriptions).sort()).toEqual(GAMES.map((g) => g.slug).sort());
  });

  it('has unique, URL-safe slugs', () => {
    const slugs = GAMES.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it('finds games by slug', () => {
    expect(gameBySlug('alt-or-not')?.title).toBe('Alt or not?');
    expect(gameBySlug('missing')).toBeUndefined();
  });

  it('keeps registry copy free of em and en dashes', () => {
    for (const g of GAMES) {
      expect(`${g.title}${g.summary}${g.teaches}${g.outro}`).not.toMatch(/[—–]/);
    }
  });
});

describe.each(GAMES.filter((g) => g.kind === 'quiz').map((g) => [g.slug, g] as const))(
  'quiz %s',
  (_slug, game) => {
    const questions = (game as { questions: QuizQuestion[] }).questions;

    it('is a valid question set', () => {
      expect(validateQuiz(questions)).toEqual([]);
    });

    it('stays short: 5 to 8 questions', () => {
      expect(questions.length).toBeGreaterThanOrEqual(5);
      expect(questions.length).toBeLessThanOrEqual(8);
    });

    it('does not put every answer in the same position', () => {
      const positions = new Set(questions.map((q) => q.choices.findIndex((c) => c.id === q.answer)));
      expect(positions.size).toBeGreaterThan(1);
    });
  },
);

describe('validateQuiz', () => {
  const base: QuizQuestion = {
    id: 'q',
    prompt: 'Prompt',
    choices: [
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B' },
    ],
    answer: 'a',
    explanation: 'Because.',
  };

  it('accepts a valid question and scores it', () => {
    expect(validateQuiz([base])).toEqual([]);
    expect(isCorrect(base, 'a')).toBe(true);
    expect(isCorrect(base, 'b')).toBe(false);
  });

  it('flags broken questions', () => {
    expect(validateQuiz([{ ...base, answer: 'z' }])).toContain('q: answer is not a choice');
    expect(validateQuiz([base, base])).toContain('q: duplicate question id');
    expect(validateQuiz([{ ...base, explanation: 'Wait — no.' }])).toContain('q: uses an em or en dash');
  });
});
