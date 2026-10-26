/** Accessible descriptions for ArticleIllustration, one per post, keyed by content id (the file name). */
export const illustrationDescriptions = {
  'automation-work-behind-the-scenes': 'A story generator runs out of sight, so it misses out on funding, adoption, and credit, which leaves it easy to cut.',
  'design-system-rules-for-ai-agents': 'A design audit catches a default-palette-class violation and blocks the commit until the code uses a system color instead.',
  'future-proofing-front-end-dev-roles': 'The front-end role splits into two paths: design engineers focused on interface quality, and engineers who direct AI agents through review and architecture.',
  'measuring-style-guide-adoption': 'A repository scan lists references to rudi-button, rudi-dialog, and the rudi accent color token, and collects them into a baseline report.',
  'native-lit-or-stencil': 'Browser APIs, Lit, and Stencil are three routes to the same custom element.',
  'people-still-print-web-pages': 'A pizza menu on screen becomes a printed page, with the online-ordering link written out as a footnote.',
  'staff-level-ui-engineering-for-dummies': 'A component library grows into a UI platform as it adds a public API, releases, and governance.',
  'the-hidden-cost-of-component-inconsistency': 'Three different versions of the same Save button, each designed, built, and tested separately, add up to repeated rework.',
  'web-component-libraries-in-the-ai-era': 'A timeline of web components: the 2011 proposal, the 2014 v1 specifications, Lit in 2019, shadcn/ui in 2023, and AI coding agents from 2024.',
  'where-to-learn-modern-front-end': 'A reading list with courses and books checked off, and newsletters and podcasts still to go.',
} as const;

export type IllustratedPost = keyof typeof illustrationDescriptions;

export const hasIllustration = (id: string): id is IllustratedPost => id in illustrationDescriptions;
