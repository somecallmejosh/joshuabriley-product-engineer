import type { QuizQuestion } from '~/lib/quiz';

/** Draft copy for Josh's review. Guidance follows the W3C WAI images tutorial. */
export const altOrNot: QuizQuestion[] = [
  {
    id: 'bio-portrait',
    prompt:
      'A profile card shows a portrait, with the name "Joshua Briley" and the role "Product design engineer" printed right next to it. What should the portrait\'s alt text be?',
    visual: { kind: 'bio', src: '/images/about/josh-suit-avatar-192.webp', name: 'Joshua Briley', role: 'Product design engineer' },
    choices: [
      { id: 'name', label: 'alt="Joshua Briley"', code: true },
      { id: 'empty', label: 'alt=""', code: true },
      { id: 'detail', label: 'alt="Photo of a smiling man in a suit"', code: true },
    ],
    answer: 'empty',
    explanation:
      'The name is already in the text beside the photo, so naming it again makes a screen reader say it twice. An empty alt tells assistive tech to skip the image.',
  },
  {
    id: 'logo-link',
    prompt:
      'A logo is the only thing inside a link, and the link goes to the IVFCRYO case study. What should the logo\'s alt text be?',
    visual: { kind: 'logo-link', src: '/images/logos/ivfcryo.svg' },
    choices: [
      { id: 'logo', label: 'alt="IVFCRYO logo"', code: true },
      { id: 'destination', label: 'alt="IVFCRYO case study"', code: true },
      { id: 'empty', label: 'alt=""', code: true },
    ],
    answer: 'destination',
    explanation:
      'When an image is the whole link, its alt text becomes the link\'s name, so it should say where the link goes. "Logo" adds nothing, and an empty alt leaves the link with no name at all.',
  },
  {
    id: 'chart',
    prompt:
      'An article about sprint planning includes a burndown chart. In the chart, remaining work stays above the ideal line until day 7, then meets it. The paragraph next to it doesn\'t mention this. What should the alt text be?',
    visual: {
      kind: 'figure',
      src: '/images/projects/rudiment-ui/rudiment-dashboard.webp',
      position: '30% 62%',
      text: 'Teams that track remaining work every day spot a slipping sprint early.',
    },
    choices: [
      { id: 'chart', label: 'alt="Chart"', code: true },
      { id: 'screenshot', label: 'alt="Dashboard screenshot"', code: true },
      {
        id: 'point',
        label: 'alt="Burndown chart: remaining work runs above the ideal line until day 7, then meets it."',
        code: true,
      },
    ],
    answer: 'point',
    explanation:
      'A chart is there to make a point. Alt text should give that point, not just name the image type. When the details matter, put the data in the page text or a table as well.',
  },
  {
    id: 'divider',
    prompt: 'A small wave image sits between two sections of an article, purely as decoration. What should its alt text be?',
    visual: { kind: 'divider', icon: 'ph:wave-sine' },
    choices: [
      { id: 'wave', label: 'alt="Wave"', code: true },
      { id: 'empty', label: 'alt=""', code: true },
      { id: 'divider', label: 'alt="Section divider"', code: true },
    ],
    answer: 'empty',
    explanation:
      'Decoration carries no information, so an empty alt keeps it out of the way. Leaving alt off entirely is different: some screen readers then read the file name instead.',
  },
  {
    id: 'card-thumbnail',
    prompt:
      'A project card has a screenshot above the visible title "Token Adventure", and both sit inside the same link to the project. What should the screenshot\'s alt text be?',
    visual: {
      kind: 'card',
      src: '/images/projects/token-galaga/token-galaga.webp',
      position: '50% 30%',
      title: 'Token Adventure',
    },
    choices: [
      { id: 'title', label: 'alt="Token Adventure"', code: true },
      { id: 'describe', label: 'alt="Screenshot of a neon space arcade game"', code: true },
      { id: 'empty', label: 'alt=""', code: true },
    ],
    answer: 'empty',
    explanation:
      'The title already names the link. Alt text on the screenshot would be added to the link\'s name, so a screen reader would hear "Token Adventure, Token Adventure".',
  },
  {
    id: 'image-of-text',
    prompt:
      'A page uses an image of the words "Token Adventure", in pixel lettering, as its banner title. There is no other heading text. What should the alt text be?',
    visual: { kind: 'banner', src: '/images/projects/token-galaga/token-galaga.webp', position: '70% 33%' },
    choices: [
      { id: 'empty', label: 'alt=""', code: true },
      { id: 'words', label: 'alt="Token Adventure"', code: true },
      { id: 'style', label: 'alt="Neon pixel-art lettering"', code: true },
    ],
    answer: 'words',
    explanation:
      'When an image contains text that matters, the alt text should say the same words. Better still, use real text styled with CSS, which also scales and translates.',
  },
];
