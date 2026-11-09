import type { ImageMetadata } from 'astro';
import type { ProjectKey } from '~/lib/project-pages';
import type { PersonalProjectKey } from '~/lib/personal-projects';

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
  project: ProjectKey | PersonalProjectKey;
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
const vmsparkApp = pick(import.meta.glob<{ default: ImageMetadata }>('../assets/projects/vmspark/app/*.png', { eager: true }), 'vmspark/app');
const logatotRedesign = pick(import.meta.glob<{ default: ImageMetadata }>('../assets/projects/logatot/redesign/*.png', { eager: true }), 'logatot/redesign');
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
    intro: 'Annotated wireframes for the screens the case study doesn’t cover, plus more screens from the shipped app.',
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
        heading: 'More of the app',
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
      {
        heading: "More screens",
        items: [
          { src: ivfcryoSheet('06-public-tracking'), title: "Public tracking wireframe", size: 'band', caption: "The view recipients get by email or text. No account, no raw telemetry.", alt: "Annotated wireframe of the public tracking page: a plain-language status line, a four-step progress track, a live position map, and a staffed phone number in the footer, with callouts explaining why there is no login and why raw telemetry is withheld." },
          { src: ivfcryoApp('app-package-types'), title: "Package types", size: 'half', caption: "Every shipper drawn to one shared scale, so sizes compare honestly.", alt: "The Package types page: three shipper cards, CryoPort Standard, CryoPort Plus, and Vapor Shipper Mini, each with a to-scale line drawing, size, weight, max containers, declared value, and number of active shipments, labeled “Drawn to the same scale.”" },
          { src: ivfcryoApp('app-settings'), title: "Settings", size: 'half', caption: "Notifications laid out as the five shipment stages, with email and text options.", alt: "The Settings page: Shipment notifications shown as five numbered stages (Created, Pickup reminder, Picked up, Delivered, Review request), with Email and Text checks, then Temperature alert readouts for set-point, check interval, and grace period, and a Pickup and delivery contacts email preview." },
          { src: ivfcryoApp('app-list-empty-filtered'), title: "A search with no results", size: 'half', caption: "It now says what was searched and offers to clear filters or search every stage.", alt: "The shipments list after searching for “zzzz” in Awaiting pickup: an empty state reading “No shipments match these filters. Searched Awaiting pickup only. Clear the filters, or search every stage,” with Clear filters and Search every stage buttons." },
        ],
      },
      {
        heading: "On a phone",
        items: [
          { src: ivfcryoApp('phone-public-home'), title: "Home", size: 'half', caption: "The headline shows a live sample temperature.", alt: "The IVFCRYO home page on a phone: a 24/7 shipment desk phone bar, the headline “Your embryos are holding at −192.9 °C, 3h 05m into a trip we watch every minute,” two buttons, and a small live temperature chart." },
          { src: ivfcryoApp('phone-sign-in'), title: "Sign in", size: 'half', caption: "Full-width fields, support number up front.", alt: "The sign-in page on a phone: Welcome back, a note with the support phone number, email and password fields, a Forgot password link, Keep me signed in, and a full-width Log in button." },
          { src: ivfcryoApp('phone-nav-drawer'), title: "Navigation", size: 'half', caption: "Focus moves in on open and back on close.", alt: "The signed-in app on a phone with the navigation drawer open: Shipments highlighted, Users, Shipment feedback, an Inventory group, and Settings pinned at the bottom." },
          { src: ivfcryoApp('phone-new-shipment'), title: "New shipment", size: 'half', caption: "Company pickers stack into one column.", alt: "The new-shipment form on a phone: the Route section with a Ships from company picker, a selected company marked with an accent bar, local time zone, and pickup instructions." },
        ],
      },
    ],
  },
  {
    project: 'logatot',
    section: 'projects',
    slug: 'logatot',
    intro: 'Annotated wireframes and flows, more screens from the shipped app, and more before-and-after pairs from the feedback round.',
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
      {
        heading: "More wireframes and flows",
        items: [
          { src: logatotSheet('01-voiceboard'), title: "Voiceboard", size: 'band', caption: "One row per child and one column per event type, so a provider can scan twelve children at once.", alt: "Annotated wireframe of the Voiceboard: live attendance tiles across the top, reminder rails for diaper changes and health checks, then a child-by-event-type grid, with callouts explaining synchronised horizontal row scrolling, per-device column visibility, and pre-rendered empty rows." },
          { src: logatotSheet('05-checkin-kiosk'), title: "Check-in kiosk", size: 'half', caption: "A parent can reach only their own child’s check-in.", alt: "Annotated wireframe of the parent-facing check-in kiosk: a 96-pixel PIN field with no submit button, a filtered child list, and an inline signature canvas, on a dark full-bleed card with no navigation, with callouts on session teardown and per-PIN child filtering." },
          { src: logatotSheet('06-parent-portal'), title: "Parent portal", size: 'half', caption: "The Voiceboard’s events as one child’s timeline.", alt: "Annotated wireframe of the parent portal in desktop and mobile widths: a chronological day timeline for one child with photos and milestones weighted heavier than counts, and a single message-the-provider action, with callouts on why the portal is read-mostly." },
          { src: logatotSheet('12-flow-onboarding'), title: "Provider onboarding", size: 'band', caption: "New providers quit while the board is empty, so CSV import sits next to “Add child.”", alt: "Flow diagram of provider onboarding, from first visit through account creation, roster population by manual entry or CSV import, and first voice capture, with the empty-board drop-off marked as the critical failure point." },
          { src: logatotSheet('13-flow-checkin'), title: "Check in and out", size: 'band', caption: "The session is torn down between handoffs.", alt: "Flow diagram of the kiosk check-in and check-out path: provider enters kiosk mode, the session is destroyed leaving only the account id, a parent enters a PIN, selects their children, signs on canvas, and the provider signs back in with one tap." },
        ],
      },
      {
        heading: "More screens",
        items: [
          { src: logatotRedesign('provider-reports'), title: "Reports", size: 'half', caption: "Grouped by who they’re about.", alt: "The Reports page: Child reports for Allergies, Attendance, Daily activity, and Medications, then Provider and facility reports for Fire drills, Provider time, Timeclock, and Shelter in place, each a card with a tinted icon tile, a title, and a short description." },
          { src: logatotRedesign('provider-account'), title: "Account", size: 'half', caption: "Daycare details raised, everything else recessed.", alt: "The Account page for Little Acorns Home Daycare: address, time zone, phone, and billing email on a raised card with an Edit button, then recessed panels for Employees listing Heidi Parker and Marcus Reed, Alerts and notifications for diaper changes every 2 hours and health checks, Billing details marked Active with a Manage billing button, and a Share panel with a referral link and Copy button." },
          { src: logatotRedesign('public-sign-in'), title: "Provider login", size: 'half', caption: "Password for staff, email link for families.", alt: "The Logatot login page: the toy-block mark, Provider login above a Login heading, email and password fields, Remember me, a Login button, Register and Forgot your password links, and a “Family member? Family login” button." },
          { src: logatotRedesign('es-parent-dashboard'), title: "El canal familiar", size: 'half', caption: "The family channel in Spanish.", alt: "The family channel in Spanish: El canal familiar, an Ocultar filtros control, the provider’s note beginning “Hola! Gracias por depositar tu confianza en mí,” activities dated 30 de octubre de 2026 with types such as Salida, Actividad, Merienda, Se despertó, and Se durmió, and a Detalles del niño panel with Recogidas autorizadas." },
          { src: logatotRedesign('public-home-es'), title: "Página de inicio", size: 'half', caption: "The Spanish home page.", alt: "The Logatot home page in Spanish: navigation reading Inicio, Sobre nosotros, Calendario, Aprender, Blog, and FAQs, the headline “El único asistente de cuidado infantil controlado por voz,” Regístrate and Solicita una demostración buttons, and the live listening panel reading Lista para escuchar." },
          { src: logatotRedesign('provider-child-dark'), title: "Child profile, dark", size: 'half', caption: "Raised and recessed surfaces stay distinct.", alt: "Liam Carter’s profile in dark mode: a dark raised header card with his photo, name, Active badge, and Archive child and Edit buttons, health tiles, and darker recessed panels for Legal guardians, Attendance with checked weekdays, and Billing." },
          { src: logatotRedesign('provider-menu-calendar-dark'), title: "Menu calendar, dark", size: 'half', caption: "Warnings still read at a glance.", alt: "The menu calendar in dark mode: a dark month grid with meal rows such as Toast and Bananas and Apples and Cheese, meal icons, ×2 counts, warning triangles on breakfasts, and the legend above." },
          { src: logatotRedesign('public-404-dark'), title: "Not found, dark", size: 'half', caption: "Static error pages carry their own dark styles.", alt: "The 404 page in dark mode: a dark card with the three toy blocks, the top one tilted, the heading “We can’t find that page,” the line “The link may be old, or the page may have moved,” and a Go to home button." },
          { src: logatotRedesign('parent-dashboard-dark'), title: "Family channel, dark", size: 'half', caption: "Still broken: the welcome note is nearly unreadable.", alt: "The family channel in dark mode: dark panels and a readable activity table, but the provider’s welcome note at the top shows very low-contrast text on its dark background." },
        ],
      },
      {
        heading: "On a phone",
        items: [
          { src: logatotRedesign('phone-provider-voiceboard-dark'), title: "Voiceboard, dark", size: 'half', caption: "The same screen with the dark theme on.", alt: "The same phone Voiceboard in dark mode: navy surfaces, light text, and the same counts and child tile." },
          { src: logatotRedesign('es-phone-provider-voiceboard'), title: "Voiceboard, Spanish", size: 'half', caption: "Longer Spanish labels wrap without breaking the layout.", alt: "The phone Voiceboard in Spanish: Lista para escuchar, Prueba a decir “Logatot, Ava se despertó,” Vie, Oct 30, Hoy, counts reading 0 presentes, 12 esperados, 11 recogidos, 1 ausentes, and the Niños heading with Compacto and Detallado." },
          { src: logatotRedesign('phone-public-home'), title: "Home", size: 'half', caption: "A live voice demo under the headline.", alt: "The Logatot home page on a phone: the headline “Child Care’s Only Voice-Controlled Assistant,” Register and Request a demo buttons, and a live preview of the listening panel above Ava Johnson’s card of the day’s moments." },
          { src: logatotRedesign('phone-public-home-es'), title: "Home, Spanish", size: 'half', caption: "The same page with the ES switch.", alt: "The Spanish home page on a phone: “El único asistente de cuidado infantil controlado por voz,” Regístrate and Solicita una demostración buttons, and the listening panel reading Lista para escuchar." },
        ],
      },
    ],
  },
  {
    project: 'vmspark',
    section: 'projects',
    slug: 'vmspark',
    intro: 'The wireframes and flow diagrams I drew to document the system for the team, plus more screens from the shipped app.',
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
      {
        heading: "Light and dark",
        items: [
          { src: vmsparkApp('desktop-signin-dark'), title: "Sign in, dark", size: 'half', caption: "Dark mode keeps the same structure, so nothing moves when the theme changes.", alt: "The same sign-in page in dark mode, with the form card on a dark slate surface and the button in a lighter brand blue." },
          { src: vmsparkApp('desktop-job-listings-dark'), title: "Job listings, dark", size: 'half', caption: "The same page, the same tokens, mapped for dark.", alt: "The Job listings page: a header saying every job from the VMS feeds and manual jobs appears here after mapping and rules run, 1,976 listings and the last import time, Email CSV export and Reprocess all buttons, All, Processed, and Skipped tabs, and a table with view, reprocess, and open actions, notes, job status, start date, facility name, city, and state. Shown in dark mode." },
          { src: vmsparkApp('desktop-inspector-dark'), title: "Job details drawer, dark", size: 'half', caption: "The drawer, its tabs, and its status read the same in either theme.", alt: "The job details drawer open over the job listings table: a Processed status, the title CNA Certified Nursing Assistant, facility, schedule, hours, bill rate of $37.60 an hour, dates and job ID, then Overview, All fields, and Raw data tabs above the job description, with Close and Reprocess buttons at the bottom. Shown in dark mode." },
          { src: vmsparkApp('desktop-custom-rules-light'), title: "Custom rules", size: 'half', caption: "Conditions read as sentences, and order changes by drag or by the arrow buttons.", alt: "The Custom rules page: a filter bar for name, status, and changed field with a Search button, a note that says to drag a row or use the arrow buttons, and a table of numbered rules with drag handles, up and down buttons, an Active switch, conditions such as “Job: Title contains Caregiver”, the field each rule changes, and the date it was updated." },
          { src: vmsparkApp('desktop-custom-rules-dark'), title: "Custom rules, dark", size: 'half', caption: "The same page, the same tokens, mapped for dark.", alt: "The Custom rules page: a filter bar for name, status, and changed field with a Search button, a note that says to drag a row or use the arrow buttons, and a table of numbered rules with drag handles, up and down buttons, an Active switch, conditions such as “Job: Title contains Caregiver”, the field each rule changes, and the date it was updated. Shown in dark mode." },
        ],
      },
      {
        heading: "On a phone",
        items: [
          { src: vmsparkApp('phone-signin-light'), title: "Sign in", size: 'half', caption: "Labels above fields, password managers welcome.", alt: "The sign-in page on a phone in light mode: the VMS Spark logo on a navy band, Sign in, email and password fields, Show password, Forgot your password, Keep me signed in, and a full-width Sign in button." },
          { src: vmsparkApp('phone-professions-dark'), title: "Professions", size: 'half', caption: "Each mapping row stacks into one column.", alt: "The Professions mapping page on a phone in dark mode: “47 professions need a value in your ATS. Pick one and save each row.”, Unmapped and Mapped tabs, a search field with a Search button, and the first row stacked with a profession picker." },
          { src: vmsparkApp('phone-job-listings-dark'), title: "Job listings, dark", size: 'half', caption: "Same tokens, same contrast checks.", alt: "The Job listings page on a phone in dark mode, matching the light version." },
          { src: vmsparkApp('phone-signin-dark'), title: "Sign in, dark", size: 'half', caption: "The brand panel steps aside on small screens.", alt: "The sign-in page on a phone in dark mode, matching the light version." },
        ],
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

export const galleryFor = (project: ProjectKey | PersonalProjectKey) => projectGalleries.find((g) => g.project === project);
export const galleryHref = (g: ProjectGallery) => `/${g.section}/${g.slug}/gallery/`;
export const galleryCount = (g: ProjectGallery) => g.groups.reduce((n, grp) => n + grp.items.length, 0);
