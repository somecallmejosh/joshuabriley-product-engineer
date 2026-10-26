export const CONTACT = {
  name: 'Joshua K. Briley',
  title: 'Product Design Engineer',
  location: 'Barkhamsted, CT',
  phone: '860.232.8250',
  email: 'josh@thebrileys.com',
  site: 'joshuabriley.com',
  linkedin: 'linkedin.com/in/joshuabriley',
  github: 'github.com/somecallmejosh',
}

/** Kept deliberately short. The bullets carry the proof; this just places me. */
export const SUMMARY =
  "Product design engineer with 20+ years taking products from an unclear problem to a shipped, accessible product. I work out what users actually need, design the flow, and build it myself, in settings from a child-care platform to a design system used by roughly 3,500 engineers and designers."

/**
 * The résumé's through-line. Each EXPERIENCE entry tags the threads it proves
 * (by key), so the same three ideas recur down the page instead of the reader
 * averaging a list of employers into a theme on their own.
 */
export const STRENGTHS = [
  {
    key: 'frame',
    title: 'Frame the problem',
    body: "Use analytics, experiments, and time with real users to decide what's worth building, then cut scope to the useful path.",
  },
  {
    key: 'build',
    title: 'Design and build in one pass',
    body: 'Prototype, validate, and ship directly in product codebases, so design decisions are tested in working software instead of static handoffs.',
  },
  {
    key: 'everyone',
    title: 'Make it work for everyone',
    body: 'Accessibility, performance, language parity, and recoverable flows, treated as part of the product rather than a final pass.',
  },
]

export const EXPERIENCE = [
  {
    period: '2025 - Present',
    company: 'Travelers',
    role: 'Software Engineer II, Design System',
    stack: 'Stencil Web Components · React',
    threads: ['build', 'everyone'],
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
    threads: ['frame', 'build', 'everyone'],
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
    threads: ['frame', 'everyone'],
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
    threads: ['frame', 'build'],
    bullets: [
      'Focused the roadmap on the screens underwriters and agents used most, based on Segment and Heap data from the portals.',
      'Made underwriting, administration, customer service, and agent workflows usable at scale through data-heavy tables, filters, forms, and dashboards.',
      'Standardized front-end work across internal, agent, and customer portals with one shared UI library, so teams stopped rebuilding the same patterns.',
    ],
  },
  {
    period: '2016 - 2018',
    company: "America's Test Kitchen",
    role: 'Lead UI Developer',
    stack: 'UI Systems',
    threads: ['build', 'everyone'],
    bullets: [
      'Sped up development while improving consistency, accessibility, SEO, and performance across digital properties with a scalable UI utility system.',
      "Raised the team's baseline by training engineers on accessible markup, performance, and durable UI practices.",
      "Earned the Breaking Bread Award for strengthening the brand's digital engagement.",
    ],
  },
  {
    period: '2010 - 2025',
    company: 'Independent',
    role: 'Freelance UI Designer/Developer',
    stack: 'Contract',
    threads: ['frame', 'build', 'everyone'],
    bullets: [
      "Cut IVFCRYO's support calls 75% and shipping errors 55% with recoverable, accessible flows for high-stakes fertility logistics.",
      "Rebuilt VMSpark's multi-tenant admin app in four phases with zero pipeline regressions and no operator retraining.",
      'Deliver full-stack prototypes and production applications for clients when building is faster than specifying.',
    ],
  },
]

export const SKILLS = [
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
  {
    group: 'Back end & hosting',
    items: ['Heroku', 'Netlify', 'Next', 'Nuxt', 'Ruby on Rails'],
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
    href: 'https://ixdf.org/members/joshua-briley?r=joshua-briley',
  },
  {
    title: 'Web Accessibility',
    org: 'Deque University',
    href: 'https://dequeuniversity.com/',
  },
]

export const CERT_FOCUS = 'IAAP CPACC and WAS accessibility exams'

export const UPDATED = 'October 2026'
