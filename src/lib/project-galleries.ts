import type { ImageMetadata } from 'astro';
import type { ProjectKey } from '~/lib/project-pages';

/**
 * Project galleries: the reference material a case study points to but
 * doesn't need to argue its case. Each case study keeps only the images that
 * support a point in the text; everything else (secondary screens, the full
 * set of wireframe sheets, extra app screenshots) lives here and renders at
 * /<section>/<slug>/gallery/ through src/pages/[section]/[slug]/gallery.astro.
 *
 * Captions and alt text moved here verbatim from the case-study pages.
 */

export interface GalleryItem {
  src: ImageMetadata;
  title: string;
  alt: string;
  caption?: string;
  /** Optional plate index, e.g. "01". */
  index?: string;
  /** `band` spans the gallery width; `half` sits in a two-up grid. */
  size: 'band' | 'half';
}

export interface GalleryGroup {
  heading: string;
  intro?: string;
  items: GalleryItem[];
}

export interface ProjectGallery {
  project: ProjectKey;
  section: 'projects' | 'personal-projects';
  slug: string;
  /** One sentence under the H1. */
  intro: string;
  groups: GalleryGroup[];
}

type Glob = Record<string, { default: ImageMetadata }>;
const pick = (files: Glob, dir: string) => (slug: string) => {
  const file = files[`../assets/projects/${dir}/${slug}.png`];
  if (!file) throw new Error(`Missing gallery image: ${dir}/${slug}.png`);
  return file.default;
};

const ivfcryoSheet = pick(import.meta.glob<{ default: ImageMetadata }>('../assets/projects/ivfcryo/wires-and-flows/*.png', { eager: true }), 'ivfcryo/wires-and-flows');
const ivfcryoApp = pick(import.meta.glob<{ default: ImageMetadata }>('../assets/projects/ivfcryo/app/*.png', { eager: true }), 'ivfcryo/app');
const logatotSheet = pick(import.meta.glob<{ default: ImageMetadata }>('../assets/projects/logatot/wires-and-flows/*.png', { eager: true }), 'logatot/wires-and-flows');
const logatotApp = pick(import.meta.glob<{ default: ImageMetadata }>('../assets/projects/logatot/app/*.png', { eager: true }), 'logatot/app');
const logatotFeedback = pick(import.meta.glob<{ default: ImageMetadata }>('../assets/projects/logatot/feedback/*.png', { eager: true }), 'logatot/feedback');
const vmsparkSheet = pick(import.meta.glob<{ default: ImageMetadata }>('../assets/projects/vmspark/wires-and-flows/*.png', { eager: true }), 'vmspark/wires-and-flows');
const beckitShot = pick(import.meta.glob<{ default: ImageMetadata }>('../assets/projects/beckit/*.png', { eager: true }), 'beckit');
const clempoShot = pick(import.meta.glob<{ default: ImageMetadata }>('../assets/projects/clempo/*.png', { eager: true }), 'clempo');
const galagaShot = pick(import.meta.glob<{ default: ImageMetadata }>('../assets/projects/token-galaga/*.png', { eager: true }), 'token-galaga');

const wireframe = (src: ImageMetadata, title: string, caption?: string): GalleryItem => ({
  src,
  title,
  caption,
  size: 'half',
  alt: `Annotated wireframe of the ${title.toLowerCase()} screen.${caption ? ` ${caption}` : ''}`,
});

