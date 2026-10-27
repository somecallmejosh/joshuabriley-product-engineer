/**
 * Registry for the /play/ games: one entry per game, read by the /play/ index,
 * the /play/[slug]/ route, and any blog post that embeds a game.
 */
import type { QuizQuestion } from '~/lib/quiz';
import { altOrNot } from '~/lib/games/alt-or-not';
import { nameThatButton } from '~/lib/games/name-that-button';
import { useThePlatform } from '~/lib/games/use-the-platform';
import { nameThatToken } from '~/lib/games/name-that-token';
import { shouldItStop } from '~/lib/games/should-it-stop';

interface GameBase {
  slug: string;
  /** Plain title, used in lists and the browser tab. */
  title: string;
  /** Page heading; the part in `emphasis` renders in the display italic. */
  heading: { lead: string; emphasis: string };
  topic: 'Accessibility' | 'Front end' | 'Design systems';
  /** One sentence: what you do. */
  summary: string;
  /** One sentence: what you come away knowing. */
  teaches: string;
  /** Closing line on the score screen. */
  outro: string;
  /** Blog post slugs that embed this game after the article. */
  posts?: string[];
}

export type Game =
  | (GameBase & { kind: 'quiz'; questions: QuizQuestion[] })
  | (GameBase & { kind: 'contrast' | 'just-enough' | 'tab-order' | 'outline' | 'snap-grid' | 'spot-the-drift' });

export const GAMES: Game[] = [
  {
    slug: 'contrast',
    kind: 'contrast',
    title: 'Pass or fail?',
    heading: { lead: 'Pass or', emphasis: 'fail?' },
    topic: 'Accessibility',
    summary: 'Guess whether faded text still passes WCAG AA, then see the real contrast ratio.',
    teaches: 'How close "looks fine" can be to failing, and why contrast is worth checking with a tool.',
    outro: '',
  },
  {
    slug: 'alt-or-not',
    kind: 'quiz',
    title: 'Alt or not?',
    heading: { lead: 'Alt', emphasis: 'or not?' },
    topic: 'Accessibility',
    summary: 'Pick the right alt text for images in context: portraits, logos, charts and decoration.',
    teaches: 'When to describe an image, when to name a link, and when an empty alt is the right answer.',
    outro: 'Context decides alt text. The same image can need a description in one place and nothing in another.',
    questions: altOrNot,
  },
  {
    slug: 'use-the-platform',
    kind: 'quiz',
    title: 'Use the platform',
    heading: { lead: 'Use the', emphasis: 'platform.' },
    topic: 'Front end',
    summary: 'Match each behavior to the native HTML element that already does it.',
    teaches: 'Which built-in elements give you keyboard support, states and semantics without extra JavaScript.',
    outro: 'Native elements carry years of browser and assistive tech work. Reach for them before writing your own.',
    questions: useThePlatform,
    posts: ['native-lit-or-stencil'],
  },
  {
    slug: 'name-that-button',
    kind: 'quiz',
    title: 'Name that button',
    heading: { lead: 'Name that', emphasis: 'button.' },
    topic: 'Accessibility',
    summary: 'Choose the accessible name for icon-only buttons, from trash cans to three-dot menus.',
    teaches: 'How to name buttons by what they do, so they still make sense out of context.',
    outro: 'A good accessible name says what happens, and is specific enough to tell repeated buttons apart.',
    questions: nameThatButton,
    posts: ['staff-level-ui-engineering-for-dummies'],
  },
  {
    slug: 'tab-order',
    kind: 'tab-order',
    title: 'Tab order',
    heading: { lead: 'Tab', emphasis: 'order.' },
    topic: 'Accessibility',
    summary: 'Put a scrambled form back in the order keyboard focus should follow, then watch the focus ring replay it.',
    teaches: 'Why focus order has to match reading order, and how CSS layout can quietly break it.',
    outro: '',
  },
  {
    slug: 'fix-the-outline',
    kind: 'outline',
    title: 'Fix the outline',
    heading: { lead: 'Fix the', emphasis: 'outline.' },
    topic: 'Accessibility',
    summary: 'Raise and lower heading levels until each page outline matches how the content is organized.',
    teaches: 'How heading levels describe structure, and why skipped or doubled levels confuse people who navigate by headings.',
    outro: '',
  },
  {
    slug: 'snap-to-grid',
    kind: 'snap-grid',
    title: 'Snap to grid',
    heading: { lead: 'Snap to', emphasis: 'grid.' },
    topic: 'Design systems',
    summary: 'Nudge three drifting interface pieces back onto an 8px spacing grid.',
    teaches: 'How a shared spacing unit keeps separate screens lined up without anyone measuring.',
    outro: '',
  },
  {
    slug: 'spot-the-drift',
    kind: 'spot-the-drift',
    title: 'Spot the drift',
    heading: { lead: 'Spot the', emphasis: 'drift.' },
    topic: 'Design systems',
    summary: 'Compare a design system component with its production copy and find what changed.',
    teaches: 'What component drift looks like up close, and why small local tweaks add up.',
    outro: '',
    posts: ['the-hidden-cost-of-component-inconsistency'],
  },
  {
    slug: 'just-enough-contrast',
    kind: 'just-enough',
    title: 'Just enough contrast',
    heading: { lead: 'Just enough', emphasis: 'contrast.' },
    topic: 'Accessibility',
    summary: 'Fade text with a slider until it only just passes WCAG AA, then see how close you landed.',
    teaches: 'Where the 4.5:1 line really sits for this site\'s colors, and why a little headroom helps.',
    outro: '',
  },
  {
    slug: 'should-it-stop',
    kind: 'quiz',
    title: 'Should it stop?',
    heading: { lead: 'Should it', emphasis: 'stop?' },
    topic: 'Accessibility',
    summary: 'Decide what each animation should do when someone has asked their device to reduce motion.',
    teaches: 'Which motion is decoration and which carries information, and how to honor reduced motion without losing feedback.',
    outro: 'Reduced motion means less movement, not less information. Keep what tells people something and drop what only decorates.',
    questions: shouldItStop,
  },
  {
    slug: 'name-that-token',
    kind: 'quiz',
    title: 'Name that token',
    heading: { lead: 'Name that', emphasis: 'token.' },
    topic: 'Design systems',
    summary: 'Match colors and type on this site to the design tokens behind them.',
    teaches: 'How a small, well-named token set carries a whole site, including the rules about where each token must not go.',
    outro: 'Good token names describe a job, not a color. That is what lets one change reach every page safely.',
    questions: nameThatToken,
    posts: ['design-system-rules-for-ai-agents'],
  },
];

export function gameForPost(postSlug: string): Game | undefined {
  return GAMES.find((game) => game.posts?.includes(postSlug));
}

export function gameBySlug(slug: string): Game | undefined {
  return GAMES.find((game) => game.slug === slug);
}
