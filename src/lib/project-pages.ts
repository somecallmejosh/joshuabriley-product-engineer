import type { ImageMetadata } from 'astro';
import type { IllustratedProject } from '~/lib/project-illustrations';

export interface ProjectPage {
  name: string;
  kind: string;
  /** ProjectIllustration drawing shown in the page hero and the work lists. */
  illustration: IllustratedProject;
  /** A real image to show in the hero instead of the drawing. */
  heroImage?: { src: ImageMetadata; alt: string };
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
  logatot: { // Next links follow the portfolio order and loop: VMSpark, IVFCRYO, Logatot, Rudiment UI.
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
    next: { name: 'Rudiment UI', href: '/projects/rudiment-ui/', description: 'A React component library, tested by building a working app with it.' },
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
  'rudiment-ui': {
    illustration: 'rudiment-ui',
    name: 'Rudiment UI', kind: 'Open-source project · Design systems',
    headline: 'An accessible component library', emphasis: 'that any team can brand.',
    intro: 'Rudiment UI is an accessible React component library built on React Aria and design tokens. I designed its components, tokens, and brand, and wrote its docs and tests. To check it on a real screen, I built a demo app from library components only, and each place the app had to work around the library became a fix in the library.',
    facts: [
      { label: 'My role', value: 'Design and front-end engineering' },
      { label: 'Owned', value: 'Component APIs, tokens and themes, brand, docs, tests, the Vitrea demo' },
      { label: 'Team', value: 'Solo project' },
      { label: 'Built with', value: 'React 19, TypeScript, React Aria, Style Dictionary, Storybook, Vitest' },
    ],
    figures: [
      { value: '476 → 0', label: 'inline styles needed to build a screen', note: 'Demo pages before, Vitrea after' },
      { value: '741', label: 'unit tests, including axe accessibility checks', note: 'Across 63 test files' },
    ],
    actions: [
      { href: 'https://rudiment-ui.netlify.app/', label: 'Explore Storybook' },
      { href: 'https://github.com/Rudiment-UI/rudiment-ui', label: 'View on GitHub' },
      { href: 'https://vitrea-rudiment.netlify.app/', label: 'Try the Vitrea demo' },
    ],
    next: { name: 'VMSpark', href: '/projects/vmspark/', description: 'A new interface for a reliable data pipeline.' },
  },
} satisfies Record<string, ProjectPage>;
export type ProjectKey = keyof typeof projectPages;