export const projectGalleries: ProjectGallery[] = [
  {
    project: 'ivfcryo',
    section: 'projects',
    slug: 'ivfcryo',
    intro: 'Annotated wireframes for the screens the case study doesn’t cover, plus more screens from the 2026 redesign of the shipped app.',
    groups: [
      {
        heading: 'Other screens',
        items: [
          ['01-landing', 'Landing'],
          ['02-auth-two-factor', 'Auth + two-factor'],
          ['07-address-book', 'Address book'],
          ['08-users-admin', 'Users admin'],
          ['09-equipment-inventory', 'Equipment inventory'],
          ['10-admin-settings-feedback', 'Admin settings'],
        ].map(([slug, title]) => wireframe(ivfcryoSheet(slug), title)),
      },
      {
        heading: 'More of the redesigned app',
        items: [
          {
            src: ivfcryoApp('app-trackers'),
            title: 'SenseAware trackers',
            size: 'half',
            caption: 'Trackers use the same tile navigation and route strips as the shipments list. The Travelling tile warns that 4 trackers aren’t reporting.',
            alt: 'The SenseAware trackers page: Travelling, Available, and All tiles, a search field, and a Travelling list of four trackers, each showing a route strip, probe temperature, sparkline, battery level, and how long ago it last reported.',
          },
          {
            src: ivfcryoApp('app-feedback'),
            title: 'Shipment feedback',
            size: 'half',
            caption: 'A review desk. Each comment is shown exactly as it would be published, next to the shipment it came from, with one Approve or Decline control.',
            alt: 'The Shipment feedback page: Awaiting review, Published, Declined, and All tiles, then customer comments shown as pull quotes beside a route strip with delivered, received, and published dates and an Approved or Declined segmented control.',
          },
          {
            src: ivfcryoApp('app-senseaware'),
            title: 'SenseAware settings',
            size: 'half',
            caption: 'The default reading interval as an instrument: a large readout, readings per day, and a two-hour ruler with one tick per reading.',
            alt: 'The SenseAware settings page: a 15 minute default reading interval with 96 readings a day, a ruler with a tick for every reading over two hours, interval chips from 5 to 90 minutes, and a side panel counting shipments in progress by interval.',
          },
          {
            src: ivfcryoApp('app-clinic-new'),
            title: 'New shipment, clinic view',
            size: 'half',
            caption: 'A clinic sees the same booking page with a shorter sidebar: New shipment first, then My shipments and Address book. Only staff can override the quote.',
            alt: 'The new-shipment page signed in as a clinic user: a New shipment button above a short sidebar, Ships from and Ships to company pickers, and a Summary panel with the route, pickup time, and empty package and service rows.',
          },
          {
            src: ivfcryoApp('app-public-about'),
            title: 'About page',
            size: 'band',
            caption: 'The About hero is one sentence with the facts set inside it, next to a milestones timeline.',
            alt: 'The IVFCRYO About page: the headline “The standard the industry was missing, built since 2018 by Don and Ed Fish in Fishers, Indiana,” a short introduction, a quote from Don Fish, and a timeline from 2018 to 2025.',
          },
        ],
      },
    ],
  },
  {
    project: 'logatot',
    section: 'projects',
    slug: 'logatot',
    intro: 'Annotated wireframes for six more screens, screenshots of the same screens in the shipped app, and more before-and-after pairs from the feedback round.',
    groups: [
      {
        heading: 'Annotated wireframes',
        intro: 'The children roster, the child record, the CACFP menu planner, the calendar and fire drills, printable reports, and the dashboard for providers who enter events by hand.',
        items: [
          ['02-children-roster', 'Children roster'],
          ['03-child-form', 'Child record'],
          ['07-cacfp-menu', 'CACFP menu planner'],
          ['08-calendar', 'Calendar and drills'],
          ['09-reports', 'Reports'],
          ['10-dashboard-lat5', 'Manual-entry dashboard'],
        ].map(([slug, title]) => wireframe(logatotSheet(slug), title)),
      },
      {
        heading: 'The same screens in the app',
        items: [
          {
            src: logatotApp('app-children-roster'),
            title: 'Children roster',
            size: 'half',
            caption: 'Every child with their status, filtered by active, inactive, or archived. A new child needs only a name and a date of birth to start.',
            alt: 'The Children page in Logatot: Active, Inactive, All, and Archived tabs, a two-column list of white child cards with a photo, name, and age-group badge, and a tinted Add a child panel asking for first name, last name, and date of birth, with a Use the full form link.',
          },
          {
            src: logatotApp('app-child-record'),
            title: 'Child record',
            size: 'half',
            caption: 'Health details, legal guardians, authorized pickups, the weekly attendance schedule, and billing for one child.',
            alt: 'A child’s record in Logatot: a white header card with the photo, name, Active status, and a row of health tiles for allergies, medications, diapers, and diet restrictions. Below, tinted panels for Legal Guardians listing the mother, Attendance showing Monday to Friday selected, Authorized Pickups listing an aunt, and Billing.',
          },
          {
            src: logatotApp('app-calendar'),
            title: 'Calendar',
            size: 'half',
            caption: 'Today’s schedule, the events coming up this week, such as a fire drill, and a month view.',
            alt: 'The Calendar page in Logatot: a white Today card reading “Nothing scheduled,” a tinted Events This Week panel with a Tuesday fire drill and a Thursday picture day, and a tinted November 2026 month picker.',
          },
          {
            src: logatotApp('app-dashboard'),
            title: 'Manual-entry dashboard',
            size: 'half',
            caption: 'For providers who log events by hand: buttons for child activity, provider time, and employee shifts, beside a timeline of the day’s events.',
            alt: 'The Logatot dashboard: buttons for Log Child Activity, Log Provider Time, and Log Employee Shift, attendance counts for expected, present, checked out, and absent, and a Child Activity Timeline table of nap events with name, time, status, and description.',
          },
        ],
      },
      {
        heading: 'Before and after the feedback round',
        intro: 'More pages from the follow-up round, where each page got one white surface for its main content and recessed panels for everything else.',
        items: [
          {
            src: logatotFeedback('children-before'),
            title: 'Children, before',
            size: 'half',
            caption: 'The quick-add form is a white card with the same weight as the roster, and a second “Add child” button sits in the header.',
            alt: 'The old Children page: a two-column roster of white child cards beside a white “Add a child” card with first name, last name, and date of birth fields, and an Add child button in the page header.',
          },
          {
            src: logatotFeedback('children-after'),
            title: 'Children, after',
            size: 'half',
            caption: 'The quick-add form moves to a recessed panel with a “Use the full form” link, and the duplicate header button is gone.',
            alt: 'The new Children page: the same roster of white child cards beside a tinted “Add a child” panel with the same fields, an Add child button, and a “Use the full form” link. The header has no button.',
          },
          {
            src: logatotFeedback('calendar-before'),
            title: 'Calendar, before',
            size: 'half',
            caption: 'Today, each day of “Events this week”, and the month picker are all white cards.',
            alt: 'The old Calendar page: a white Today card, separate white Tuesday and Thursday event cards under Events This Week, and a white November 2026 month picker.',
          },
          {
            src: logatotFeedback('calendar-after'),
            title: 'Calendar, after',
            size: 'half',
            caption: 'Today is the one white card. The week’s events become one recessed panel with day groups, and the month picker is recessed too.',
            alt: 'The new Calendar page: a white Today card, then one tinted Events This Week panel with Tuesday’s fire drill and Thursday’s picture day side by side, and a tinted month picker.',
          },
          {
            src: logatotFeedback('account-before'),
            title: 'Account, before',
            size: 'half',
            caption: 'Contact info, employees, alerts, billing, and sharing each sit in their own white card.',
            alt: 'The old account page for Little Acorns Home Daycare: separate white cards for Contact Info, Employees, Alerts and Notifications, Billing Details, and Share.',
          },
          {
            src: logatotFeedback('account-after'),
            title: 'Account, after',
            size: 'half',
            caption: 'One white header with contact info. Employees, billing, alerts, and sharing sit on recessed panels below.',
            alt: 'The new account page: a white header card with the daycare name, address, time zone, phone, and billing email in one row, then tinted panels for Employees, Billing Details, Alerts and Notifications, and Share.',
          },
        ],
      },
    ],
  },
  {
    project: 'vmspark',
    section: 'projects',
    slug: 'vmspark',
    intro: 'The 11 screen wireframes and 5 flow diagrams I drew to document the system for the team.',
    groups: [
      {
        heading: 'Key screens',
        items: [
          ['01-app-shell', 'Application shell', 'A two-tier sidebar, workspace context, and global search. Every screen sits inside this frame.'],
          ['02-job-listings', 'Job listings', 'The main place operators filter, inspect, and reprocess incoming requisitions.'],
          ['03-inspector', 'Listing inspector', 'Open a single requisition without losing the filtered list behind it.'],
          ['04-data-mapping', 'Data mapping', 'Matching messy VMS terms to the agency’s own reference data.'],
          ['05-custom-rules', 'Custom rules and rate plans', 'Ordered conditions and results that rewrite listings as they’re processed.'],
        ].map(([slug, title, caption], i) => ({
          ...wireframe(vmsparkSheet(slug), title, caption),
          size: 'band' as const,
          index: String(i + 1).padStart(2, '0'),
        })),
      },
      {
        heading: 'Flows',
        items: [
          ['flow-01-ingestion', 'Ingestion to ATS sync', 'The core pipeline, from vendor feed to applicant tracking system.'],
          ['flow-02-mapping-resolution', 'Mapping resolution', 'How an operator clears mapping gaps, and how many listings one change can reprocess.'],
          ['flow-05-journeys', 'Role-based journeys', 'Who does what, where they start, and which screens they spend their time in.'],
        ].map(([slug, title, caption]) => ({
          src: vmsparkSheet(slug),
          title,
          caption,
          size: 'band' as const,
          alt: `Flow diagram: ${title.toLowerCase()}. ${caption}`,
        })),
      },
      {
        heading: 'Other screens',
        items: [
          ['06-candidate-profiles', 'Candidate profiles', 'A searchable roster and a tabbed detail view for recruiters.'],
          ['07-applications-matches', 'Applications and matches', 'Candidate applications and system matches in one queue.'],
          ['08-settings', 'Account settings', 'Integrations, managed lists, and each user’s table layout.'],
          ['09-candidate-portal', 'Candidate portal', 'A separate, agency-branded experience for applicants.'],
          ['10-ai-usage', 'AI usage', 'An owner-only view of what AI-generated rule results cost.'],
          ['11-design-system', 'Component inventory', 'The shared building blocks every screen uses.'],
        ].map(([slug, title, caption]) => wireframe(vmsparkSheet(slug), title, caption)),
      },
    ],
  },
  {
    project: 'beckit',
    section: 'personal-projects',
    slug: 'beckit',
    intro: 'The screens around the entry flow: the journal, the landing page, the thinking traps, and the privacy page.',
    groups: [
      {
        heading: 'Other screens',
        items: [
          { src: beckitShot('journal'), title: 'Journal', size: 'half', alt: 'The beckit journal: a greeting and the most common traps of the last 30 days beside a month-by-month list of entries, each with its place, title, thought, trap tags and feeling rating.' },
          { src: beckitShot('landing'), title: 'Landing page', size: 'half', alt: 'The beckit landing page: the headline “Notice the thought. Name the pattern.”, then sections on getting a thought out of your head, giving the pattern a name, rating the feeling before and after, and privacy.' },
          { src: beckitShot('trap-library'), title: 'Thinking traps', size: 'half', alt: 'The thinking traps index: eleven traps, each with its drawing, name and one-line definition.' },
          { src: beckitShot('trap-mind-reading'), title: 'Thinking trap page', size: 'half', alt: 'The mind reading page: a definition, an example, a more balanced perspective, the trap’s drawing of two people on a bench, and a “Let yourself off the hook” message.' },
          { src: beckitShot('privacy'), title: 'Privacy', size: 'half', alt: 'The beckit privacy page, written in plain language.' },
        ],
      },
    ],
  },
  {
    project: 'clempo',
    section: 'personal-projects',
    slug: 'clempo',
    intro: 'More of Clempo on a phone: signing in and starting an AI meal plan.',
    groups: [
      {
        heading: 'Other screens',
        items: [
          { src: clempoShot('sign-in'), title: 'Sign in', size: 'half', alt: 'The Clempo sign-in screen on a phone: the Clempo logo, email and password fields with a Show button, a Sign in button, and links to reset a password or create an account.' },
          { src: clempoShot('meal-plan-new'), title: 'New meal plan', size: 'half', alt: 'The Plan this week screen on a phone: a box for describing the week, an optional upload for pantry or freezer photos in any format up to 3.75 MB each, and a Generate meal plan button.' },
        ],
      },
    ],
  },
  {
    project: 'tokens',
    section: 'personal-projects',
    slug: 'token-galaga',
    intro: 'The screens around the sectors: the Spellbook, the home screen, a story panel, and the game on a phone.',
    groups: [
      {
        heading: 'Other screens',
        items: [
          { src: galagaShot('spellbook'), title: 'Spellbook', size: 'half', alt: 'The Spellbook: a list of lessons learned, each with a short explanation and a reusable token snippet.' },
          { src: galagaShot('home'), title: 'Home screen', size: 'half', alt: 'The Token Adventure arcade cabinet home screen with a glowing title and Press Start button.' },
          { src: galagaShot('story-panel'), title: 'Story panel', size: 'half', alt: 'An NPC portrait beside a story panel explaining why a hardcoded brand color is a problem.' },
          { src: galagaShot('mobile-sector'), title: 'On a phone', size: 'half', alt: 'A sector on a phone: the code editor and the live preview stacked in one column.' },
        ],
      },
    ],
  },
];

export const galleryFor = (project: ProjectKey) => projectGalleries.find((g) => g.project === project);
export const galleryHref = (g: ProjectGallery) => `/${g.section}/${g.slug}/gallery/`;
export const galleryCount = (g: ProjectGallery) => g.groups.reduce((n, grp) => n + grp.items.length, 0);
