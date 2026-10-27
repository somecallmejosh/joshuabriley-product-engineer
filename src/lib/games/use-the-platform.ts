import type { QuizQuestion } from '~/lib/quiz';

/** Draft copy for Josh's review. Answers follow the HTML Living Standard. */
export const useThePlatform: QuizQuestion[] = [
  {
    id: 'navigate',
    prompt: 'Clicking it takes the visitor to the pricing page. Which element should it be?',
    choices: [
      { id: 'a', label: '<a href="/pricing/">', code: true },
      { id: 'button', label: '<button>', code: true },
      { id: 'div', label: '<div onclick>', code: true },
    ],
    answer: 'a',
    explanation:
      'Going somewhere is a link\'s job. A real link can be opened in a new tab, bookmarked, and found in a screen reader\'s list of links.',
  },
  {
    id: 'submit',
    prompt: 'It sends the sign-up form. Which element should it be?',
    choices: [
      { id: 'a', label: '<a href="#">', code: true },
      { id: 'button', label: '<button type="submit">', code: true },
      { id: 'div', label: '<div role="button">', code: true },
    ],
    answer: 'button',
    explanation:
      'Doing something is a button\'s job. A submit button works with Enter, runs the browser\'s form validation, and needs no extra script.',
  },
  {
    id: 'disclosure',
    prompt: 'A frequently asked question that opens to show its answer in place, even if JavaScript fails. Which element should it be?',
    choices: [
      { id: 'details', label: '<details> and <summary>', code: true },
      { id: 'dialog', label: '<dialog>', code: true },
      { id: 'button-div', label: '<button> plus a hidden <div>', code: true },
    ],
    answer: 'details',
    explanation:
      'details and summary give you an open-and-close section with keyboard support and the right state announcements built in, and they work without any JavaScript.',
  },
  {
    id: 'confirm',
    prompt: 'It asks "Delete this project?" and the rest of the page must wait until the visitor answers. Which element should it be?',
    choices: [
      { id: 'details', label: '<details>', code: true },
      { id: 'div', label: '<div class="modal">', code: true },
      { id: 'dialog', label: '<dialog> opened with showModal()', code: true },
    ],
    answer: 'dialog',
    explanation:
      'A modal dialog makes the rest of the page inert, moves focus into the dialog, and closes with Escape. Building that on a div means rebuilding all of it by hand.',
  },
  {
    id: 'toggle',
    prompt: 'A setting that turns email notifications on or off and is saved with the rest of the settings form. Which element should it be?',
    choices: [
      { id: 'checkbox', label: '<input type="checkbox">', code: true },
      { id: 'pressed', label: '<button aria-pressed>', code: true },
      { id: 'a', label: '<a href="#">', code: true },
    ],
    answer: 'checkbox',
    explanation:
      'An on/off value that is submitted with a form is a checkbox. It has a label, a checked state, and a value the form sends, with nothing extra to wire up.',
  },
  {
    id: 'upload',
    prompt: 'It shows how much of a file upload has finished. Which element should it be?',
    choices: [
      { id: 'meter', label: '<meter>', code: true },
      { id: 'progress', label: '<progress>', code: true },
      { id: 'div', label: 'A <div> with a changing width', code: true },
    ],
    answer: 'progress',
    explanation:
      'progress is for a task moving toward completion, and assistive tech announces its value. meter is for a measurement within a range, such as disk space used.',
  },
  {
    id: 'storage',
    prompt: 'It shows how full a 10 GB storage plan is. Which element should it be?',
    choices: [
      { id: 'progress', label: '<progress>', code: true },
      { id: 'meter', label: '<meter>', code: true },
      { id: 'output', label: '<output>', code: true },
    ],
    answer: 'meter',
    explanation:
      'Storage used is a measurement within a known range, not a task that finishes, so it\'s a meter. meter can also mark low, high and optimum ranges.',
  },
  {
    id: 'fieldset',
    prompt: 'Five shipping address fields need one shared label, "Shipping address". Which element should group them?',
    choices: [
      { id: 'fieldset', label: '<fieldset> with a <legend>', code: true },
      { id: 'section', label: '<section> with an <h3>', code: true },
      { id: 'div', label: '<div class="group">', code: true },
    ],
    answer: 'fieldset',
    explanation:
      'A fieldset\'s legend is announced along with the fields inside it, so a screen reader user hears "Shipping address" with each field, not just "Street".',
  },
];
