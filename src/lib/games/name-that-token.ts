import type { QuizQuestion } from '~/lib/quiz';

/** Draft copy for Josh's review. Every answer is a real token from design-system/tokens.json. */
export const nameThatToken: QuizQuestion[] = [
  {
    id: 'muted-text',
    prompt: 'This site sets supporting text, like dates and captions, in a softer grey that still passes AA. Which token is it?',
    visual: { kind: 'token', sample: 'muted-text' },
    choices: [
      { id: 'faint', label: '--ink-faint', code: true },
      { id: 'muted', label: '--ink-muted', code: true },
      { id: 'line-strong', label: '--line-strong', code: true },
    ],
    answer: 'muted',
    explanation:
      '--ink-muted is about 6:1 on the page background, so it is safe for text. The lighter --ink-faint fails contrast, which is why it is reserved for decoration.',
  },
  {
    id: 'faint',
    prompt: 'Separator dots and arrow glyphs use a pale grey that is never allowed to carry text. Which token is it?',
    visual: { kind: 'token', sample: 'faint' },
    choices: [
      { id: 'faint', label: '--ink-faint', code: true },
      { id: 'line', label: '--line', code: true },
      { id: 'muted', label: '--ink-muted', code: true },
    ],
    answer: 'faint',
    explanation:
      'Naming a token for its job, and writing down where it must not be used, stops a decorative grey from quietly turning into a body text color.',
  },
  {
    id: 'hairline',
    prompt: 'Hairline rules and card borders use the lightest of the line colors. Which token is it?',
    visual: { kind: 'token', sample: 'hairline' },
    choices: [
      { id: 'line-strong', label: '--line-strong', code: true },
      { id: 'faint', label: '--ink-faint', code: true },
      { id: 'line', label: '--line', code: true },
    ],
    answer: 'line',
    explanation:
      '--line is for quiet structure. Its partner --line-strong is for emphasised rules and input borders, where the edge needs to be easier to see.',
  },
  {
    id: 'accent',
    prompt: 'Links, primary buttons and the italic words in headlines share one deep denim blue. Which token is it?',
    visual: { kind: 'token', sample: 'accent' },
    choices: [
      { id: 'ink', label: '--ink', code: true },
      { id: 'accent', label: '--accent', code: true },
      { id: 'muted', label: '--ink-muted', code: true },
    ],
    answer: 'accent',
    explanation:
      'There is exactly one accent. It also changes on dark surfaces, switching to a lighter blue so it keeps its contrast, which a hard-coded hex value could never do.',
  },
  {
    id: 'surfaces',
    prompt: 'The page itself sits on a near-white with a faint cool cast. Panels that lift off it are pure white. Which token is the page?',
    visual: { kind: 'token', sample: 'surfaces' },
    choices: [
      { id: 'raised', label: '--raised', code: true },
      { id: 'paper', label: '--paper', code: true },
      { id: 'line', label: '--line', code: true },
    ],
    answer: 'paper',
    explanation:
      '--paper is the page and --raised is for surfaces that lift off it. Using white sparingly is what keeps the raised panels, like this game, feeling raised.',
  },
  {
    id: 'serif',
    prompt:
      'The italic display font is Newsreader, but its CSS variable kept the name of the font it replaced. Which variable is it?',
    visual: { kind: 'token', sample: 'serif' },
    choices: [
      { id: 'newsreader', label: '--font-newsreader', code: true },
      { id: 'serif', label: '--font-serif', code: true },
      { id: 'fraunces', label: '--font-fraunces', code: true },
    ],
    answer: 'fraunces',
    explanation:
      'Renaming a widely used variable means touching every file that uses it, so the old name stayed. Names that outlive their meaning are a real design system cost; a good one documents them.',
  },
];
