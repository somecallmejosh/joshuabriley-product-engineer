/**
 * Resume content, in one place.
 *
 * Consumed by three things that must never disagree:
 *   - src/pages/resume.astro        the public page
 *   - src/pages/resume-print.astro  the print document (dev-only render target)
 *   - scripts/generate-resume-pdf.mjs → public/resume.pdf
 *
 * Plain .mjs (not .ts) so the Node generator can import it directly, same as
 * src/lib/og-pages.mjs.
 *
 * Bullet rule: each one names what the company got, not what I worked in. The
 * tech lives in `stack` beside the dates and in TOOLKIT at the end, which is
 * where a skim-reader and a keyword screen both look for it anyway. Every
 * number here is substantiated by a case study on the site.
 */

export const CONTACT = {
  name: 'Joshua K. Briley',
  title: 'Product Design Engineer / Design Systems Engineer / Front-End UI Developer',
  location: 'Barkhamsted, CT',
  phone: '860.232.8250',
  email: 'josh@thebrileys.com',
  site: 'joshuabriley.com',
  linkedin: 'linkedin.com/in/joshuabriley',
  github: 'github.com/somecallmejosh',
};

/** Kept deliberately short. The bullets carry the proof; this just places me. */
export const SUMMARY =
  'Product design engineer with 20+ years in production UI. I design and build the interface myself, design-grade and accessible, so nothing is lost in a handoff. Currently building the enterprise design system roughly 3,500 Travelers engineers and designers work from.';

export const STRENGTHS = [
  {
    title: 'Design by building',
    body: 'Prototype, validate, and ship front-end work directly in modern product codebases rather than relying on static handoffs.',
  },
  {
    title: 'Complex insurance UX',
    body: 'Internal portals, customer portals, admin tools, tables, filters, workflows, and data-dense interfaces for specialty-insurance users.',
  },
  {
    title: 'Design systems',
    body: 'Component libraries, tokens, documentation, Storybook stories, usage guidance, accessibility patterns, and developer-facing workflows.',
  },
  {
    title: 'AI-assisted delivery',
    body: "Use AI tools across research, prototyping, and build, catching where output looks right but isn't and owning the result rather than trusting it.",
  },
  {
    title: 'Invisible craft',
    body: 'Accessibility, responsive behavior, performance, semantics, and interaction polish that make products feel fast and dependable.',
  },
  {
    title: 'Product judgment',
    body: "Partner across product, design, and engineering to frame what's worth building, cut scope, validate with real users, and ship the useful path.",
  },
];

export const EXPERIENCE = [
  {
    period: '2025 - Present',
    company: 'Travelers',
    role: 'Software Engineer II, Design System',
    stack: 'Stencil Web Components · React',
    bullets: [
      'Gave roughly 3,500 engineers and designers across the organization one accessible component set to build against, cutting duplicate UI work.',
      'Cut more than 10 hours of setup per component story by automating Storybook story generation, returning that time to feature work.',
      'Closed the design-to-code gap by automating Figma Code Connect mapping, so design and engineering stop hand-translating the same components.',
      'Raised adoption by documenting accessibility expectations, implementation guidance, and cross-framework usage, so consuming teams ship correct patterns without asking.',
    ],
  },
  {
    period: '2023 - 2024',
    company: 'LogATot, Inc.',
    role: 'Senior UI Developer',
    stack: 'Rails · ViewComponents',
    bullets: [
      'Gave providers back more than two hours a day by moving documentation from evening paperwork to hands-free capture during the day.',
      'Turned compliance into a by-product of daily work: attendance records, signed releases, CACFP claims, and drill logs all generate from events already captured.',
      'Reworked the flows and forms where Hotjar, Google Analytics, and HubSpot showed people getting stuck, instead of where opinion said to look.',
      'Shipped to market as a paid product sold direct and through child care associations, with English and Spanish at full parity.',
    ],
  },
  {
    period: '2022 - 2023',
    company: "America's Test Kitchen",
    role: 'Senior Software Engineer',
    stack: 'React · Next.js',
    bullets: [
      'Moved consumer-facing experiences off a legacy Rails platform onto documented React and Next.js components the team could reuse.',
      "Settled design questions with Optimizely A/B tests and the site's analytics stack.",
      'Protected performance, accessibility, and security by weighing every third-party script against what it cost the page.',
      'Improved accessibility and responsive behavior across products serving a large editorial audience.',
    ],
  },
  {
    period: '2018 - 2022',
    company: 'Berkshire Hathaway Specialty Insurance',
    role: 'Principal Design Engineer',
    stack: 'Vue.js · Nuxt.js',
    bullets: [
      'Standardized front-end work across internal, agent, and customer portals with one shared UI library, so teams stopped rebuilding the same patterns.',
      'Made underwriting, administration, customer service, and agent workflows usable at scale through data-heavy tables, filters, forms, and dashboards.',
      'Pointed the roadmap at the screens that mattered by instrumenting the portals with Segment and Heap and reading real underwriter and agent behavior.',
      'Turned complex insurance processes into accessible, production-ready UI patterns alongside stakeholders, engineers, and subject-matter experts.',
    ],
  },
  {
    period: '2016 - 2018',
    company: "America's Test Kitchen",
    role: 'Lead UI Developer',
    stack: 'UI Systems',
    bullets: [
      'Sped up development while improving consistency, accessibility, SEO, and performance across digital properties with a scalable UI utility system.',
      "Raised the team's baseline by training engineers on accessible markup, performance, and durable UI practices.",
      "Earned the Breaking Bread Award for strengthening the brand's digital engagement.",
    ],
  },
  {
    period: '2010 - Present',
    company: 'Independent',
    role: 'Freelance UI Developer',
    stack: 'Contract',
    bullets: [
      "Cut IVFCRYO's support calls 75% and shipping errors 55% with recoverable, accessible flows for high-stakes fertility logistics.",
      "Rebuilt VMSpark's multi-tenant admin app in four phases with zero pipeline regressions and no operator retraining.",
      'Deliver full-stack prototypes and production applications for clients when building is faster than specifying.',
    ],
  },
];

export const SKILLS = [
  {
    group: 'Front end',
    items: ['HTML', 'CSS', 'Sass', 'Tailwind', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue', 'Nuxt', 'Astro', 'Stencil Web Components', 'Storybook', 'Gatsby', 'Alpine.js', 'HTMX', 'Hotwire', 'Stimulus'],
  },
  {
    group: 'Systems & testing',
    items: ['Design systems', 'Component libraries', 'Design tokens', 'Figma Code Connect', 'Playwright', 'Jest', 'Vitest', 'Cypress', 'Lighthouse', 'Node scripts', 'Git', 'CI workflows'],
  },
  {
    group: 'Data & experimentation',
    items: ['Segment', 'Heap', 'Hotjar', 'Google Analytics', 'HubSpot', 'Optimizely', 'Core Web Vitals'],
  },
  {
    group: 'Design & craft',
    items: ['Figma', 'Adobe CS', 'Accessible UI', 'WCAG 2.1 / 2.2', 'Responsive design', 'Workflow design', 'Prototyping', 'Design-to-code'],
  },
];

export const EDUCATION = [
  {
    title: 'B.S. Biology',
    org: 'Troy University',
    note: 'Built analytical and technical-writing habits through research-based projects.',
  },
];

export const CONTINUING_ED = [
  { title: 'Web Accessibility', org: 'Deque University' },
  { title: 'Personal learning projects', org: 'Ongoing' },
];

export const CERT_FOCUS = 'IAAP CPACC and WAS accessibility exams';

export const UPDATED = 'August 2026';
