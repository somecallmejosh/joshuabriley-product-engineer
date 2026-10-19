export interface ProjectPage {
  name: string;
  kind: string;
  headline: string;
  emphasis: string;
  intro: string;
  facts: { label: string; value: string }[];
  figures: { value: string; label: string; note?: string }[];
  image: string;
  alt: string;
  imageNote: string;
  secondaryImage?: string;
  secondaryAlt?: string;
  dark?: boolean;
  actions?: { href: string; label: string }[];
  next: { name: string; href: string; description: string };
}

export const projectPages = {
  ivfcryo: {
    name: 'IVFCRYO', kind: 'Client work · Fertility logistics',
    headline: 'Five parties working from', emphasis: 'one shipment record.',
    intro: 'Shipping fertility specimens means coordinating a patient, two clinics, a courier, and IVFCRYO. I designed and built the shared interface that helps everyone confirm readiness before a shipment moves.',
    facts: [
      { label: 'My role', value: 'Product design and front end' },
      { label: 'Owned', value: 'Research, workflows, components' },
      { label: 'Partnered on', value: 'Rails backend and tracking' },
    ],
    figures: [
      { value: '75%', label: 'fewer support calls' },
      { value: '55%', label: 'fewer shipping errors' },
    ],
    image: '/images/projects/ivfcryo/wires-and-flows/05-shipment-detail.svg',
    alt: 'Shipment detail interface design, with readiness checks, shipment status, and tracking information',
    secondaryImage: '/images/projects/ivfcryo/wires-and-flows/06-public-tracking.svg',
    secondaryAlt: 'Public shipment tracking interface design showing progress and monitoring information',
    imageNote: 'Interface designs · Shipment detail and public tracking',
    next: { name: 'Logatot', href: '/projects/logatot/', description: 'Voice input, repair flows, and reusable UI for home child care.' },
  },
  logatot: {
    name: 'Logatot', kind: 'Product work · Home child care',
    headline: 'Child care paperwork,', emphasis: 'handled by voice.',
    intro: 'Providers can record meals, naps, and attendance while caring for children. I led front-end work on a three-developer team, connecting voice interactions, recoverable errors, and shared components in a paid product.',
    facts: [
      { label: 'My role', value: 'Lead front end and interaction design' },
      { label: 'Built with', value: 'Rails, ViewComponents, Alpine' },
      { label: 'Team', value: 'Three developers' },
    ],
    figures: [
      { value: '2+ hrs', label: 'saved on daily data entry', note: 'Reported by one provider' },
      { value: '21', label: 'reusable ViewComponents', note: 'Across nine namespaces' },
    ],
    image: '/images/projects/logatot/wires-and-flows/01-voiceboard.svg',
    alt: 'Logatot Voiceboard interface design, with child records, daily activity, and voice input',
    imageNote: 'Interface design · The Voiceboard, where providers manage the day',
    next: { name: 'VMSpark', href: '/projects/vmspark/', description: 'Rebuilding an admin interface around a working production system.' },
  },
  vmspark: {
    name: 'VMSpark', kind: 'Client work · Recruiting operations',
    headline: 'Rebuilding the interface,', emphasis: 'keeping the system running.',
    intro: 'VMSpark processes thousands of job listings and sends them to more than a dozen hiring systems. I audited and rebuilt the admin interface in stages, preserving the pipeline and the workflows operators already knew.',
    facts: [
      { label: 'My role', value: 'Product design and UI engineering' },
      { label: 'Owned', value: 'Audit, app shell, tokens, rollout' },
      { label: 'Built with', value: 'Rails, Stimulus, modern CSS' },
    ],
    figures: [
      { value: '350', label: 'page templates inventoried' },
      { value: '4', label: 'stages of rollout' },
      { value: '0', label: 'pipeline regressions' },
    ],
    image: '/images/projects/vmspark/wires-and-flows/02-job-listings.svg',
    alt: 'VMSpark job listings interface design with status tabs, filters, and a shared application shell',
    imageNote: 'Interface design · Job listings in the shared app shell',
    next: { name: 'Rudiment UI', href: '/personal-projects/rudiment-ui/', description: 'A React component library with the architecture and decisions documented.' },
  },
  rudiment: {
    name: 'Rudiment UI', kind: 'Personal project · Component architecture',
    headline: 'A component library with', emphasis: 'the reasoning included.',
    intro: 'Accessible React components, a three-tier token system, and a companion guide explaining the architectural choices. A public reference project you can read, run, and explore in Storybook.',
    facts: [
      { label: 'My role', value: 'Author and engineer' },
      { label: 'Built with', value: 'React, TypeScript, React Aria' },
      { label: 'Scope', value: 'Personal reference library and guide' },
    ],
    figures: [
      { value: '13', label: 'chapters of architectural decisions' },
      { value: '3', label: 'working example pages' },
    ],
    image: '/images/projects/rudiment-ui/rudiment-board.webp',
    alt: 'A Rudiment UI project board with draggable issue cards across four sprint columns',
    imageNote: 'Storybook example · A project board built with the library', dark: true,
    actions: [
      { href: 'https://rudiment-guide.netlify.app/', label: 'Read the guide' },
      { href: 'https://rudiment-ui.netlify.app/', label: 'Explore Storybook' },
    ],
    next: { name: 'Token Adventure', href: '/personal-projects/token-galaga/', description: 'A coding game for learning the design token format through practice.' },
  },
  tokens: {
    name: 'Token Adventure', kind: 'Personal project · Interactive learning',
    headline: 'Learning design tokens', emphasis: 'one level at a time.',
    intro: 'A browser game where you write tokens, run them in a sandbox, and pass checks against the 2025.10 Design Tokens Format. I designed the curriculum and interface, and built the editor, execution sandbox, and assertion engine.',
    facts: [
      { label: 'My role', value: 'Designer and engineer' },
      { label: 'Built with', value: 'Astro, React, CodeMirror' },
      { label: 'Scope', value: 'Learning game and test engine' },
    ],
    figures: [
      { value: '20', label: 'coding levels' },
      { value: '3', label: 'learning arcs, beginner to expert' },
    ],
    image: '/images/projects/token-galaga/token-galaga.webp',
    alt: 'Token Adventure game screenshot with a retro arcade interface and design token coding curriculum',
    imageNote: 'Game screenshot · Token Adventure', dark: true,
    actions: [{ href: 'https://token-galaga.netlify.app/', label: 'Play the game' }],
    next: { name: 'IVFCRYO', href: '/projects/ivfcryo/', description: 'A shared workflow for the people coordinating fertility shipments.' },
  },
  church: {
    name: 'West Baton Rouge Presbyterian', kind: 'Volunteer work · Publishing platform',
    headline: 'A publishing system', emphasis: 'built for a small church.',
    intro: 'A custom Rails CMS that lets staff manage events, galleries, and pages. I built the content models, media pipeline, authentication, and public interface over one weekend.',
    facts: [
      { label: 'My role', value: 'Design and full-stack development' },
      { label: 'Built with', value: 'Ruby on Rails and Cloudinary' },
      { label: 'Delivery', value: 'Volunteer project, one weekend' },
    ],
    figures: [],
    image: '/images/projects/west-baton-rouge-presbyterian/wbrpres.webp',
    alt: 'West Baton Rouge Presbyterian public website screenshot',
    imageNote: 'Website screenshot · West Baton Rouge Presbyterian',
    next: { name: 'Rudiment UI', href: '/personal-projects/rudiment-ui/', description: 'Accessible components, design tokens, and the decisions behind them.' },
  },
} satisfies Record<string, ProjectPage>;
export type ProjectKey = keyof typeof projectPages;
