/** Accessible descriptions for ProjectIllustration, one per project, keyed by project slug. */
export const projectIllustrationDescriptions = {
  ivfcryo: 'A readiness checklist for one shipment: the patient, sending clinic, receiving clinic, and courier are confirmed, the shipping equipment is still pending, and the shipment can only be scheduled once all five clear.',
  logatot: 'A provider says "Nap for Leo" out loud, and the app saves it as a nap entry for Leo at 12:40 without a tap.',
  'logatot-review': 'A voice entry in Needs review, tagged Name not heard. Above the fields is the sentence the app heard: "Diaper change for the little one." The provider picks Leo as the child and Diaper as the event, so the entry is fixed before it saves.',
  vmspark: 'The admin app rebuild ships in four phases, Baseline, Shell, Command K, and Polish, while job listings keep flowing to the hiring systems underneath.',
  beckit: 'A journal entry holds the thought "They think I\'m not good enough", named as mind reading. The feeling, anxious, is rated 7 out of 10 before weighing the evidence and 4 after.',
  clempo: 'Logging a $42.50 grocery purchase in three taps: pick the category, type the amount, save. Groceries then shows $272.51 left of $700, and the save can be undone.',
  'rudiment-ui': 'A gap log from the Vitrea demo. A heading with an inline margin reset is struck out and replaced by the plain library heading, and two more gaps, a missing data table and field borders at 1.3:1 contrast, are checked off. Each was fixed in the library, not the app.',
  'token-adventure': 'A level 10 code editor holds a color token whose value is an alias, and two passing checks, valid type and alias resolves, clear the wave.',
} as const;

export type IllustratedProject = keyof typeof projectIllustrationDescriptions;
