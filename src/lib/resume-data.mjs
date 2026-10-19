export const CONTACT = {
  name: 'Joshua K. Briley',
  title:
    'Design Systems & UI Engineer',
  location: 'Barkhamsted, CT',
  phone: '860.232.8250',
  email: 'josh@thebrileys.com',
  site: 'joshuabriley.com',
  linkedin: 'linkedin.com/in/joshuabriley',
  github: 'github.com/somecallmejosh',
}

/** Kept deliberately short. The bullets carry the proof; this just places me. */
export const SUMMARY =
  'Design systems and UI engineer with 20+ years in production interfaces. I build accessible components, document their use, and work with designers and engineers on complex product workflows. I currently work on the Travelers design system used by roughly 3,500 engineers and designers.'

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
]

export const EXPERIENCE = [
  {
    period: '2025 - Present',
    company: 'Travelers',
    role: 'Software Engineer II, Design System',
    stack: 'Stencil Web Components · React',
    bullets: [
      'Gave roughly 3,500 engineers and designers across the organization one accessible component set to build against, cutting duplicate UI work.',
      'Cut more than 10 hours of setup per component story by automating Storybook story generation, returning that time to feature work.',
      'Automated Figma Code Connect mapping, so designers and engineers no longer translate the same components by hand.',
      'Raised adoption by documenting accessibility expectations, implementation guidance, and cross-framework usage, so consuming teams ship correct patterns without asking.',
    ],
  },
  {
    period: '2023 - 2024',
    company: 'Logatot, Inc.',
    role: 'Senior UX/UI Developer',
    stack: 'Rails · ViewComponents',
    bullets: [
      'Moved documentation from evening paperwork to hands-free capture during the day; one provider reported saving more than two hours daily.',
      'Turned compliance into a by-product of daily work: attendance records, signed releases, CACFP claims, and drill logs all generate from events already captured.',
      'Reworked the flows and forms where Hotjar, Google Analytics, and HubSpot data showed people getting stuck.',
      'Shipped to market as a paid product sold direct and through child care associations, with English and Spanish at full parity.',
    ],
  },
  {
    period: '2022 - 2023',
    company: "America's Test Kitchen",
    role: 'Senior Software Engineer (UI)',
    stack: 'React · Next.js',
    bullets: [
      'Moved consumer-facing experiences off a legacy Rails platform onto documented React and Next.js components the team could reuse.',
      "Settled design questions with Optimizely A/B tests and the site's analytics stack.",
      'Protected performance, accessibility, and security by weighing every third-party script against what it cost the page.',
      'Came back to formalize the accessibility team and mission the company had never had, closing the gap to WCAG 2.2 across every platform.',
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
      'Focused the roadmap on the screens underwriters and agents used most, based on Segment and Heap data from the portals.',
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
    role: 'Freelance UI Designer/Developer',
    stack: 'Contract',
    bullets: [
      "Cut IVFCRYO's support calls 75% and shipping errors 55% with recoverable, accessible flows for high-stakes fertility logistics.",
      "Rebuilt VMSpark's multi-tenant admin app in four phases with zero pipeline regressions and no operator retraining.",
      'Deliver full-stack prototypes and production applications for clients when building is faster than specifying.',
    ],
  },
]

export const SKILLS = [
  {
    group: 'Front end',
    items: [
      'Alpine.js',
      'Astro',
      'CSS',
      'Gatsby',
      'HTML',
      'HTMX',
      'Hotwire',
      'JavaScript',
      'React',
      'Sass',
      'Stencil Web Components',
      'Stimulus',
      'Storybook',
      'Tailwind',
      'TypeScript',
      'Vue',
    ],
  },
  {
    group: 'Design & craft',
    items: [
      'Accessible UI',
      'Adobe CS',
      'Design-to-code',
      'Figma',
      'Prototyping',
      'Responsive design',
      'WCAG 2.1 / 2.2',
      'Workflow design',
    ],
  },
  {
    group: 'Data & experimentation',
    items: [
      'Core Web Vitals',
      'Google Analytics',
      'Heap',
      'Hotjar',
      'HubSpot',
      'Optimizely',
      'Segment',
    ],
  },
  {
    group: 'Back end & hosting',
    items: ['Heroku', 'Netlify', 'Next', 'Nuxt', 'Ruby on Rails'],
  },
  {
    group: 'Systems & testing',
    items: [
      'CI workflows',
      'Component libraries',
      'Cypress',
      'Design systems',
      'Design tokens',
      'Figma Code Connect',
      'Git',
      'Jest',
      'Lighthouse',
      'Node scripts',
      'Playwright',
      'Vitest',
    ],
  },
]

export const EDUCATION = [
  {
    title: 'B.S. Biology',
    org: 'Troy University',
    note: 'Built analytical and technical-writing habits through research-based projects.',
  },
]

export const CONTINUING_ED = [
  {
    title: 'Senior UX/UI/Product Designer + AI curriculum',
    org: 'Interaction Design Foundation (IxDF)',
  },
  { title: 'Web Accessibility', org: 'Deque University' },
]

export const CERT_FOCUS = 'IAAP CPACC and WAS accessibility exams'

export const UPDATED = 'October 2026'
