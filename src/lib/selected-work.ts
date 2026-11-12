/** Client case studies. This order is deliberate and used everywhere: VMSpark, IVFCRYO, Logatot. Personal projects belong on /personal-projects/. */
export const selectedWork = [
  {
    name: 'VMSpark', href: '/projects/vmspark/', kind: 'Client project · Healthcare staffing operations',
    title: 'A new interface for a reliable data pipeline.',
    summary: 'VMSpark’s pipeline was reliable, but the admin app around it looked unfinished and scored 3.5 out of 10 in a heuristic audit. I rebuilt its interface on a new design system. The interface supports light mode, dark mode, and phones. The pipeline itself did not change.',
    ownership: 'Product design and front-end engineering', evidence: 'Design audit, app shell, design system, table tooling',
    illustration: 'vmspark' as const, result: '~350', resultNote: 'templates audited before designing', action: 'Read the case study',
  },
  {
    name: 'IVFCRYO', href: '/projects/ivfcryo/', kind: 'Client project · Fertility logistics',
    title: 'Getting five parties ready before a shipment moves.',
    summary: 'A shared workflow for patients and staff shipping fertility specimens between clinics. I owned design and front end. I partnered with engineers on the backend.',
    ownership: 'Product design and front end', evidence: 'Workflow modeling, readiness states, error recovery',
    illustration: 'ivfcryo' as const, result: '75% fewer', resultNote: 'support calls over the 90 days after launch', action: 'Read the case study',
  },
  {
    name: 'Logatot', href: '/projects/logatot/', kind: 'Product work · Home child care',
    title: 'Cutting paperwork for home child care providers.',
    summary: 'A voice-controlled platform for recording meals, naps, and attendance during the day. I led front-end work on a three-developer team. My work ran from interaction design to reusable components.',
    ownership: 'Lead front end and interaction design', evidence: 'Voice repair flows, shared components, live state',
    illustration: 'logatot' as const, result: '2+ hours', resultNote: 'a day that providers reported saving', action: 'Read the case study',
  },
];
