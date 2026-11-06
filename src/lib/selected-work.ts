/** Existing portfolio evidence; personal reference work stays explicitly labeled. */
export const selectedWork = [
  {
    name: 'IVFCRYO', href: '/projects/ivfcryo/', kind: 'Client project · Fertility logistics',
    title: 'Getting five parties ready before a shipment moves.',
    summary: 'A shared workflow for patients and staff shipping fertility specimens between clinics. I owned design and front end, and partnered with engineers on the backend.',
    ownership: 'Product design and front end', evidence: 'Workflow modeling, readiness states, error recovery',
    illustration: 'ivfcryo' as const, result: '75% fewer', resultNote: 'support calls after launch', action: 'Read the case study',
  },
  {
    name: 'Logatot', href: '/projects/logatot/', kind: 'Product work · Home child care',
    title: 'Cutting paperwork for home child care providers.',
    summary: 'A voice-controlled platform for recording meals, naps, and attendance during the day. I led front-end work on a three-developer team, from interaction design to reusable components.',
    ownership: 'Lead front end and interaction design', evidence: 'Voice repair flows, shared components, live state',
    illustration: 'logatot' as const, result: '2+ hours', resultNote: 'saved daily, reported by one provider', action: 'Read the case study',
  },
  {
    name: 'VMSpark', href: '/projects/vmspark/', kind: 'Client project · Healthcare staffing operations',
    title: 'Giving a working data pipeline an interface that looks like it works.',
    summary: 'VMSpark’s pipeline was reliable, but the admin app around it looked unfinished and scored 3.5 out of 10 in a heuristic audit. I rebuilt its interface on a from-scratch design system, in light, dark, and on phones, without changing how the pipeline works.',
    ownership: 'Product design and front-end engineering', evidence: 'Design audit, app shell, design system, table tooling',
    illustration: 'vmspark' as const, result: '~350', resultNote: 'templates audited before designing', action: 'Read the case study',
  },
  {
    name: 'Rudiment UI', href: '/personal-projects/rudiment-ui/',
    kind: 'Personal project · React component library',
    title: 'An accessible React component library I designed and built.',
    summary: 'Accessible React components and a three-tier token system, documented in Storybook. Inspect component APIs and variants, then try the project board, dashboard, and storefront built from the library.',
    ownership: 'Designer and engineer', evidence: 'Tokens, APIs, accessibility, Storybook documentation',
    illustration: 'rudiment-ui' as const, result: '3 examples', resultNote: 'featured from Storybook', action: 'Explore the library',
  },
];
