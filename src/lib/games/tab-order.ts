/**
 * "Tab order": put a scrambled form's controls back in the order a keyboard
 * user should reach them. Draft copy for Josh's review; follows WCAG 2.4.3.
 */

export interface TabField {
  id: string;
  label: string;
  /** CSS grid-area in the round's layout, so the mock matches reading order. */
  area: string;
  kind: 'field' | 'button' | 'link' | 'toggle';
}

export interface TabRound {
  id: string;
  title: string;
  /** grid-template-areas rows for the visual mock. */
  areas: string[];
  fields: TabField[];
  /** Field ids in the order focus should move. */
  correct: string[];
  /** Field ids in the broken order the round starts with. */
  start: string[];
  explanation: string;
}

export const tabOrderRounds: TabRound[] = [
  {
    id: 'address',
    title: 'Shipping address',
    areas: ['first last last', 'street street street', 'city state zip', 'continue . .'],
    fields: [
      { id: 'first', label: 'First name', area: 'first', kind: 'field' },
      { id: 'last', label: 'Last name', area: 'last', kind: 'field' },
      { id: 'street', label: 'Street address', area: 'street', kind: 'field' },
      { id: 'city', label: 'City', area: 'city', kind: 'field' },
      { id: 'state', label: 'State', area: 'state', kind: 'field' },
      { id: 'zip', label: 'ZIP code', area: 'zip', kind: 'field' },
      { id: 'continue', label: 'Continue', area: 'continue', kind: 'button' },
    ],
    correct: ['first', 'last', 'street', 'city', 'state', 'zip', 'continue'],
    start: ['first', 'street', 'city', 'last', 'state', 'zip', 'continue'],
    explanation:
      'Focus should follow reading order: across each row, then down. Column-by-column order like the starting one often comes from markup written one column at a time and rearranged with CSS.',
  },
  {
    id: 'sign-in',
    title: 'Sign in',
    areas: ['email email', 'password show', 'forgot .', 'submit .', 'create .'],
    fields: [
      { id: 'email', label: 'Email', area: 'email', kind: 'field' },
      { id: 'password', label: 'Password', area: 'password', kind: 'field' },
      { id: 'show', label: 'Show password', area: 'show', kind: 'toggle' },
      { id: 'forgot', label: 'Forgot password?', area: 'forgot', kind: 'link' },
      { id: 'submit', label: 'Sign in', area: 'submit', kind: 'button' },
      { id: 'create', label: 'Create an account', area: 'create', kind: 'link' },
    ],
    correct: ['email', 'password', 'show', 'forgot', 'submit', 'create'],
    start: ['email', 'password', 'submit', 'show', 'create', 'forgot'],
    explanation:
      'Controls that belong to a field, like "Show password", should come right after it. Moving them to the end sends keyboard users back up the page to find them.',
  },
  {
    id: 'cards',
    title: 'Product cards',
    areas: ['t1 t2 t3', 'b1 b2 b3'],
    fields: [
      { id: 't1', label: 'Desk lamp', area: 't1', kind: 'link' },
      { id: 'b1', label: 'Add desk lamp to cart', area: 'b1', kind: 'button' },
      { id: 't2', label: 'Monitor arm', area: 't2', kind: 'link' },
      { id: 'b2', label: 'Add monitor arm to cart', area: 'b2', kind: 'button' },
      { id: 't3', label: 'Footrest', area: 't3', kind: 'link' },
      { id: 'b3', label: 'Add footrest to cart', area: 'b3', kind: 'button' },
    ],
    correct: ['t1', 'b1', 't2', 'b2', 't3', 'b3'],
    start: ['t1', 't2', 't3', 'b1', 'b2', 'b3'],
    explanation:
      'Each card is a unit, so its link and button belong together. Visiting every title first and every button second separates each button from the product it adds.',
  },
];

/** Returns a copy of `order` with the item at `index` moved one step. */
export function moveItem(order: string[], index: number, direction: -1 | 1): string[] {
  const target = index + direction;
  if (target < 0 || target >= order.length) return [...order];
  const next = [...order];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function isCorrectOrder(order: string[], correct: string[]): boolean {
  return order.length === correct.length && order.every((id, i) => id === correct[i]);
}
