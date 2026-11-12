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
    next: { name: 'Logatot', href: '/projects/logatot/', description: 'Voice input, repair flows, and reusable UI for home child care.' },
  },
  logatot: { // Next links follow the portfolio order and loop: VMSpark, IVFCRYO, Logatot. Client work never leads into personal projects.
    illustration: 'logatot',
    name: 'Logatot', kind: 'Product work · Home child care',
    headline: 'Helping child care providers', emphasis: 'log their day by voice.',
    intro: 'Providers can record meals, naps, and attendance while caring for children. I led front-end work on a three-developer team, covering voice interaction, error recovery, and shared components in a paid product.',
    facts: [
      { label: 'My role', value: 'Lead front end and interaction design' },
      { label: 'Owned', value: 'Provider research, voice interaction, repair flows, shared components' },
      { label: 'Team', value: 'Three developers' },
      { label: 'Built with', value: 'Rails, ViewComponents, Alpine' },
    ],
    figures: [
      { value: '2+ hrs', label: 'saved on daily data entry', note: 'Reported by providers' },
      { value: '21', label: 'reusable ViewComponents', note: 'Across nine namespaces' },
    ],
    next: { name: 'VMSpark', href: '/projects/vmspark/', description: 'A new interface for a reliable data pipeline.' },
  },
  vmspark: {
    illustration: 'vmspark',
    name: 'VMSpark', kind: 'Client project · Healthcare staffing operations',
    headline: 'A new interface for', emphasis: 'a reliable data pipeline.',
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
    next: { name: 'IVFCRYO', href: '/projects/ivfcryo/', description: 'A shared workflow for patients and staff shipping fertility specimens between clinics.' },
  },
} satisfies Record<string, ProjectPage>;
export type ProjectKey = keyof typeof projectPages;
