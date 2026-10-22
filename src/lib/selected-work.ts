/** Existing portfolio evidence; personal reference work stays explicitly labeled. */
export const selectedWork = [
  {
    name: 'Rudiment UI', href: '/personal-projects/rudiment-ui/',
    kind: 'Personal project · React component library',
    title: 'React components, working together.',
    summary: 'Accessible React components and a three-tier token system, documented in Storybook. Inspect component APIs and variants, then try the project board, dashboard, and storefront built from the library.',
    ownership: 'Designer and engineer', evidence: 'Tokens, APIs, accessibility, Storybook documentation',
    image: '/images/projects/rudiment-ui/rudiment-board.webp',
    alt: 'Rudiment UI project board showing tasks organized into four sprint columns',
    imageClass: 'work-image--rudiment', result: '3 examples', resultNote: 'featured from Storybook', action: 'Explore the library',
  },
  {
    name: 'IVFCRYO', href: '/projects/ivfcryo/', kind: 'Client work · Fertility logistics',
    title: 'Getting five parties ready before a shipment moves.',
    summary: 'A shared workflow for patients and staff shipping fertility specimens between clinics. I owned design and front end, and partnered with engineers on the backend.',
    ownership: 'Product design and front end', evidence: 'Workflow modeling, readiness states, error recovery',
    image: '/images/projects/ivfcryo/wires-and-flows/05-shipment-detail.svg',
    alt: 'IVFCRYO shipment detail interface design showing shipment status and readiness information',
    imageClass: 'work-image--ivfcryo', result: '75% fewer', resultNote: 'support calls after launch', action: 'Read the case study',
  },
  {
    name: 'Logatot', href: '/projects/logatot/', kind: 'Product work · Home child care',
    title: 'Less paperwork. More time with the actual children.',
    summary: 'A voice-controlled platform for recording meals, naps, and attendance during the day. I led front-end work on a three-developer team, from interaction design to reusable components.',
    ownership: 'Lead front end and interaction design', evidence: 'Voice repair flows, shared components, live state',
    image: '/images/projects/logatot/wires-and-flows/01-voiceboard.svg',
    alt: 'Logatot Voiceboard interface design showing children and their daily care records',
    imageClass: 'work-image--logatot', result: '2+ hours', resultNote: 'saved daily, reported by one provider', action: 'Read the case study',
  },
];
