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
    name: 'IVFCRYO', kind: 'Client work · Fertility logistics',
    headline: 'Five parties working from', emphasis: 'one shipment record.',
    intro: 'Shipping fertility specimens means coordinating a patient, two clinics, a courier, and IVFCRYO. I designed and built the shared interface where everyone confirms readiness before a shipment moves, then redesigned it and its public site in 2026.',
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
  logatot: {
    illustration: 'logatot',
    name: 'Logatot', kind: 'Product work · Home child care',
    headline: 'Helping child care providers', emphasis: 'log their day by voice.',
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
    illustration: 'vmspark',
    name: 'VMSpark', kind: 'Client project · Healthcare staffing operations',
    headline: 'Giving a working data pipeline', emphasis: 'an interface that looks like it works.',
    intro: 'VMSpark moves hospital job feeds into staffing agencies’ applicant tracking systems. The pipeline was reliable, but the admin app looked unfinished just as the company began showing it to investors. I redesigned the app shell and the screens operators use most.',
    facts: [
      { label: 'My role', value: 'Product design and front-end engineering' },
      { label: 'Owned', value: 'Design audit, design direction, app shell, design system, table tooling, wireframes and flow diagrams' },
      { label: 'Built with', value: 'Rails 7, Hotwire (Stimulus), HTMX, Bootstrap 5, SCSS, PostgreSQL' },
      { label: 'Timeline', value: 'About six weeks, April–May 2026' },
    ],
    figures: [
      { value: '~350', label: 'templates audited before designing' },
      { value: '11', label: 'screens wireframed' },
      { value: '5', label: 'system and user flows mapped' },
    ],
    image: '/images/projects/vmspark/wires-and-flows/02-job-listings.svg',
    alt: 'VMSpark job listings interface design with status tabs, filters, and a shared application shell',
    imageNote: 'Interface design · Job listings in the shared app shell',
    next: { name: 'beckit', href: '/personal-projects/beckit/', description: 'A private journal for questioning a looping thought, one step at a time.' },
  },
  beckit: {
    illustration: 'beckit',
    name: 'beckit', kind: 'Personal project · Mental health journaling',
    headline: 'Turning a looping thought into', emphasis: 'a few sentences you can question.',
    intro: 'beckit is a private journal for thought records, a common exercise in cognitive behavioral therapy (CBT). I designed and built the guided entry, a library of thinking traps, and an Insights page that shows when a pattern tends to appear.',
    facts: [
      { label: 'My role', value: 'Product design and full-stack development' },
      { label: 'Owned', value: 'Research, product decisions, design, Rails app, illustrations' },
      { label: 'Built with', value: 'Rails 8, Hotwire, Tailwind CSS, PostgreSQL, Kamal' },
      { label: 'Team', value: 'Solo project' },
    ],
    figures: [
      { value: '5', label: 'short steps per entry', note: 'Each with one required answer' },
      { value: '11', label: 'thinking traps', note: 'Each with a drawing and test questions' },
    ],
    image: '/images/projects/beckit/beckit-entry-step.webp',
    alt: 'The first step of a beckit entry, "What\'s on your mind", with a progress bar for the five steps, the thought "I\'m going to get fired." and the feelings and intensity questions',
    secondaryImage: '/images/projects/beckit/beckit-insights.webp',
    secondaryAlt: 'The beckit Insights page, with a list of thinking traps by count and a plain-language summary: catastrophizing, mind reading, and labeling came up most across 58 entries',
    imageNote: 'Entry step and Insights overview',
    actions: [{ href: 'https://beckit-production.up.railway.app/', label: 'Visit beckit' }],
    next: { name: 'Rudiment UI', href: '/personal-projects/rudiment-ui/', description: 'A React component library with the architecture and decisions documented.' },
  },
  rudiment: {
    illustration: 'rudiment-ui',
    name: 'Rudiment UI', kind: 'Personal project · Component architecture',
    headline: 'A React component library,', emphasis: 'tested by building four apps with it.',
    intro: 'Rudiment UI is an accessible React component library built on React Aria and three-tier design tokens, documented in Storybook. I tested it by building 26 pages across four apps, and every workaround went into a gap list that set what I built next.',
    facts: [
      { label: 'My role', value: 'Design and front-end development' },
      { label: 'Owned', value: 'Component APIs, token architecture, themes, tests, documentation, example apps' },
      { label: 'Built with', value: 'React 19, TypeScript, React Aria, Style Dictionary, Storybook, Vitest, axe-core' },
      { label: 'Team', value: 'Solo project' },
    ],
    figures: [
      { value: '26', label: 'example pages', note: 'Across four apps' },
      { value: '460', label: 'automated tests', note: 'Including axe accessibility checks' },
    ],
    image: '/images/projects/rudiment-ui/rudiment-board-light.webp',
    alt: 'A Rudiment UI project board with draggable issue cards across To Do, In Progress, In Review and Done columns, each card showing priority and story points.',
    secondaryImage: '/images/projects/rudiment-ui/rudiment-board-dark.webp',
    secondaryAlt: 'The same project board in the dark theme. Only the token values changed; the components are identical.',
    imageNote: 'Project board example, light and dark', dark: true,
    actions: [
      { href: 'https://rudiment-ui.netlify.app/', label: 'Explore Storybook' },
    ],
    next: { name: 'Token Adventure', href: '/personal-projects/token-galaga/', description: 'A coding game for learning the design token format through practice.' },
  },
  tokens: {
    illustration: 'token-adventure',
    name: 'Token Adventure', kind: 'Personal project · Design systems education',
    headline: 'Learning a W3C spec by writing code', emphasis: 'that has to pass it.',
    intro: 'Token Adventure is a browser coding game that teaches the W3C Design Tokens Format, the spec for storing design decisions as JSON. I designed and built the 20-sector curriculum, the sandboxed editor, and a grader that reads your tokens the way a build tool would.',
    facts: [
      { label: 'My role', value: 'Product design, curriculum and front-end development' },
      { label: 'Owned', value: 'Curriculum, game design, visual design, test engine, copy' },
      { label: 'Built with', value: 'Astro 5, React, CodeMirror, axe-core, CSS custom properties, Netlify' },
      { label: 'Team', value: 'Solo project' },
    ],
    figures: [
      { value: '20', label: 'sectors', note: 'Across three difficulty arcs' },
      { value: '15', label: 'check types', note: '92 automated checks on the player’s code' },
    ],
    image: '/images/projects/token-galaga/token-galaga-star-chart.webp',
    alt: 'The Token Adventure star chart: twenty sectors plotted along a route across a deep-space map, color-coded cyan, yellow and magenta by difficulty, with the first nine cleared.',
    secondaryImage: '/images/projects/token-galaga/token-galaga-sector.webp',
    secondaryAlt: 'A sector in progress: a tokens.json editor beside the live preview, and a list of checks below, three passing and one failing because an alias points at a misspelled path.',
    imageNote: 'Star chart and a sector in progress', dark: true,
    actions: [{ href: 'https://token-galaga.netlify.app/', label: 'Play Token Adventure' }],
    next: { name: 'Rudiment UI', href: '/personal-projects/rudiment-ui/', description: 'An accessible React component library built on design tokens.' },
  },
} satisfies Record<string, ProjectPage>;
export type ProjectKey = keyof typeof projectPages;
