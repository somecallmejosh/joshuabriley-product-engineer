/**
 * "Spot the drift": compare a design system component with a production copy
 * and pick the properties that drifted. Draft copy for Josh's review.
 *
 * Styles are keyed by property id; the island maps each id to a CSS rule, so
 * the drifted version only ever uses site tokens.
 */

export type DriftProperty =
  | 'padding'
  | 'radius'
  | 'border'
  | 'weight'
  | 'text-color'
  | 'icon-size'
  | 'gap'
  | 'tracking';

export interface DriftRound {
  id: string;
  component: 'alert' | 'button' | 'field';
  title: string;
  /** Six candidate properties shown as checkboxes. */
  options: DriftProperty[];
  /** The three that actually drifted. */
  drifted: DriftProperty[];
  /** Spoken comparison for screen reader users, one line per option. */
  specs: Record<string, { system: string; production: string }>;
  explanation: string;
}

export const DRIFT_LABELS: Record<DriftProperty, string> = {
  padding: 'Padding',
  radius: 'Corner radius',
  border: 'Border color',
  weight: 'Text weight',
  'text-color': 'Text color',
  'icon-size': 'Icon size',
  gap: 'Space between icon and text',
  tracking: 'Letter spacing',
};

export const driftRounds: DriftRound[] = [
  {
    id: 'alert',
    component: 'alert',
    title: 'Alert',
    options: ['padding', 'radius', 'border', 'weight', 'icon-size', 'text-color'],
    drifted: ['padding', 'radius', 'icon-size'],
    specs: {
      padding: { system: '16px', production: '12px' },
      radius: { system: 'Square corners', production: '6px rounded corners' },
      border: { system: 'Light grey', production: 'Light grey' },
      weight: { system: 'Semibold title', production: 'Semibold title' },
      'icon-size': { system: '20px', production: '16px' },
      'text-color': { system: 'Muted ink', production: 'Muted ink' },
    },
    explanation:
      'Small changes like these usually come from a copy-pasted component that was tweaked locally. Each one is minor, but together they make the product feel slightly off.',
  },
  {
    id: 'button',
    component: 'button',
    title: 'Button',
    options: ['padding', 'radius', 'weight', 'gap', 'tracking', 'border'],
    drifted: ['weight', 'gap', 'tracking'],
    specs: {
      padding: { system: '12px by 20px', production: '12px by 20px' },
      radius: { system: 'Square corners', production: 'Square corners' },
      weight: { system: 'Semibold', production: 'Regular' },
      gap: { system: '12px', production: '4px' },
      tracking: { system: 'Normal', production: 'Wide' },
      border: { system: 'Accent', production: 'Accent' },
    },
    explanation:
      'Type drift is the hardest to notice side by side and the easiest to feel across a whole page. Tokens for weight and spacing keep every copy of a button in step.',
  },
  {
    id: 'field',
    component: 'field',
    title: 'Text field',
    options: ['border', 'text-color', 'padding', 'radius', 'weight', 'gap'],
    drifted: ['border', 'text-color', 'gap'],
    specs: {
      border: { system: 'Dark grey', production: 'Light grey' },
      'text-color': { system: 'Ink label', production: 'Muted ink label' },
      padding: { system: '10px', production: '10px' },
      radius: { system: 'Square corners', production: 'Square corners' },
      weight: { system: 'Semibold label', production: 'Semibold label' },
      gap: { system: '8px between label and field', production: '2px between label and field' },
    },
    explanation:
      'A fainter label is harder to read, and a squeezed gap makes a label look like it belongs to the field above. Drift is not only about consistency; it can make a form harder to use.',
  },
];

export interface DriftScore {
  found: DriftProperty[];
  missed: DriftProperty[];
  wrong: DriftProperty[];
}

export function scoreDrift(selected: DriftProperty[], drifted: DriftProperty[]): DriftScore {
  return {
    found: drifted.filter((p) => selected.includes(p)),
    missed: drifted.filter((p) => !selected.includes(p)),
    wrong: selected.filter((p) => !drifted.includes(p)),
  };
}
