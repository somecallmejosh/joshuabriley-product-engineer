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
  "Product design engineer with 20+ years of helping teams take products from an unclear problem to a shipped, accessible product. Most of my job titles say engineer. In most of those roles I also researched what users need and decided how the product should behave, working with product, design, and engineering. On a design system team I use the same skills to support designers. The components they design reach roughly 3,500 engineers and designers as intended."

/**
 * The résumé's through-line. Each EXPERIENCE entry tags the threads it proves
 * (by key), so the same three ideas recur down the page instead of the reader
 * averaging a list of employers into a theme on their own.
 */
export const STRENGTHS = [
  {
    key: 'frame',
    title: 'Problem research',
    body: 'Use interviews, audits, analytics, and experiments to decide what to build. Then cut scope to what users need.',
  },
  {
    key: 'build',
    title: 'Team prototyping',
    body: "Prototype and validate with product, design, and engineering in the team's codebase. Decisions get tested in working software.",
  },
  {
    key: 'everyone',
    title: 'Accessibility and performance',
    body: 'Build accessibility, performance, translated content, and recoverable errors into the product from the first release.',
  },
]

export const EXPERIENCE = [
  {
    period: '2025 - Present',
    company: 'Travelers',
    role: 'Software Engineer II, Design System',
    threads: ['build', 'everyone'],
    bullets: [
      'Support the design team by automating Figma Code Connect mapping, so designers and engineers no longer translate the same components by hand.',
      'Gave roughly 3,500 engineers and designers across the organization one accessible component set to build against, cutting duplicate UI work.',
      'Cut more than 10 hours of setup per component story by automating Storybook story generation, returning that time to feature work.',
      'Raised adoption by documenting accessibility expectations, implementation guidance, and cross-framework usage, so consuming teams ship correct patterns without asking.',
    ],
  },
  {
    period: '2010 - 2025',
    company: 'Independent',
    role: 'Freelance UI Designer/Developer',
    threads: ['frame', 'build', 'everyone'],
    bullets: [
      "Rebuilt VMSpark's admin app on a design system made for its operators after a heuristic audit scored it 3.5 out of 10. A re-score with the same rubric reached 7.5, and every delete now asks for confirmation.",
      "Gave five parties one shipment record at IVFCRYO after interviews showed the hard part was getting everyone ready before a shipment could start, cutting support calls 75% and shipping errors 55%.",
      'Deliver full-stack prototypes and production applications for clients.',
    ],
  },
  {
    period: '2023 - 2024',
    company: 'Logatot, Inc.',
    role: 'Senior UX/UI Developer',
    threads: ['frame', 'build', 'everyone'],
    bullets: [
      'Moved documentation from evening paperwork to hands-free voice capture after interviews showed providers were filling in records from memory at night. Providers reported saving more than two hours a day.',
      "Matched speech against a known list and used AI only to predict likely mishearings when a child is added. Compliance records cannot contain guessed entries.",
      'Turned compliance into a by-product of daily work: attendance records, signed releases, CACFP claims, and drill logs all generate from events providers log during the day.',
      'Shipped to market as a paid product in English and Spanish, sold direct and through child care associations.',
    ],
  },
  {
    period: '2022 - 2023',
    company: "America's Test Kitchen",
    role: 'Senior Software Engineer (UI)',
    threads: ['frame', 'build', 'everyone'],
    bullets: [
      'Moved consumer-facing experiences off a legacy Rails platform onto one documented React and Next.js component library that serves multiple editorial brands without separate implementations.',
      'Kept behavior in components and brand differences in tokens, so every brand gets the same keyboard and focus handling.',
      "Settled design questions with Optimizely A/B tests and the site's analytics stack.",
      'Protected performance, accessibility, and security by weighing every third-party script against what it cost the page.',
      "Returned to formalize the company's first accessibility team and mission, closing the gap to WCAG 2.2 on every platform.",
    ],
  },
  {
    period: '2018 - 2022',
    company: 'Berkshire Hathaway Specialty Insurance',
    role: 'Principal Design Engineer',
    threads: ['frame', 'build'],
    bullets: [
      "Gave Berxi, the company's direct-to-consumer insurance platform, a design system with two-tier tokens, so marketing could launch campaigns and landing pages without waiting on engineering for visual changes, and brand updates reached every component automatically.",
      'Focused the roadmap on the screens underwriters and agents used most, based on Segment and Heap data from the portals.',
      'Made underwriting, administration, customer service, and agent workflows usable at scale through data-heavy tables, filters, forms, and dashboards.',
      'Standardized front-end work across internal, agent, and customer portals with one shared UI library, so teams stopped rebuilding the same patterns.',
    ],
  },
  {
    period: '2016 - 2018',
    company: "America's Test Kitchen",
    role: 'Lead UI Developer',
    threads: ['build', 'everyone'],
    bullets: [
      'Sped up development while improving consistency, accessibility, SEO, and performance across digital properties with a scalable UI utility system.',
      "Raised the team's baseline by training engineers on accessible markup, performance, and durable UI practices.",
      "Earned the Breaking Bread Award for strengthening the brand's digital engagement.",
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
      'Heuristic evaluation',
      'Journey mapping',
      'Prototyping',
      'Responsive design',
      'User interviews',
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
    title: 'Bachelor of Science',
    major: 'Biology',
    minor: 'Chemistry',
    org: 'Troy University',
    note: 'Majored in biology with a minor in chemistry. Research-based projects built my analytical and technical-writing habits.',
  },
]

export const CONTINUING_ED = [
  {
    title: 'Senior UX/UI/Product Designer + AI curriculum',
    org: 'Interaction Design Foundation (IxDF)',
    href: 'https://ixdf.org/members/joshua-briley?r=joshua-briley',
    note: 'Online courses in user research, interaction design, and product design, including how to design products that use AI.',
  },
  {
    title: 'Web Accessibility',
    org: 'Deque University',
    href: 'https://dequeuniversity.com/',
    note: 'Courses on building accessible websites and apps, covering WCAG, ARIA, and testing with screen readers and other assistive technology.',
  },
]

export const CERT_FOCUS = 'IAAP CPACC and WAS accessibility exams'

export const UPDATED = 'November 2026'
