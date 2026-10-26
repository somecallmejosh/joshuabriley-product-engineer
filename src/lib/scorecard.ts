/**
 * Shared module: scorecard sections, scoring logic, URL encoding.
 * Used by the /tools/scorecard/ entry page and /tools/scorecard/results/.
 */

interface ScorecardItem {
  id: string;
  label: string;
}

export interface ScorecardSection {
  id: string;
  title: string;
  max: number;
  items: ScorecardItem[];
}

export type Ratings = Record<string, number | null>;
export type SectionStatus = 'strong' | 'needs-attention' | 'critical';
export type TotalStatus = 'healthy' | 'functional' | 'investment';

// ─── Data ────────────────────────────────────────────────────────────────────

export const SECTIONS: ScorecardSection[] = [
  {
    id: 's1',
    title: 'Component consistency',
    max: 12,
    items: [
      { id: 's1-1', label: 'Similar UI patterns (buttons, inputs, modals) are built as shared components, not duplicated across the codebase.' },
      { id: 's1-2', label: 'Component APIs (props, slots, events) follow a consistent naming convention across the library.' },
      { id: 's1-3', label: 'Visual decisions (spacing, color, border radius) reference tokens, not hardcoded values inside components.' },
      { id: 's1-4', label: 'Components render consistently across the browsers and viewports your product supports.' },
      { id: 's1-5', label: "One-off components that duplicate an existing shared component don’t exist in the codebase." },
      { id: 's1-6', label: 'Deprecated components have a documented migration path and are not mixed with current components in production.' },
    ],
  },
  {
    id: 's2',
    title: 'Accessibility',
    max: 16,
    items: [
      { id: 's2-1', label: 'Every interactive component (buttons, links, form controls) is fully operable with a keyboard alone.' },
      { id: 's2-2', label: 'All form inputs have visible, programmatically associated labels.' },
      { id: 's2-3', label: 'Focusable elements have a clearly visible focus indicator that meets WCAG 2.1 AA contrast requirements.' },
      { id: 's2-4', label: 'Color is never used as the only means of conveying information (errors, statuses, required fields).' },
      { id: 's2-5', label: 'Components that control visibility (modals, drawers, tooltips) trap focus correctly and return focus on close.' },
      { id: 's2-6', label: 'Informative images and icons have descriptive alt text, and purely decorative elements are hidden from assistive technology.' },
      { id: 's2-7', label: 'Text and interactive elements meet WCAG 2.1 AA contrast ratios (4.5:1 for text, 3:1 for UI components).' },
      { id: 's2-8', label: 'Dynamic content updates (alerts, notifications, loading states) are announced to screen readers.' },
    ],
  },
  {
    id: 's3',
    title: 'Token architecture',
    max: 12,
    items: [
      { id: 's3-1', label: 'Tokens are defined in a single source of truth (design tool, JSON file, or equivalent) and synced to code.' },
      { id: 's3-2', label: 'Token names follow a consistent, predictable pattern (for example: category/property/variant) with no abbreviations or ambiguity.' },
      { id: 's3-3', label: 'Semantic tokens (for example: color.text.primary) reference primitive tokens (for example: color.gray.900), not raw values.' },
      { id: 's3-4', label: 'Token names describe intent, not value. For example, color.brand-primary rather than color.blue.' },
      { id: 's3-5', label: 'Tokens cover every design decision that varies across themes, modes, or brands.' },
      { id: 's3-6', label: 'Every component references tokens rather than redefining their values.' },
    ],
  },
  {
    id: 's4',
    title: 'Documentation',
    max: 12,
    items: [
      { id: 's4-1', label: 'Every component has a working example showing its most common use case.' },
      { id: 's4-2', label: 'Props, slots, and events are documented with types and plain-language descriptions.' },
      { id: 's4-3', label: "Components with common misuse patterns or non-obvious behavior have explicit do/don’t guidance." },
      { id: 's4-4', label: 'Documentation is updated as part of the development workflow, not added retroactively.' },
      { id: 's4-5', label: 'A getting-started guide lets a new developer install and use the library without asking anyone for help.' },
      { id: 's4-6', label: 'Keyboard interactions, ARIA attributes, and screen reader behavior are documented per component.' },
    ],
  },
  {
    id: 's5',
    title: 'Handoff process',
    max: 12,
    items: [
      { id: 's5-1', label: "Design files use components from the shared library, not custom one-offs that don’t exist in code." },
      { id: 's5-2', label: 'Designers and developers use the same token names to describe design decisions.' },
      { id: 's5-3', label: 'New components follow a documented process from design to code.' },
      { id: 's5-4', label: "Developers don’t rebuild components that already exist in the library." },
      { id: 's5-5', label: 'A clear owner (team or individual) is responsible for maintaining and evolving the design system.' },
      { id: 's5-6', label: 'The design system has a versioning and changelog process so consumers know what changed between releases.' },
    ],
  },
];

export const TOTAL_ITEMS = SECTIONS.reduce((n, s) => n + s.items.length, 0);
export const TOTAL_MAX = SECTIONS.reduce((sum, s) => sum + s.max, 0);

export const VALID_PARAM_RE = new RegExp(`^[012]{${TOTAL_ITEMS}}$`);

// ─── URL param helpers ───────────────────────────────────────────────────────

export function decodeRatings(param: string): Ratings {
  const result: Ratings = {};
  let i = 0;
  for (const section of SECTIONS) {
    for (const item of section.items) {
      result[item.id] = parseInt(param[i++], 10);
    }
  }
  return result;
}

// ─── Scoring functions ───────────────────────────────────────────────────────

export function sectionScore(section: ScorecardSection, ratings: Ratings): number {
  return section.items.reduce((sum, item) => sum + (ratings[item.id] ?? 0), 0);
}

function sectionComplete(section: ScorecardSection, ratings: Ratings): boolean {
  return section.items.every((item) => ratings[item.id] !== null);
}

export function sectionStatus(section: ScorecardSection, ratings: Ratings): SectionStatus | null {
  if (!sectionComplete(section, ratings)) return null;
  const pct = sectionScore(section, ratings) / section.max;
  if (pct >= 10 / 12) return 'strong';
  if (pct >= 6 / 12) return 'needs-attention';
  return 'critical';
}

export function getTotalScore(ratings: Ratings): number {
  return SECTIONS.reduce((sum, s) => sum + sectionScore(s, ratings), 0);
}

export function totalPercent(ratings: Ratings): number {
  return Math.round((getTotalScore(ratings) / TOTAL_MAX) * 100);
}

export function getTotalStatus(score: number): TotalStatus {
  if (score >= 52) return 'healthy';
  if (score >= 32) return 'functional';
  return 'investment';
}

export function letterGrade(pct: number): string {
  if (pct >= 93) return 'A';
  if (pct >= 85) return 'A-';
  if (pct >= 78) return 'B+';
  if (pct >= 70) return 'B';
  if (pct >= 62) return 'C+';
  if (pct >= 54) return 'C';
  if (pct >= 45) return 'D';
  return 'F';
}
