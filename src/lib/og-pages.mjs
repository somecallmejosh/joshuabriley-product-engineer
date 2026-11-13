/**
 * OG image manifest: one entry per page that gets its own Open Graph card.
 * Single source of truth for BOTH the runtime wiring (ogImageForPath, used by
 * BaseLayout) and the generator (scripts/generate-og.mjs). Plain ESM so the
 * headless node script and Astro can both import it.
 *
 * Fields:
 *   slug     - output file name → public/images/og/<slug>.png
 *   path     - the route this card belongs to (with trailing slash)
 *   eyebrow  - Geist Mono label above the headline
 *   headline - Hanken display line in one run (the card sets its end punctuation,
 *              or an appended period, in the accent)
 *   art      - optional visual for the right half of the card:
 *              'portrait' (Josh), 'blog' (a fan of post drawings) or 'work'
 *              (a fan of project close-ups). Project pages pick up their
 *              teaser close-up and posts their drawing automatically, so they
 *              need no `art`. No art at all → a text-only card.
 *
 * Adding a page: add an entry here, then `node scripts/generate-og.mjs`.
 * A route with no entry falls back to the site default (social/og-image-2026.png), so
 * there are never broken image links.
 */
export const OG_PAGES = [
  // Marketing / core
  { slug: 'home', path: '/', eyebrow: 'Joshua Briley', headline: 'Product design engineer', art: 'portrait' },
  { slug: 'about', path: '/about/', eyebrow: 'Product Design Engineer', headline: 'About Joshua Briley', art: 'portrait' },
  { slug: 'contact', path: '/contact/', eyebrow: 'Contact', headline: 'Contact Joshua Briley', art: 'portrait' },
  { slug: 'resume', path: '/resume/', eyebrow: 'Résumé', headline: 'Joshua Briley, Product Design Engineer', art: 'portrait' },
  { slug: 'projects', path: '/projects/', eyebrow: 'Selected Work', headline: 'Client case studies', art: 'work' },
  { slug: 'personal-projects', path: '/personal-projects/', eyebrow: 'Made for fun', headline: 'Personal projects', art: 'work' },
  { slug: 'testimonials', path: '/testimonials/', eyebrow: 'Testimonials', headline: 'Client and colleague recommendations', art: 'portrait' },
  { slug: 'blog', path: '/blog/', eyebrow: 'Writing', headline: 'Writing about interfaces', art: 'blog' },
  { slug: 'style-guide', path: '/style-guide/', eyebrow: 'Design System · Reference', headline: 'The Editorial-Technical system' },
  { slug: 'privacy', path: '/privacy/', eyebrow: 'Legal', headline: 'Privacy policy' },
  { slug: 'terms', path: '/terms/', eyebrow: 'Legal', headline: 'Terms of use' },

  // Case studies (client work)
  { slug: 'project-ivfcryo', path: '/projects/ivfcryo/', eyebrow: 'Case Study · Design & Front-End', headline: 'IVFCRYO' },
  { slug: 'project-logatot', path: '/projects/logatot/', eyebrow: 'Case Study · Design & Front-End', headline: 'Logatot' },
  { slug: 'project-vmspark', path: '/projects/vmspark/', eyebrow: 'Case Study · Design & Front-End', headline: 'VMSpark' },

  // Personal projects
  // Moved back from the client case studies; the eyebrow (baked into the PNG)
  // had to change with it, so this card is regenerated under its old slug.
  { slug: 'pp-beckit', path: '/personal-projects/beckit/', eyebrow: 'Made for fun', headline: 'beckit' },
  { slug: 'pp-clempo', path: '/personal-projects/clempo/', eyebrow: 'Made for fun', headline: 'Clempo' },
  { slug: 'pp-rudiment-ui', path: '/personal-projects/rudiment-ui/', eyebrow: 'Made for fun', headline: 'Rudiment UI' },
  { slug: 'pp-token-galaga', path: '/personal-projects/token-galaga/', eyebrow: 'Made for fun', headline: 'Token Adventure' },

  // Blog posts are NOT listed here. They are derived from the posts collection
  // via postToOgEntry() below, so a new post gets a card automatically (just
  // re-run `npm run og:generate`). The blog INDEX (/blog/) is a manifest entry.
];

/**
 * Derive an OG entry from a blog post's frontmatter. Shared by the render route
 * (fed from astro:content) and the generator (fed from parsed frontmatter), so
 * the "post → card" mapping lives in exactly one place.
 * @param {{ id: string, title: string, category?: string }} post
 */
export function postToOgEntry(post) {
  return {
    slug: `blog-${post.id}`,
    path: `/blog/${post.id}/`,
    eyebrow: post.category ?? 'Writing',
    headline: post.title,
  };
}

/** Normalize a pathname to a canonical "/foo/" form (leading + trailing slash). */
function normalizePath(pathname) {
  if (!pathname) return '/';
  let p = pathname.split('?')[0].split('#')[0];
  if (!p.startsWith('/')) p = '/' + p;
  if (p !== '/' && !p.endsWith('/')) p += '/';
  return p;
}

const BY_PATH = new Map(OG_PAGES.map((e) => [e.path, e]));

/**
 * Root-relative OG image path for a route, or null if the page has no dedicated
 * card (caller falls back to the site default). BaseLayout uses this.
 */
export function ogImageForPath(pathname) {
  const p = normalizePath(pathname);
  const entry = BY_PATH.get(p);
  if (entry) return `/images/og/${entry.slug}.png`;
  // Any single-segment blog post → its derived card (see postToOgEntry).
  const m = p.match(/^\/blog\/([^/]+)\/$/);
  if (m) return `/images/og/blog-${m[1]}.png`;
  return null;
}
