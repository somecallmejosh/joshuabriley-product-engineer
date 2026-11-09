import type { ImageMetadata } from 'astro';

/**
 * The personal projects: things made for fun and to keep current, presented as
 * a scrapbook rather than as case studies. Client work lives in project-pages.ts.
 * Keep the two apart: no metrics, role facts, or "Personal project ·" labels here.
 *
 * Copy comes from Josh's write-ups (notes/, git history of the old case studies).
 * Don't invent motives or anecdotes.
 */

const shots = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/{beckit,clempo,rudiment-ui,token-galaga}/*.png', { eager: true });
const shot = (project: string, slug: string) => shots[`../assets/projects/${project}/${slug}.png`].default;
const bits = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/*/bits/*.png', { eager: true });
const bit = (project: string, slug: string) => bits[`../assets/projects/${project}/bits/${slug}.png`].default;

export interface ScrapArt {
  /** An imported image, or a path under public/ with explicit dimensions. */
  src: ImageMetadata | string;
  width?: number;
  height?: number;
  alt: string;
}

export interface Scrap {
  art: ScrapArt[];
  note: string;
}

/** One cell of a project's mosaic on the wall: a detail cut from a real screen. */
export interface WallTile {
  src: ImageMetadata | string;
  /** Column start, column span, row start, row span, on a 6 by 4 grid. */
  area: [number, number, number, number];
  /** Transparent cut-out: no shadow. */
  flat?: boolean;
  /** Dark panel, for art from a dark interface. */
  ink?: boolean;
  /** Fills its panel edge to edge. */
  fill?: boolean;
}

export interface PersonalProject {
  name: string;
  slug: string;
  href: string;
  /** One line in my own voice, on the wall and under the name on the page. */
  note: string;
  intro: string;
  actions: { href: string; label: string }[];
  /** Pinned at the top of the page. */
  cover: ScrapArt[];
  /** How this project hangs on the /personal-projects/ wall. */
  /** Mosaic on the /personal-projects/ wall. Every cell of the grid is used. */
  wall: WallTile[];
  /** Columns of screens on the project page. */
  columns: 2 | 3;
  playedWith: string[];
  goodBits: Scrap[];
  /** A real, interactive story from the project, loaded on demand. */
  live?: { id: string; title: string; blurb: string; poster: string; posterAlt: string };
  learned: string[];
}

/** Trap drawings from beckit, served as animated SVGs. */
const trap = (slug: string, name: string): ScrapArt => ({
  src: `/images/projects/beckit/traps/${slug}.svg`,
  width: 1024,
  height: 1536,
  alt: `beckit’s line drawing for the ${name} thinking trap.`,
});

const beckitTraps = [trap('mind-reading', 'mind reading'), trap('catastrophizing', 'catastrophizing'), trap('fortune-telling', 'fortune telling')];

const clempoLogger: ScrapArt = { src: shot('clempo', 'logger'), alt: 'The Clempo logging sheet on a phone: $42.50 typed on a number keypad, “$272.51 left after this”, and a Save $42.50 button.' };
const clempoBudget: ScrapArt = { src: shot('clempo', 'budget'), alt: 'The Clempo Budget screen on a phone: $571.50 left to spend, a ring at 63 percent, and category rows with a ring around each icon and a plus button.' };

const rudimentBoard: ScrapArt = { src: shot('rudiment-ui', 'sketch-board'), alt: 'A hand-drawn style sketch of Rudiment UI’s project board example: a sidebar, a sprint bar, a WIP-limit warning, and four columns of issue cards.' };
const themeDefault: ScrapArt = { src: shot('rudiment-ui', 'theme-default'), alt: 'A CRM dashboard built with Rudiment UI, in the default theme.' };

const arcClear: ScrapArt = { src: shot('token-galaga', 'arc-clear'), alt: 'The Token Adventure Game Clear screen: a neon pink card over a sunburst, reading “Game Clear, the Token Belt, Ace Pilot.”' };

