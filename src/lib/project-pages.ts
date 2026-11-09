import type { IllustratedProject } from '~/lib/project-illustrations';

export interface ProjectPage {
  name: string;
  kind: string;
  /** ProjectIllustration drawing shown in the page hero and the work lists. */
  illustration: IllustratedProject;
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
    illustration: 'ivfcryo',
    name: 'IVFCRYO', kind: 'Client project · Fertility logistics',
    headline: 'Five parties working from', emphasis: 'one shipment record.',
    intro: 'Shipping fertility specimens means coordinating a patient, two clinics, a courier, and IVFCRYO. I designed and built the shared interface where everyone confirms readiness before a shipment moves, along with its public site.',
    facts: [
      { label: 'My role', value: 'Product design and front end' },
      { label: 'Owned', value: 'Research, workflows, components' },
      { label: 'Partnered on', value: 'Rails backend and tracking' },
      { label: 'Team', value: 'Three developers' },
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
  logatot: { // Next links follow the portfolio order and loop: VMSpark, IVFCRYO, Logatot. Client work never leads into personal projects.
    illustration: 'logatot',
    name: 'Logatot', kind: 'Product work · Home child care',
    headline: 'Helping child care providers', emphasis: 'log their day by voice.',
    intro: 'Providers can record meals, naps, and attendance while caring for children. I led front-end work on a three-developer team, connecting voice interactions, recoverable errors, and shared components in a paid product.',
    facts: [
      { label: 'My role', value: 'Lead front end and interaction design' },
      { label: 'Owned', value: 'Provider research, voice interaction, repair flows, shared components' },
      { label: 'Team', value: 'Three developers' },
      { label: 'Built with', value: 'Rails, ViewComponents, Alpine' },
    ],
    figures: [
      { value: '2+ hrs', label: 'saved on daily data entry', note: 'Reported by numerous providers' },
      { value: '21', label: 'reusable ViewComponents', note: 'Across nine namespaces' },
    ],
    image: '/images/projects/logatot/wires-and-flows/01-voiceboard.svg',
    alt: 'Logatot Voiceboard interface design, with child records, daily activity, and voice input',
    imageNote: 'Interface design · The Voiceboard, where providers manage the day',
    next: { name: 'VMSpark', href: '/projects/vmspark/', description: 'Giving a working data pipeline an interface that looks like it works.' },
  },
  vmspark: {
    illustration: 'vmspark',
    name: 'VMSpark', kind: 'Client project · Healthcare staffing operations',
    headline: 'Giving a working data pipeline', emphasis: 'an interface that looks like it works.',
    intro: 'VMSpark moves hospital job feeds into staffing agencies’ applicant tracking systems. The pipeline was reliable, but the admin app looked unfinished just as the company began showing it to investors. I audited it, then rebuilt its interface on a design system made for the people who use it all day.',
    facts: [
      { label: 'My role', value: 'Product design and front-end engineering' },
      { label: 'Owned', value: 'Usability audit, navigation, design system, style guide, every view' },
      { label: 'Built with', value: 'Rails 7, Stimulus, HTMX, plain CSS on three-tier tokens, PostgreSQL' },
    ],
    figures: [
      { value: '3.5 → 7.5', label: 'heuristic score, before and after' },
      { value: '178', label: 'color pairings passing WCAG AA, light and dark' },
    ],
    image: '/images/projects/vmspark/wires-and-flows/02-job-listings.svg',
    alt: 'VMSpark job listings interface design with status tabs, filters, and a shared application shell',
    imageNote: 'Interface design · Job listings in the shared app shell',
    next: { name: 'IVFCRYO', href: '/projects/ivfcryo/', description: 'A shared workflow for patients and staff shipping fertility specimens between clinics.' },
  },
} satisfies Record<string, ProjectPage>;
export type ProjectKey = keyof typeof projectPages;
