/** Accessible descriptions for GameIllustration, one per game, keyed by game slug. */
export const gameIllustrationDescriptions = {
  contrast: 'Two text samples, one stamped pass and one too faint to read stamped fail.',
  'alt-or-not': 'A framed landscape picture with a luggage tag hanging off it that reads alt equals question mark.',
  'use-the-platform': 'A div wearing glasses and a fake moustache pretends to be a button, next to a real button that works out of the box.',
  'name-that-button': 'Three icon buttons with no labels, and a speech bubble that says: Button. Button. Button.',
  'tab-order': 'A focus ring hops from a name field to an email field to a send button, then one hop loops back to the start.',
  'fix-the-outline': 'A heading outline with h1 and h2 in place and an h4 tipping over, with a sticky note asking: h3?',
  'snap-to-grid': 'A box sits neatly on a dot grid while a second box wobbles 3 pixels off it.',
  'spot-the-drift': 'A designed Save button next to a shipped one with rounder corners and a darker color, under a magnifying glass.',
  'just-enough-contrast': 'Five samples of Aa fade from dark to faint, with a dashed line marking where 4.5:1 sits and a slider set right on it.',
  'should-it-stop': 'A bouncing ball comes to rest next to a pause button and falls asleep.',
  'name-that-token': 'A smiling accent-blue swatch wears a name tag that says: Hello, my name is --accent.',
} as const;

export type IllustratedGame = keyof typeof gameIllustrationDescriptions;

export const hasGameIllustration = (slug: string): slug is IllustratedGame => slug in gameIllustrationDescriptions;
