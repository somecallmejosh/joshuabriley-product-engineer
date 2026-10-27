/** Existing portfolio evidence; personal reference work stays explicitly labeled. */
export const selectedWork = [
  {
    name: 'IVFCRYO', href: '/projects/ivfcryo/', kind: 'Client work · Fertility logistics',
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
    name: 'VMSpark', href: '/projects/vmspark/', kind: 'Client work · Recruiting operations',
    title: 'Rebuilding an admin app without stopping the pipeline.',
    summary: 'An admin interface for a system that sends thousands of job listings to more than a dozen hiring systems. I audited 350 templates and rebuilt the app in four stages, keeping the workflows operators already knew.',
    ownership: 'Product design and UI engineering', evidence: 'Template audit, app shell, tokens, staged rollout',
    illustration: 'vmspark' as const, result: '0', resultNote: 'pipeline regressions across four stages', action: 'Read the case study',
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
