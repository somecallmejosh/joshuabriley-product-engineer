import type { QuizQuestion } from '~/lib/quiz';

/** Draft copy for Josh's review. Guidance follows WCAG 2.4.6 and 4.1.2. */
export const nameThatButton: QuizQuestion[] = [
  {
    id: 'delete-row',
    prompt:
      'A file list has a trash-can button on every row. This one sits on the row for "Q3 roadmap.pdf". What should its accessible name be?',
    visual: { kind: 'icon-button', icon: 'ph:trash', scene: 'file-row', context: 'Q3 roadmap.pdf' },
    choices: [
      { id: 'trash', label: 'Trash' },
      { id: 'delete', label: 'Delete' },
      { id: 'specific', label: 'Delete Q3 roadmap.pdf' },
    ],
    answer: 'specific',
    explanation:
      'Name the action, not the picture. When a page lists ten buttons that all say "Delete", including the file name tells people which one they\'re on.',
  },
  {
    id: 'close-dialog',
    prompt: 'An × button sits in the corner of a dialog titled "Share project". What should its accessible name be?',
    visual: { kind: 'icon-button', icon: 'ph:x', scene: 'dialog', context: 'Share project' },
    choices: [
      { id: 'x', label: 'X' },
      { id: 'close', label: 'Close' },
      { id: 'long', label: 'Close the Share project dialog window button' },
    ],
    answer: 'close',
    explanation:
      'The dialog\'s own title already gives the context, and the role "button" is announced automatically, so a short "Close" is clearest.',
  },
  {
    id: 'search',
    prompt: 'A magnifying-glass button submits the search field next to it. What should its accessible name be?',
    visual: { kind: 'icon-button', icon: 'ph:magnifying-glass', scene: 'search', context: 'Search articles' },
    choices: [
      { id: 'glass', label: 'Magnifying glass' },
      { id: 'search', label: 'Search' },
      { id: 'submit', label: 'Submit' },
    ],
    answer: 'search',
    explanation:
      'Say what pressing it does. "Magnifying glass" describes the drawing, and "Submit" is vague when a page has more than one form.',
  },
  {
    id: 'more-actions',
    prompt: 'A three-dots button on a project card for "Rudiment UI" opens a menu of actions. What should its accessible name be?',
    visual: { kind: 'icon-button', icon: 'ph:dots-three-vertical', scene: 'card', context: 'Rudiment UI' },
    choices: [
      { id: 'dots', label: 'Three dots' },
      { id: 'menu', label: 'Menu' },
      { id: 'specific', label: 'More actions for Rudiment UI' },
    ],
    answer: 'specific',
    explanation:
      'Cards repeat, so the name should say which card it belongs to and what it opens. Add aria-haspopup and aria-expanded so the menu\'s state is announced too.',
  },
  {
    id: 'favorite',
    prompt:
      'A heart button on an article saves it to the visitor\'s favorites and stays filled in when on. What should its accessible name be?',
    visual: { kind: 'icon-button', icon: 'ph:heart', scene: 'toggle', context: 'Measuring style guide adoption' },
    choices: [
      { id: 'heart', label: 'Heart' },
      { id: 'favorite', label: 'Favorite, with aria-pressed for on and off' },
      { id: 'click', label: 'Click to favorite' },
    ],
    answer: 'favorite',
    explanation:
      'For a toggle, keep the name the same and let aria-pressed announce whether it\'s on. "Click" also assumes a mouse, which keyboard and touch users don\'t have.',
  },
  {
    id: 'edit-field',
    prompt: 'A pencil button next to the Email field on a profile page lets you change it. What should its accessible name be?',
    visual: { kind: 'icon-button', icon: 'ph:pencil-simple', scene: 'field', context: 'Email' },
    choices: [
      { id: 'pencil', label: 'Pencil' },
      { id: 'edit', label: 'Edit' },
      { id: 'specific', label: 'Edit email' },
    ],
    answer: 'specific',
    explanation:
      'A profile page often has an edit button on every field. "Edit email" is short and still unique when someone moves between buttons.',
  },
];
