import type { QuizQuestion } from '~/lib/quiz';

/**
 * Draft copy for Josh's review. The question each time: what should happen when
 * someone has turned on "reduce motion"? Follows WCAG 2.2.2 and 2.3.3.
 */
export const shouldItStop: QuizQuestion[] = [
  {
    id: 'parallax',
    prompt:
      'As you scroll, a background image moves at a different speed from the page, a parallax effect. With reduced motion turned on, what should it do?',
    visual: { kind: 'motion', demo: 'parallax' },
    choices: [
      { id: 'keep', label: 'Keep it; it is only the background' },
      { id: 'stop', label: 'Stop it and scroll the image with the page' },
      { id: 'slow', label: 'Keep it, but at half speed' },
    ],
    answer: 'stop',
    explanation:
      'Large movement tied to scrolling is one of the most common triggers for dizziness and nausea. Slower parallax is still parallax.',
  },
  {
    id: 'spinner',
    prompt: 'A small spinner shows while search results load. With reduced motion turned on, what should it do?',
    visual: { kind: 'motion', demo: 'spinner' },
    choices: [
      { id: 'remove', label: 'Remove it entirely' },
      { id: 'keep', label: 'Keep a loading indicator; a slower or pulsing one is fine' },
      { id: 'text', label: 'Replace it with nothing and let people wait' },
    ],
    answer: 'keep',
    explanation:
      'The spinner tells people something is happening, so it carries information. Reduced motion means less movement, not less feedback.',
  },
  {
    id: 'slide',
    prompt: 'Moving to a new page slides the whole screen in from the right. With reduced motion turned on, what should it do?',
    visual: { kind: 'motion', demo: 'slide' },
    choices: [
      { id: 'keep', label: 'Keep the slide' },
      { id: 'faster', label: 'Keep the slide, but make it faster' },
      { id: 'fade', label: 'Use a quick fade, or no transition at all' },
    ],
    answer: 'fade',
    explanation:
      'Moving the entire view is the kind of motion most likely to cause discomfort. A short change in opacity still signals that the page changed, without movement.',
  },
  {
    id: 'progress',
    prompt: 'A progress bar fills as a file uploads. With reduced motion turned on, what should it do?',
    visual: { kind: 'motion', demo: 'progress' },
    choices: [
      { id: 'keep', label: 'Keep it; the movement is the information' },
      { id: 'stop', label: 'Hide it until the upload finishes' },
      { id: 'jump', label: 'Show only 0% and 100%' },
    ],
    answer: 'keep',
    explanation:
      'This motion is essential: it shows how far along the upload is. Removing it would take away information, not just decoration.',
  },
  {
    id: 'carousel',
    prompt: 'A carousel moves to the next slide every five seconds on its own. With reduced motion turned on, what should it do?',
    visual: { kind: 'motion', demo: 'carousel' },
    choices: [
      { id: 'stop', label: 'Stop advancing on its own; people move it themselves' },
      { id: 'slower', label: 'Advance every ten seconds instead' },
      { id: 'keep', label: 'Keep it; slides are content' },
    ],
    answer: 'stop',
    explanation:
      'Anything that moves on its own for more than five seconds needs a way to pause it for everyone (WCAG 2.2.2). With reduced motion on, it should not start moving at all.',
  },
  {
    id: 'zoom',
    prompt: 'A card\'s image zooms in slightly when you hover over it. With reduced motion turned on, what should it do?',
    visual: { kind: 'motion', demo: 'zoom' },
    choices: [
      { id: 'keep', label: 'Keep it; it only happens on hover' },
      { id: 'remove', label: 'Remove the zoom; a color or border change can show hover instead' },
      { id: 'bigger', label: 'Zoom less, but keep it' },
    ],
    answer: 'remove',
    explanation:
      'The zoom is decoration, so it is the easiest motion to drop. Hover can still be shown with a change that does not move anything.',
  },
];
