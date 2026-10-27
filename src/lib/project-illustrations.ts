/** Accessible descriptions for ProjectIllustration, one per project, keyed by project slug. */
export const projectIllustrationDescriptions = {
  ivfcryo: 'A readiness checklist for one shipment: the patient, sending clinic, receiving clinic, and courier are confirmed, the shipping equipment is still pending, and the shipment can only be scheduled once all five clear.',
  logatot: 'A provider says "Nap for Leo" out loud, and the app saves it as a nap entry for Leo at 12:40 without a tap.',
  vmspark: 'The admin app rebuild ships in four phases, Baseline, Shell, Command K, and Polish, while job listings keep flowing to the hiring systems underneath.',
  'rudiment-ui': 'Three tiers of design tokens, a global blue, a semantic brand color, and a button background, connect down to a Save button, all documented in Storybook.',
  'token-adventure': 'A level 10 code editor holds a color token whose value is an alias, and two passing checks, valid type and alias resolves, clear the wave.',
} as const;

export type IllustratedProject = keyof typeof projectIllustrationDescriptions;
