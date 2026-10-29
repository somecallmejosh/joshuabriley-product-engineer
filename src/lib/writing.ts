/** Reading context shared by the index and individual articles. */
export const writing: Record<string, { format: string; covers: string[] }> = {
  'people-still-print-web-pages': {
    format: 'Article',
    covers: ['What a printed pizza menu can teach us about product design.', 'A practical starting point for layout, margins, and page breaks.', 'How to scope design-system support and check printed output.'],
  },
  'measuring-style-guide-adoption': {
    format: 'Specification',
    covers: ['A proposed scanner for component and token references.', 'What source-level counts can tell you, and where they need review.', 'A report schema and a staged approach to collecting a baseline.'],
  },
  'the-hidden-cost-of-component-inconsistency': {
    format: 'Essay',
    covers: ['Where duplicated UI creates repeated work.', 'How to collect examples from reviews, support, and maintenance.', 'What to measure before choosing a focused shared fix.'],
  },
  'future-proofing-front-end-dev-roles': {
    format: 'Research synthesis',
    covers: ['What productivity studies measure, and why their results differ.', 'The responsibilities around reviewing and maintaining AI-assisted work.', 'How to use hiring trends and forecasts in team planning.'],
  },
  'web-component-libraries-in-the-ai-era': {
    format: 'Research briefing',
    covers: ['How component distribution and code ownership have evolved.', 'Where tokens, documentation, and metadata enter AI workflows.', 'The review and maintenance questions enterprise teams need to answer.'],
  },
  'where-to-learn-modern-front-end': {
    format: 'Resource list',
    covers: ['Courses and books grouped by the skills they develop.', 'Publications and documentation for continued practice.', 'A way to choose a small reading list around your current work.'],
  },
};