export const personalProjects = {
  beckit: {
    name: 'beckit',
    slug: 'beckit',
    href: '/personal-projects/beckit/',
    note: 'A private journal for arguing with your own looping thoughts, with a drawing for every thinking trap.',
    intro: 'beckit walks you through a thought record, the cognitive behavioral therapy exercise where you write down a thought and question it, one small step at a time.',
    actions: [{ href: 'https://beckit-production.up.railway.app/', label: 'Try beckit' }],
    cover: beckitTraps,
    wall: [
      { src: '/images/projects/beckit/traps/catastrophizing.svg', area: [1, 2, 1, 3], flat: true },
      { src: bit('beckit', 'balanced-thought'), area: [3, 4, 1, 2] },
      { src: bit('beckit', 'heatmap'), area: [3, 4, 3, 1], flat: true },
      { src: bit('beckit', 'thinker'), area: [1, 2, 4, 1], flat: true },
      { src: bit('beckit', 'thought'), area: [3, 4, 4, 1], flat: true },
    ],
    columns: 2,
    playedWith: [
      'Rails 8, Hotwire, and deploying with Kamal',
      'Eleven animated line drawings that also become share images',
      'An intensity slider whose word and weather icon change as you drag',
      'A small hop from the drawing when you answer a question',
    ],
    goodBits: [
      { art: [{ src: shot('beckit', 'new-entry'), alt: 'A new beckit entry: only the first question, “What went through your mind?”, is showing, with Continue, “Jot it down for now” and Next.' }], note: 'One question at a time, and “Jot it down for now” for the days that’s all you’ve got.' },
      { art: [{ src: shot('beckit', 'step-weigh-it-up'), alt: 'The Weigh it up step: the thought quoted above two columns, what’s backing the thought and what doesn’t quite fit the story.' }], note: 'Evidence for and against, like a very small courtroom.' },
      { art: [{ src: shot('beckit', 'sketch-name-the-pattern'), alt: 'A sketch of the Name the pattern step: the quoted thought “I’m going to get fired.”, and thinking trap chips with Catastrophizing and Fortune telling ticked.' }], note: 'The Name the pattern step, redrawn as a sketch from the real screen.' },
      { art: [{ src: bit('beckit', 'heatmap'), alt: 'beckit’s heatmap of journal entries by weekday and time of day, busiest on Friday afternoons.' }], note: 'Insights shows when a trap tends to appear and leaves the interpreting to you.' },
    ],
    learned: [
      'Drawings generated from a written style description drifted. Generating each new one from the existing drawings and comparing zoomed-in crops kept the set together.',
      'Splitting a long form into steps fixed its length, but early feedback was that it still felt like paperwork.',
      'Loading fonts from outside services told those companies someone was using a mental-health journal. Everything is self-hosted now.',
    ],
  },
  clempo: {
    name: 'Clempo',
    slug: 'clempo',
    href: '/personal-projects/clempo/',
    note: 'A household budget that picked up a meal planner, a lunch tracker, and opinions about logging your groceries.',
    intro: 'Clempo is a shared household budget with categories, a debt payoff plan, AI meal planning, and a tracker for the lunches you pack. It’s built for people who range from very technical to barely online.',
    actions: [],
    cover: [clempoLogger, clempoBudget],
    wall: [
      { src: bit('clempo', 'left-to-spend'), area: [1, 4, 1, 2] },
      { src: bit('clempo', 'bowl'), area: [5, 2, 1, 2], flat: true },
      { src: bit('clempo', 'packed-week'), area: [1, 6, 3, 1] },
      { src: bit('clempo', 'over-budget'), area: [1, 3, 4, 1] },
      { src: bit('clempo', 'tab-bar'), area: [4, 3, 4, 1] },
    ],
    columns: 3,
    playedWith: [
      'The Claude API reading pantry photos to plan a week of dinners',
      'Web Push, including Apple’s Home Screen rules on iPhone',
      'Rails 8, Hotwire, ViewComponent, and Tailwind CSS v4',
      'A service worker that deliberately caches almost nothing',
    ],
    goodBits: [
      { art: [clempoLogger], note: 'Category, amount, Save. Three taps.' },
      { art: [{ src: shot('clempo', 'meal-plan'), alt: 'A week’s meal plan on a phone: each day’s dinner with its estimated cost, the lunch made from leftovers, and prep notes such as “Start slow cooker by 9am”.' }], note: 'Dinners planned by AI, with leftovers as the next day’s lunch.' },
      { art: [{ src: shot('clempo', 'lunch'), alt: 'The Lunch screen on a phone: money saved by packing lunch this month and a weekday calendar with packed days marked.' }], note: 'Tap each workday you brought lunch from home.' },
    ],
    learned: [
      'A shared budget only works when everyone logs what they spend, and seeing someone else log a purchase is a reminder to log your own.',
      'Notifications wait 15 seconds, so undoing a purchase means nobody hears about it.',
      'It still runs on Ruby 3.2, which is past end of life. Upgrading is next.',
    ],
  },
  rudiment: {
    name: 'Rudiment UI',
    slug: 'rudiment-ui',
    href: '/personal-projects/rudiment-ui/',
    note: 'A React component library, and four apps built to find out everything it was missing.',
    intro: 'Rudiment UI is an accessible React component library built on React Aria and design tokens. I built example apps with it, wrote down every workaround, and let that list decide what to build next.',
    actions: [
      { href: 'https://rudiment-ui.netlify.app/', label: 'Explore Storybook' },
      { href: 'https://github.com/Rudiment-UI/rudiment-ui-components', label: 'View on GitHub' },
      { href: 'https://rudiment-guide.netlify.app/', label: 'Read the guide' },
    ],
    cover: [themeDefault],
    wall: [
      { src: bit('rudiment-ui', 'donut'), area: [1, 3, 1, 2], flat: true },
      { src: bit('rudiment-ui', 'workload'), area: [4, 3, 1, 3], flat: true },
      { src: bit('rudiment-ui', 'rings'), area: [1, 3, 3, 1], flat: true },
      { src: bit('rudiment-ui', 'buttons'), area: [1, 4, 4, 1], flat: true },
      { src: bit('rudiment-ui', 'toggles'), area: [5, 2, 4, 1], flat: true },
    ],
    columns: 2,
    playedWith: [
      'React 19 with React Aria for keyboard, focus, and ARIA behavior',
      'Style Dictionary building three tiers of design tokens',
      'Eight themes that are nothing but token values',
      'Writing a 13-chapter guide on component library architecture',
    ],
    goodBits: [
      { art: [rudimentBoard], note: 'The project board example, redrawn as a sketch from the real story.' },
      { art: [{ src: shot('rudiment-ui', 'example-source'), alt: 'A Storybook docs page for the CRM dashboard example, with the rendered page above its full source code.' }], note: 'Each example page sits above its full source code.' },
      { art: [{ src: shot('rudiment-ui', 'theme-roomy'), alt: 'The same CRM dashboard in the Roomy theme, with more space and rounder corners.' }], note: 'The CRM dashboard in the Roomy theme. Only the tokens changed.' },
      { art: [{ src: shot('rudiment-ui', 'theme-compressed'), alt: 'The same CRM dashboard in the Compressed theme, with tight spacing.' }], note: 'And Compressed, which only touches spacing and radius.' },
    ],
    live: {
      id: 'examples-project-management-board--board',
      title: 'Project board',
      blurb: 'The real Storybook story: issue cards across four sprint columns, with WIP-limit warnings and keyboard moves.',
      poster: '/images/projects/rudiment-ui/rudiment-board.webp',
      posterAlt: 'Rudiment UI project board story: a Kanban board with To Do, In Progress, In Review, and Done columns of issue cards showing priority and story points',
    },
    learned: [
      'Typography caused the most workarounds. Nearly every heading carried a hand-written margin reset until the components learned better.',
      'The gap list only finds my gaps. I wrote the library and the examples, so it catches what I reach for.',
      'A brand color set on the root loses inside a themed section, so overrides have to be repeated per theme.',
    ],
  },
  tokens: {
    name: 'Token Adventure',
    slug: 'token-galaga',
    href: '/personal-projects/token-galaga/',
    note: 'An arcade game where you clear each sector by writing design tokens that actually pass.',
    intro: 'Token Adventure teaches the W3C Design Tokens format in a neon arcade across 20 sectors. You write real JSON in a code editor, and the game checks it the way a build tool would.',
    actions: [{ href: 'https://token-galaga.netlify.app/', label: 'Play Token Adventure' }],
    cover: [arcClear],
    wall: [
      { src: bit('token-galaga', 'ship'), area: [1, 3, 1, 2], ink: true, fill: true },
      { src: bit('token-galaga', 'game-clear'), area: [4, 3, 1, 4], ink: true },
      { src: bit('token-galaga', 'pilot-log'), area: [1, 3, 3, 1], ink: true },
      { src: bit('token-galaga', 'ash'), area: [1, 1, 4, 1], ink: true, fill: true },
      { src: bit('token-galaga', 'press-start'), area: [2, 2, 4, 1], ink: true },
    ],
    columns: 2,
    playedWith: [
      'Game design: characters, XP, ranks, and a Spellbook of snippets you earn',
      'A sandboxed CodeMirror editor with a live preview',
      'An alias resolver that follows references the way a build tool would',
      'An arcade look, with cyan, yellow, and magenta marking the difficulty',
    ],
    goodBits: [
      { art: [{ src: shot('token-galaga', 'home'), alt: 'The Token Adventure home screen: a pixel-art ship in a pilot dossier, the game title, and a Press Start button.' }], note: 'The start screen, styled like an arcade cabinet.' },
      { art: [{ src: shot('token-galaga', 'color-the-2025-way'), alt: 'A tokens.json editor holding a color token written as an object with colorSpace, components and hex, next to a passing check list.' }], note: 'Color as an object, checked field by field. More fun than it sounds.' },
      { art: [{ src: shot('token-galaga', 'spellbook'), alt: 'The Pilot Log: a pixel-art ship in a pilot dossier showing rank Ace and 20 of 20 intel, beside text explaining that every wave you clear hands you a new piece of intel.' }], note: 'The Pilot Log, where every cleared wave hands you a new piece of intel.' },
      { art: [{ src: shot('token-galaga', 'sketch-sector'), alt: 'A sketch of a sector page: a story panel with a character’s portrait, a code console beside the live viewport, and a diagnostics panel.' }], note: 'A sector, redrawn as a sketch from the shipped game.' },
    ],
    learned: [
      'The arcade look makes a dry subject worth finishing, but the editor, preview, and checks still need the most space.',
      'Each sector is one file with its story, starter code, hint, and checks, so new sectors need no engine changes.',
      'My own playthroughs catch broken sectors, not whether the hints help. I still haven’t watched anyone learn from it.',
    ],
  },
} satisfies Record<string, PersonalProject>;

export type PersonalProjectKey = keyof typeof personalProjects;

/** Wall order, also the order of the "next" links on each page. */
export const personalProjectOrder: PersonalProjectKey[] = ['beckit', 'clempo', 'rudiment', 'tokens'];
