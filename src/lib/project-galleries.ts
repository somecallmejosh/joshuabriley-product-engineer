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
 *
 * Items are one of three kinds, matching how the case study rendered them:
 * - a `Plate` (the default, no `type`): an image in src/assets, so `src` is ImageMetadata;
 * - `type: 'scroll'`: a full-page capture in public/, rendered with ScrollShot;
 * - `type: 'site'`: a live-site screenshot in public/, rendered with SiteShot.
 * Captures always span the gallery width.
 */

export interface GalleryItem {
  type?: 'plate';
  src: ImageMetadata;
  title: string;
  alt: string;
  caption?: string;
  /** Optional plate index, e.g. "01". */
  index?: string;
  /** `band` spans the gallery width; `half` sits in a two-up grid. */
  size: 'band' | 'half';
}

/** A full-page capture from public/, rendered with ScrollShot. Props mirror ScrollShot's. */
export interface GalleryScrollShot {
  type: 'scroll';
  /** Public URL, e.g. /images/projects/ivfcryo/public-home.webp */
  src: string;
  alt: string;
  /** Source label in the caption rail, e.g. "ivfcryo.com". */
  label: string;
  /** Kind label at the rail's left; ScrollShot defaults to "Full page". */
  kind?: string;
  caption?: string;
  href?: string;
  index?: string;
  size: 'band';
}

/** A live-site screenshot from public/, rendered with SiteShot. Props mirror SiteShot's. */
export interface GallerySiteShot {
  type: 'site';
  /** Public URL, e.g. /images/projects/vmspark/vmspark-live.webp */
  src: string;
  alt: string;
  /** Live URL the plate links to. */
  href: string;
  /** Display URL in the caption rail. */
  label: string;
  /** Kind label at the rail's left; SiteShot defaults to "Live site". */
  kind?: string;
  index?: string;
  size: 'band';
}

export type GalleryEntry = GalleryItem | GalleryScrollShot | GallerySiteShot;

export interface GalleryGroup {
  heading: string;
  intro?: string;
  /** Sketch → wireframe → annotated sheet for one screen, rendered with FidelityBand above the items. */
  fidelity?: {
    title: string;
    /** Public URLs of the bare sketch and wireframe SVGs. */
    sketch: string;
    wire: string;
    annotated: ImageMetadata;
    annotatedAlt: string;
    caption?: string;
  };
  items: GalleryEntry[];
}

