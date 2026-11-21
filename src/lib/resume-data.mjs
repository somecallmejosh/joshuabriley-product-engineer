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
  'Product design engineer with 20+ years of designing and building accessible production interfaces with product, design, and engineering teams. Works across design systems, reusable components, Web Components, and interaction design, in Vue, Stencil, React, Ruby on Rails, TypeScript, HTML, and CSS. Currently builds and maintains Stencil components for a design system used by about 3,500 designers and engineers.'

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
      'Build and maintain accessible Stencil Web Components for a design system used by about 3,500 designers and engineers, so teams on different frameworks share one component set instead of rebuilding it.',
      'Document component APIs, accessibility expectations, and cross-framework usage, so consuming teams ship correct patterns without asking.',
      'Cut more than 10 hours of setup per component story by automating Storybook story generation, returning that time to feature work.',
      'Automate Figma Code Connect mapping, so designers and engineers no longer translate the same components by hand.',
    ],
  },
  {
    period: '2010 - 2025',
    company: 'Independent',
    role: 'Freelance UI Designer/Developer',
    threads: ['frame', 'build', 'everyone'],
    bullets: [
      "Rebuilt the front end of VMSpark's Rails admin app on a design system made for its operators after a heuristic audit scored it 3.5 out of 10. The production release re-scored 7.5 on the same rubric, and every delete now asks for confirmation.",
      "Gave five parties one shipment record at IVFCRYO after interviews showed the hard part was getting everyone ready before a shipment could start, cutting support calls 75% and shipping errors 55%.",
      "Built IVFCRYO's interface in Rails with ViewComponent, HTML, Tailwind CSS, and JavaScript, working with the back-end team that owned the shipment-tracking integration.",
    ],
  },
  {
    period: '2023 - 2024',
    company: 'Logatot, Inc.',
    role: 'Senior UX/UI Developer',
    threads: ['frame', 'build', 'everyone'],
    bullets: [
      'Built the provider and family interfaces in Ruby on Rails with ViewComponent, htmx, and Alpine.js, working with the back-end developers.',
      'Moved documentation from evening paperwork to hands-free voice capture after interviews showed providers were filling in records from memory at night. Providers reported saving more than two hours a day.',
      'Designed and built a review step for uncertain voice entries: speech is matched against a known list of children, and anything that does not match waits for the provider to correct it, so compliance records never contain guesses.',
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
      "Led the move of Berxi, the company's direct-to-consumer insurance platform, off the Mendix no-code platform onto Vue, Nuxt, and TypeScript across four lines of business, owning the front-end architecture, user flows, and design system.",
      'Gave Berxi a design system with two-tier tokens, so marketing could launch campaigns and landing pages without waiting on engineering, and brand updates reached every component automatically.',
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
    group: 'Front end',
    items: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'Vue',
      'Nuxt',
      'Stencil Web Components',
      'React',
      'Next.js',
      'Storybook',
      'Sass',
      'Tailwind',
      'htmx',
      'Alpine.js',
      'Hotwire',
      'Stimulus',
      'Astro',
    ],
  },
  {
    group: 'Design systems & accessibility',
    items: [
      'Component libraries',
      'Component APIs',
      'Design tokens',
      'Figma Code Connect',
      'WCAG 2.1 / 2.2',
      'Semantic HTML',
      'ARIA',
      'Keyboard and focus management',
    ],
  },
  {
    group: 'Product design',
    items: [
      'User interviews',
      'Workflow design',
      'Interaction design',
      'Prototyping',
      'Heuristic evaluation',
      'Journey mapping',
      'Responsive design',
      'Figma',
    ],
  },
  {
    group: 'Testing & quality',
    items: ['Playwright', 'Jest', 'Vitest', 'Cypress', 'RSpec', 'Lighthouse', 'Core Web Vitals', 'Git', 'CI workflows'],
  },
  {
    group: 'Application development',
    items: ['Ruby on Rails', 'ViewComponent', 'Node scripts', 'Heroku', 'Netlify'],
  },
  {
    group: 'Analytics & experimentation',
    items: ['Optimizely', 'Segment', 'Heap', 'Google Analytics', 'Hotjar'],
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
