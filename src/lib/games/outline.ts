/**
 * "Fix the outline": raise or lower heading levels until an article's outline
 * matches its structure. Draft copy for Josh's review; follows WCAG 1.3.1 and
 * the W3C WAI headings tutorial.
 */

export interface OutlineHeading {
  id: string;
  text: string;
  /** Intended level, 1-6. */
  level: number;
  /** Broken level the round starts with. */
  start: number;
}

export interface OutlineRound {
  id: string;
  title: string;
  headings: OutlineHeading[];
  explanation: string;
}

export const outlineRounds: OutlineRound[] = [
  {
    id: 'recipe',
    title: 'A recipe page',
    headings: [
      { id: 'title', text: 'Weeknight chili', level: 1, start: 1 },
      { id: 'ingredients', text: 'Ingredients', level: 2, start: 4 },
      { id: 'spices', text: 'Spices', level: 3, start: 2 },
      { id: 'method', text: 'Method', level: 2, start: 1 },
      { id: 'serving', text: 'Serving', level: 2, start: 3 },
    ],
    explanation:
      'One h1 names the page. Ingredients, Method and Serving are siblings, so they share a level, and Spices is part of Ingredients, so it sits one level below.',
  },
  {
    id: 'docs',
    title: 'Component documentation',
    headings: [
      { id: 'title', text: 'Button', level: 1, start: 1 },
      { id: 'usage', text: 'Usage', level: 2, start: 3 },
      { id: 'when', text: 'When to use', level: 3, start: 5 },
      { id: 'when-not', text: 'When not to use', level: 3, start: 4 },
      { id: 'a11y', text: 'Accessibility', level: 2, start: 2 },
      { id: 'keyboard', text: 'Keyboard support', level: 3, start: 2 },
    ],
    explanation:
      'Levels describe structure, not size. Skipping from h2 to h4 suggests a missing section, which is confusing for anyone moving through the page by headings.',
  },
  {
    id: 'handbook',
    title: 'A team handbook',
    headings: [
      { id: 'title', text: 'Team handbook', level: 1, start: 2 },
      { id: 'start', text: 'Getting started', level: 2, start: 2 },
      { id: 'week', text: 'Your first week', level: 3, start: 4 },
      { id: 'accounts', text: 'Accounts and tools', level: 3, start: 3 },
      { id: 'work', text: 'How we work', level: 2, start: 1 },
      { id: 'meetings', text: 'Meetings', level: 3, start: 3 },
      { id: 'planning', text: 'Weekly planning', level: 4, start: 3 },
    ],
    explanation:
      'Screen reader users often jump between headings to skim. A clean outline lets them hear the shape of the page before reading any of it.',
  },
];

export function clampLevel(level: number): number {
  return Math.min(6, Math.max(1, level));
}

/** Structural problems in a list of heading levels, in plain language. */
export function outlineIssues(headings: { text: string; level: number }[]): string[] {
  const issues: string[] = [];
  const h1s = headings.filter((h) => h.level === 1).length;
  if (h1s === 0) issues.push('There is no h1 naming the page.');
  if (h1s > 1) issues.push(`There are ${h1s} h1 headings; a page usually needs one.`);
  if (headings[0] && headings[0].level !== 1) issues.push('The first heading should be the h1.');
  headings.forEach((h, i) => {
    const prev = headings[i - 1];
    if (prev && h.level > prev.level + 1) {
      issues.push(`"${h.text}" jumps from h${prev.level} to h${h.level}, skipping a level.`);
    }
  });
  return issues;
}

export function matchesOutline(levels: number[], headings: OutlineHeading[]): boolean {
  return headings.every((h, i) => levels[i] === h.level);
}