export interface ProjectGallery {
  project: ProjectKey;
  section: 'projects';
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
const rudimentApp = pick(import.meta.glob<{ default: ImageMetadata }>('../assets/projects/rudiment-ui/app/*.png', { eager: true }), 'rudiment-ui/app');

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
    intro: 'Sketches, annotated wireframes, and flows, plus more screens from the shipped app.',
    groups: [
      {
        heading: 'From sketch to annotated sheet',
        intro: 'Each screen went from a rough sketch to a clean wireframe to an annotated sheet. The shipment page shows all three; the shipments index and the new-shipment form show the finished sheets.',
        fidelity: {
          title: 'Shipment detail',
          sketch: '/images/projects/ivfcryo/wires-and-flows/05-shipment-detail-sketch.svg',
          wire: '/images/projects/ivfcryo/wires-and-flows/05-shipment-detail.svg',
          annotated: ivfcryoSheet('05-shipment-detail'),
          annotatedAlt: 'Annotated wireframe of the shipment detail page: a live position map above sensor readings for temperature, humidity, and battery, then two parallel tracking timelines, with callouts explaining why telemetry outranks logistics and why the two legs stay unmerged.',
          caption: 'Sketch, wireframe, and annotated sheet for the shipment page.',
        },
        items: [
          {
            src: ivfcryoSheet('03-shipments-index'),
            index: '03',
            title: 'Shipments index',
            size: 'band',
            caption: 'Staff’s main workspace, filtered by status.',
            alt: 'Annotated wireframe of the shipments index: a filter bar, status tabs, and a list of shipment cards, with six numbered callouts explaining why status lives in the URL and why cards replaced table rows.',
          },
          {
            src: ivfcryoSheet('04-new-shipment'),
            index: '04',
            title: 'New shipment',
            size: 'band',
            caption: 'About forty fields in numbered sections, with a live price and a way forward from every error.',
            alt: 'Annotated wireframe of the new-shipment form, broken into seven numbered sections from service selection to insurance, with a live price quote pinned beside it and six callouts covering quote recalculation, contact reuse, and notification defaults.',
          },
        ],
      },
      {
        heading: 'Flows',
        intro: 'Creating a shipment, and signing in with account recovery, each drawn end to end.',
        items: [
          {
            src: ivfcryoSheet('12-flow-create-shipment'),
            title: 'Creating a shipment',
            size: 'band',
            caption: 'The highest-risk path: one submit, with validation that blocks bookings that can’t be fulfilled.',
            alt: 'Flow diagram of the shipment creation path. Service selection resolves a live price quote or a contact-for-quote branch, then runs through date, package, pickup and delivery contacts, notification preferences, insurance, and agreement. Failed validation returns to the offending field with form state preserved, and a successful submit forks into a confirmation email and the admin fulfillment queue. Six numbered design notes sit alongside.',
          },
          {
            src: ivfcryoSheet('11-flow-authentication'),
            title: 'Authentication and account recovery',
            size: 'band',
            caption: 'Every failed step offers a way to recover without calling support.',
            alt: 'Flow diagram of authentication and account recovery. A visitor branches on whether they have an account, through sign-in, admin activation, a user-chosen email or SMS verification channel, and six-digit code entry. A failed code offers resend, backup code, or password reset, and a final admin check routes to either the admin or client view. Five numbered design notes sit alongside, and password recovery runs as a separate track underneath.',
          },
        ],
      },
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
            alt: 'The IVFCRYO About page: the headline “The standard the industry was missing, built by Don and Ed Fish in Fishers, Indiana,” a short introduction, a quote from Don Fish, and a milestones timeline.',
          },
          {
            src: ivfcryoApp('app-list-active'),
            title: 'Shipments, in transit',
            size: 'half',
            caption: 'The stage tiles also work as navigation. Each row shows both clinics, the probe temperature, and the time since pickup.',
            alt: 'The shipments list, signed in as staff: a sidebar, four stage tiles (Awaiting pickup 6, In transit 4 selected, Delivered 8, All shipments 18), a filter row, and shipments grouped under Today and Yesterday. Each row shows pickup time and zone, a route such as NY to CA with both clinic names, a probe readout of −192.9 °C with a sparkline, hours since pickup, and the quoted price.',
          },
          {
            src: ivfcryoApp('app-edit-complete'),
            title: 'Delivered and locked',
            size: 'half',
            caption: 'A completed shipment can’t be edited because it is the record of custody. The page says so.',
            alt: 'The edit page for a completed shipment, titled Shipment complete: a lock panel reading “Delivered and locked. This shipment is complete and can no longer be edited. Its details stay exactly as they were at delivery, as the record of custody,” with the delivery time, door-to-door duration, a View shipment button, and the full custody timeline below.',
          },
          {
            src: ivfcryoApp('app-public-tracking-missing'),
            title: 'A tracking link that doesn’t work',
            size: 'half',
            caption: 'Bad links used to crash the page. It now explains the problem and gives an email address and phone number.',
            alt: 'The public tracking page for an unknown shipment: “We couldn’t find this shipment. The link may be old or mistyped. Check the link in your email or text, or contact IVFCRYO and we’ll look it up for you,” with Email IVFCRYO and Call 800.430.9830 buttons.',
          },
        ],
      },
      {
        heading: "More screens",
        items: [
          { src: ivfcryoSheet('06-public-tracking'), title: "Public tracking wireframe", size: 'band', caption: "The view recipients get by email or text, with no account and no raw telemetry.", alt: "Annotated wireframe of the public tracking page: a plain-language status line, a four-step progress track, a live position map, and a staffed phone number in the footer, with callouts explaining why there is no login and why raw telemetry is withheld." },
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
          { src: ivfcryoApp('phone-detail'), title: 'Shipment detail', size: 'half', caption: 'Vertical timeline, then key facts in pairs.', alt: 'Shipment detail on a phone: breadcrumb, title, invoice and Edit buttons, a vertical custody timeline, then pickup, delivery, service, and quoted price in a two-column grid.' },
          { src: ivfcryoApp('phone-clinic-list'), title: 'Clinic view', size: 'half', caption: 'A clinic sees only its own shipments.', alt: 'The My shipments page for a clinic user on a phone: stage tiles with the clinic’s own counts and the same search and filter controls as staff.' },
        ],
      },
      {
        heading: 'Public site',
        items: [
          {
            type: 'scroll',
            src: '/images/projects/ivfcryo/public-home.webp',
            alt: 'The full IVFCRYO home page: a 24/7 desk phone bar, the hero sentence “Your embryos are holding at −192.9 °C, 3h 05m into a trip we watch every minute” beside a US map with the sample route, key figures, press and partner logos, sections for patients and for clinics, a live tracking card from the app, a five-step booking-to-delivery timeline, coverage and support cards, a founder quote from Don Fish, customer reviews, a services list, and a closing call to action.',
            label: 'ivfcryo.com',
            caption: 'The tracking card, temperature trace, and timeline are live app components.',
            size: 'band',
          },
        ],
      },
    ],
  },
  {
    project: 'logatot',
    section: 'projects',
    slug: 'logatot',
    intro: 'Annotated wireframes and flows, more screens from the shipped app, and more before-and-after pairs.',
    groups: [
      {
        heading: 'Annotated wireframes',
        intro: 'The children roster, the child record, the CACFP menu planner, the calendar and fire drills, printable reports, the dashboard for providers who enter events by hand, and the review screen for misheard entries.',
        items: [
          ...[
            ['02-children-roster', 'Children roster'],
            ['03-child-form', 'Child record'],
            ['07-cacfp-menu', 'CACFP menu planner'],
            ['08-calendar', 'Calendar and drills'],
            ['09-reports', 'Reports'],
            ['10-dashboard-lat5', 'Manual-entry dashboard'],
          ].map(([slug, title]) => wireframe(logatotSheet(slug), title)),
          {
            src: logatotSheet('04-logged-events'),
            title: 'Logged events: review and repair',
            size: 'half',
            caption: 'Tapping the right word adds it to that child’s name variants.',
            alt: 'Annotated wireframe of the logged-events review screen: a queue of failed voice captures, each showing the raw utterance as selectable word chips, the partially understood fields, and the retained audio, with callouts explaining the two diagnostic flags and how a correction improves recognition permanently.',
          },
        ],
      },
      {
        heading: 'Flows',
        intro: 'Voice logging, parent access, and the food program, each drawn end to end.',
        items: [
          {
            src: logatotSheet('11-flow-voice-logging'),
            title: 'Voice event logging',
            size: 'band',
            caption: 'From speech to a saved event, with the failure path drawn in full.',
            alt: 'Flow diagram of voice event logging. An on-device wake word opens transcription, which runs through a ladder of phrase matchers and roster name matching, forking into a single-child inline write, a multi-child background job, or a failed parse that lands in the repair queue with its audio attached.',
          },
          {
            src: logatotSheet('14-flow-parent-access'),
            title: 'Parent access',
            size: 'band',
            caption: 'Email-link sign-in and a daily summary email that brings parents back.',
            alt: 'Flow diagram of parent access: a passwordless magic-link request that returns an identical screen for known and unknown addresses, a fifteen-minute single-use token, role resolution at the shared sign-in, and the automatic end-of-day summary email that drives the daily loop.',
          },
          {
            src: logatotSheet('15-flow-food-program'),
            title: 'Food program',
            size: 'band',
            caption: 'Plan, serve, and claim, with menus checked against the rules while they’re planned.',
            alt: 'Flow diagram of the CACFP food program: building a menu validated per meal against the age-group component matrix, duplicating a week, generating a shopping list, serving meals through the shared event pipeline, and reconciling the month-end claim from records that already exist.',
          },
        ],
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
            alt: 'The Calendar page in Logatot: a white Today card reading “Nothing scheduled,” a tinted Events This Week panel with a Tuesday fire drill and a Thursday picture day, and a tinted month picker.',
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
        heading: 'Before and after pairs',
        intro: 'More pages where each page got one white surface for its main content and recessed panels for everything else.',
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
            alt: 'The old Calendar page: a white Today card, separate white Tuesday and Thursday event cards under Events This Week, and a white month picker.',
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
          {
            src: logatotApp('app-voiceboard-children'),
            title: 'Voiceboard, Detailed',
            size: 'half',
            caption: 'Each child’s day so far, grouped by event type, for writing up the end-of-day report.',
            alt: 'Child cards on the Logatot Voiceboard. Each card shows a photo, the child’s name, their check-in time, and a list of the day’s events with times, such as a 7:08 am health check, a 12:29 pm wet diaper change, a 12:37 pm nap, lunch at 11:45 am, and outdoor play.',
          },
          {
            src: logatotRedesign('provider-expenses'),
            title: 'Expenses',
            size: 'half',
            caption: 'Totals and filters recessed, the table raised.',
            alt: 'The Expenses page: All expenses, Expense locations, and Expense categories segments, a recessed strip with This month $142.37, This year $600.40, and Receipts 8, a Find expenses panel with a search field and date chips, then a table of expenses with checkboxes, dates, places such as Costco and Target, category badges, amounts, mileage, and edit and delete buttons.',
          },
          {
            src: logatotRedesign('provider-child'),
            title: 'Provider: a child’s profile',
            size: 'half',
            caption: 'The whole record, editable.',
            alt: 'Liam Carter’s profile signed in as the provider: the full sidebar, a raised header card with his photo, name, pronoun, birth date, age, an Active badge, Archive child and Edit buttons, and Health tiles for allergies, medications, diapers, and diet restrictions. Below, recessed panels list Legal guardians Megan and Ryan Carter with an Add legal guardian button, a Monday-to-Friday attendance strip, and Billing of $275.00 every two weeks.',
          },
          {
            src: logatotRedesign('parent-dashboard'),
            title: 'Family: the same child',
            size: 'half',
            caption: 'Liam’s day and details, with no editing tools.',
            alt: 'The family channel signed in as Megan Carter: a top bar with the daycare name and her name, a Family channel heading, a panel greeting her with a choice of child, the provider’s thank-you note, then October 30th activities for Liam Carter as a table of times and activities from Lunch to Check-out, and a Child details panel with tuition, allergies, medications, and Authorized pickups listing Tyler Carter.',
          },
          {
            src: logatotRedesign('confirm-delete-expense'),
            title: 'Delete an expense',
            size: 'half',
            caption: 'The message names the expense, and the button names the action.',
            alt: 'The Expenses page dimmed behind a dialog titled Please confirm, with a red warning icon and the message “Delete the Costco expense from Nov 1? This can\'t be undone.” and Cancel and red Delete expense buttons. Behind it, the expense table lists Costco on Sun, Nov 1 for $142.37.',
          },
          {
            src: logatotRedesign('es-provider-voiceboard'),
            title: 'Tablero de voz',
            size: 'half',
            caption: 'The Voiceboard with the provider’s language set to Spanish.',
            alt: 'The Voiceboard in Spanish: a sidebar with Tablero de voz, Niños, Registro de actividades, and Comidas, the panel Lista para escuchar with “Di ‘Logatot’ para registrar un momento” and the example “Logatot, Ava se despertó,” counts reading 0 presentes, 12 esperados, 11 recogidos, and 1 ausentes, the date Viernes, Octubre 30, and the Niños heading with Compacto and Detallado above child tiles reading “Recogido a las 4:55 pm.”',
          },
          { src: logatotRedesign('provider-reports'), title: "Reports", size: 'half', caption: "Grouped by who they’re about.", alt: "The Reports page: Child reports for Allergies, Attendance, Daily activity, and Medications, then Provider and facility reports for Fire drills, Provider time, Timeclock, and Shelter in place, each a card with a tinted icon tile, a title, and a short description." },
          { src: logatotRedesign('provider-account'), title: "Account", size: 'half', caption: "Daycare details raised, everything else recessed.", alt: "The Account page for Little Acorns Home Daycare: address, time zone, phone, and billing email on a raised card with an Edit button, then recessed panels for Employees listing Heidi Parker and Marcus Reed, Alerts and notifications for diaper changes every 2 hours and health checks, Billing details marked Active with a Manage billing button, and a Share panel with a referral link and Copy button." },
          { src: logatotRedesign('public-sign-in'), title: "Provider login", size: 'half', caption: "Password for staff, email link for families.", alt: "The Logatot login page: the toy-block mark, Provider login above a Login heading, email and password fields, Remember me, a Login button, Register and Forgot your password links, and a “Family member? Family login” button." },
          { src: logatotRedesign('es-parent-dashboard'), title: "El canal familiar", size: 'half', caption: "The family channel in Spanish.", alt: "The family channel in Spanish: El canal familiar, an Ocultar filtros control, the provider’s note beginning “Hola! Gracias por depositar tu confianza en mí,” activities dated 30 de octubre with types such as Salida, Actividad, Merienda, Se despertó, and Se durmió, and a Detalles del niño panel with Recogidas autorizadas." },
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
          { src: logatotRedesign('phone-provider-voiceboard'), title: 'Voiceboard', size: 'half', caption: 'Date, counts, and children stack in one column.', alt: 'The Voiceboard on a phone: the Ready to listen panel with the example “Logatot, Ava woke up,” a date control for Friday, October 30 with a Today button, count pills for 0 here, 12 expected, 11 picked up, and 1 absent, then the Children heading with the Compact and Detailed switch, an Add event button, and Ava Johnson’s tile.' },
          { src: logatotRedesign('phone-parent-nav'), title: 'Family menu', size: 'half', caption: 'A parent sees three links and the dark mode switch.', alt: 'A parent’s navigation drawer on a phone: Little Acorns Home Daycare, then only My children, Chat, Reports, and a Dark mode switch.' },
          { src: logatotRedesign('phone-provider-child'), title: 'Child profile', size: 'half', caption: 'Health details become full-width tiles.', alt: 'Liam Carter’s profile on a phone: a large photo, his name, pronoun, birth date and age, an Active badge, Archive child and Edit buttons, then Health tiles for allergies, medications, and diapers.' },
          { src: logatotRedesign('phone-provider-repair'), title: 'Needs review', size: 'half', caption: 'The misheard sentence first, then the fields to fix it.', alt: 'A failed voice entry on a phone: Name not heard and Event not recognized tags, the time, the quote “Log a diaper change for, um, the little one in the blue shirt,” a hint to tap the word that was the child’s name, and Child and What happened selects.' },
          { src: logatotRedesign('phone-parent-dashboard'), title: 'Family channel', size: 'half', caption: 'The provider’s welcome note, then the child’s day.', alt: 'The family channel on a phone: a Show filters button, the provider’s thank-you note, and October 30th activities for Liam Carter with a date filter and a timeline starting with Check-out and Activity.' },
          { src: logatotRedesign('phone-public-sign-in'), title: 'Provider login', size: 'half', caption: 'Families get their own link at the bottom.', alt: 'The provider login on a phone: email and password fields, Remember me, a Login button, Register and Forgot your password links, and a “Family member? Family login” button.' },
        ],
      },
      {
        heading: 'Public site',
        items: [
          {
            type: 'scroll',
            src: '/images/projects/logatot/public-home.webp',
            alt: 'The full Logatot homepage: a header with an EN/ES switch, the hero “Child Care’s Only Voice-Controlled Assistant” beside a live listening panel and Ava Johnson’s card of the day’s moments, Try it phrase chips, a Why Logatot section with four benefits, a Speak, record, comply section with live Voiceboard tiles, a Ready for anything section with Olivia Bennett’s profile, guardians, and pickups, a Simplified, effective management section with report cards, Pricing at $30 a month or $300 a year, testimonials, and a footer with a contact form.',
            label: 'Logatot homepage',
            caption: 'Every preview is a live app component with demo data.',
            size: 'band',
          },
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
          { src: vmsparkApp('desktop-job-listings-light'), title: 'Job listings', size: 'half', caption: 'Operators use this screen most. The header states its purpose and the last import time above the table operators already knew.', alt: 'The Job listings page: a header saying every job from the VMS feeds and manual jobs appears here after mapping and rules run, 1,976 listings and the last import time, Email CSV export and Reprocess all buttons, All, Processed, and Skipped tabs, and a table with view, reprocess, and open actions, notes, job status, start date, facility name, city, and state.' },
          { src: vmsparkApp('desktop-job-listings-dark'), title: "Job listings, dark", size: 'half', caption: "The same page, the same tokens, mapped for dark.", alt: "The Job listings page: a header saying every job from the VMS feeds and manual jobs appears here after mapping and rules run, 1,976 listings and the last import time, Email CSV export and Reprocess all buttons, All, Processed, and Skipped tabs, and a table with view, reprocess, and open actions, notes, job status, start date, facility name, city, and state. Shown in dark mode." },
          { src: vmsparkApp('desktop-inspector-dark'), title: "Job details drawer, dark", size: 'half', caption: "The drawer, its tabs, and its status read the same in either theme.", alt: "The job details drawer open over the job listings table: a Processed status, the title CNA Certified Nursing Assistant, facility, schedule, hours, bill rate of $37.60 an hour, dates and job ID, then Overview, All fields, and Raw data tabs above the job description, with Close and Reprocess buttons at the bottom. Shown in dark mode." },
          { src: vmsparkApp('desktop-custom-rules-light'), title: "Custom rules", size: 'half', caption: "Conditions read as sentences, and order changes by drag or by the arrow buttons.", alt: "The Custom rules page: a filter bar for name, status, and changed field with a Search button, a note that says to drag a row or use the arrow buttons, and a table of numbered rules with drag handles, up and down buttons, an Active switch, conditions such as “Job: Title contains Caregiver”, the field each rule changes, and the date it was updated." },
          { src: vmsparkApp('desktop-custom-rules-dark'), title: "Custom rules, dark", size: 'half', caption: "The same page, the same tokens, mapped for dark.", alt: "The Custom rules page: a filter bar for name, status, and changed field with a Search button, a note that says to drag a row or use the arrow buttons, and a table of numbered rules with drag handles, up and down buttons, an Active switch, conditions such as “Job: Title contains Caregiver”, the field each rule changes, and the date it was updated. Shown in dark mode." },
          { src: vmsparkApp('desktop-confirm-reprocess-dark'), title: 'Reprocess all, dark', size: 'half', caption: 'Every confirmation in the app uses this dialog.', alt: 'The same Reprocess all confirm dialog in dark mode.' },
        ],
      },
      {
        heading: "On a phone",
        items: [
          { src: vmsparkApp('phone-signin-light'), title: "Sign in", size: 'half', caption: "Labels above fields, password managers welcome.", alt: "The sign-in page on a phone in light mode: the VMS Spark logo on a navy band, Sign in, email and password fields, Show password, Forgot your password, Keep me signed in, and a full-width Sign in button." },
          { src: vmsparkApp('phone-professions-dark'), title: "Professions", size: 'half', caption: "Each mapping row stacks into one column.", alt: "The Professions mapping page on a phone in dark mode: “47 professions need a value in your ATS. Pick one and save each row.”, Unmapped and Mapped tabs, a search field with a Search button, and the first row stacked with a profession picker." },
          { src: vmsparkApp('phone-job-listings-dark'), title: "Job listings, dark", size: 'half', caption: "Same tokens, same contrast checks.", alt: "The Job listings page on a phone in dark mode, matching the light version." },
          { src: vmsparkApp('phone-signin-dark'), title: "Sign in, dark", size: 'half', caption: "The brand panel steps aside on small screens.", alt: "The sign-in page on a phone in dark mode, matching the light version." },
          { src: vmsparkApp('phone-nav-dark'), title: 'Navigation', size: 'half', caption: 'The same labeled sidebar, as a drawer.', alt: 'The navigation drawer on a phone in dark mode: Jobs, Candidates, and Mapping groups, with Needs mapping selected and unmapped counts beside Facilities, Professions, Specialties, and the other lists.' },
          { src: vmsparkApp('phone-needs-mapping-light'), title: 'Needs mapping', size: 'half', caption: 'Counts stay on the same line as each list.', alt: 'The Needs mapping page on a phone in light mode: the purpose sentence, 2,614 unmapped values across 8 lists, the next step to start with facilities, and the list of mapping areas with their unmapped counts.' },
        ],
      },
      {
        heading: 'More screens',
        items: [
          {
            src: vmsparkApp('elements-rich-text-dialog'),
            title: 'Add action, with the rich text value',
            size: 'band',
            caption: 'The rule action dialog: the Value field is the editor, with the Rich text switch beside its label and the merge tags under it.',
            alt: 'The Add action dialog for a rate plan: a Field picker set to Position title with a hint, a Use AI to write the value switch, an AI prompt disclosure, then a Value field with a Rich text switch turned on, a hint about merge tags, a formatting toolbar with text style, bold, italic, underline, strikethrough, quote, link, list, and clear buttons, an editor containing “Hi {{city}}”, an Insert a job field disclosure, an Override the VMS rate checkbox, and Cancel and Add action buttons.',
          },
        ],
      },
      {
        heading: 'Style guide',
        items: [
          {
            type: 'scroll',
            src: '/images/projects/vmspark/styleguide-patterns-light.webp',
            alt: 'The style guide’s Patterns section: a filter bar ending in a Search button, a data table, the mapping ledger used on every mapping page, a grouped list, and the details drawer.',
            label: 'Patterns',
            kind: 'Style guide',
            caption: 'Full-page patterns that use real copy from the app.',
            size: 'band',
          },
        ],
      },
      {
        heading: 'The marketing site',
        items: [
          {
            type: 'site',
            src: '/images/projects/vmspark/vmspark-live.webp',
            alt: 'The existing VMSpark marketing site, which I didn’t design or build. It’s the source of the app’s navy, brand blue, and Spark orange.',
            href: 'https://vmspark.com/',
            label: 'vmspark.com',
            kind: 'Existing site by others',
            size: 'band',
          },
        ],
      },
    ],
  },
  {
    project: 'rudiment-ui',
    section: 'projects',
    slug: 'rudiment-ui',
    intro: 'More screens from Vitrea, the demo app built only from Rudiment UI components.',
    groups: [
      {
        heading: 'More of Vitrea',
        items: [
          {
            src: rudimentApp('vitrea-dashboard'),
            title: 'Vitrea dashboard',
            size: 'half',
            caption: 'Vitrea’s staff dashboard leads with what needs attention, then today’s work, then the month.',
            alt: 'The Vitrea dashboard in the Soft theme: a sidebar with Shipments, Address book, and admin links; a Needs attention table with one shipment reading warmer than its alert threshold; stat cards for pickups today and shipments in transit; and monthly stat cards with trends above a bar chart and a donut chart.',
          },
          {
            src: rudimentApp('vitrea-board'),
            title: 'Ops board',
            size: 'half',
            caption: 'Cards move by drag or by a move menu, and each move is announced once, by the card’s label.',
            alt: 'The Vitrea ops board: Pending, Active, and Complete columns of shipment cards, each with a drag handle, a reference, a route between two clinics, a pickup time, a service badge, and a move button. One active card carries a red Excursion label.',
          },
        ],
      },
      {
        heading: 'Dark themes',
        items: [
          { src: rudimentApp('vitrea-detail-dark'), title: 'Dark', size: 'half', caption: 'The same tokens mapped for dark, with a lighter green so it stays readable.', alt: 'The same shipment page in the Dark theme: near-black canvas, dark cards, a mint-green stepper, and a dark red alert with light text.' },
          { src: rudimentApp('vitrea-detail-soft-dark'), title: 'Soft dark', size: 'half', caption: 'The library’s Soft theme in Vitrea’s colors, chosen when the system is in dark mode.', alt: 'The same shipment page in the Soft dark theme: rounder, borderless cards on a dark canvas with the same mint-green stepper.' },
        ],
      },
    ],
  },
];

export const galleryFor = (project: ProjectKey) => projectGalleries.find((g) => g.project === project);
export const galleryHref = (g: ProjectGallery) => `/${g.section}/${g.slug}/gallery/`;
export const galleryCount = (g: ProjectGallery) => g.groups.reduce((n, grp) => n + grp.items.length, 0);
