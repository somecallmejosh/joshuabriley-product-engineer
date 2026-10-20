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
 *   headline - Newsreader display line (a navy period is appended by the card)
 *   wink     - optional word inside `headline` set in navy italic (the site's
 *              ink-wink). Case-insensitive match on the last occurrence.
 *
 * Adding a page: add an entry here, then `node scripts/generate-og.mjs`.
 * A route with no entry falls back to the site default (social/og-image-2026.png), so
 * there are never broken image links.
 */
export const OG_PAGES = [
  // Marketing / core
  { slug: 'home', path: '/', eyebrow: 'Product Design Engineer', headline: 'I design and build product interfaces', wink: 'interfaces' },
  { slug: 'about', path: '/about/', eyebrow: 'About · Design Systems & UI Engineer', headline: 'An engineer with an eye for the details', wink: 'the details' },
  { slug: 'contact', path: '/contact/', eyebrow: 'Contact', headline: 'Let’s talk shop', wink: 'shop' },
  { slug: 'resume', path: '/resume/', eyebrow: 'Résumé · Design Systems & UI Engineer', headline: 'Twenty-plus years. Still minding the details', wink: 'the details' },
  { slug: 'projects', path: '/projects/', eyebrow: 'Selected Work', headline: 'From shared components to shipped products', wink: 'products' },
  { slug: 'personal-projects', path: '/personal-projects/', eyebrow: 'Personal Projects', headline: 'Things I build to keep the craft sharp', wink: 'craft' },
  { slug: 'testimonials', path: '/testimonials/', eyebrow: 'Testimonials', headline: 'What teams say after we ship', wink: 'ship' },
  { slug: 'blog', path: '/blog/', eyebrow: 'Writing', headline: 'Notes on design systems and front-end', wink: 'front-end' },
  { slug: 'style-guide', path: '/style-guide/', eyebrow: 'Design System · Reference', headline: 'The Editorial-Technical system', wink: null },
  { slug: 'privacy', path: '/privacy/', eyebrow: 'Legal', headline: 'Privacy policy', wink: null },
  { slug: 'terms', path: '/terms/', eyebrow: 'Legal', headline: 'Terms of use', wink: null },

  // Case studies (client work)
  { slug: 'project-americas-test-kitchen', path: '/projects/americas-test-kitchen/', eyebrow: 'Case Study · Design & Front-End', headline: "America's Test Kitchen", wink: null },
  { slug: 'project-berxi-insurance', path: '/projects/berxi-insurance/', eyebrow: 'Case Study · Design & Front-End', headline: 'Berxi.com', wink: null },
  { slug: 'project-ivfcryo', path: '/projects/ivfcryo/', eyebrow: 'Case Study · Design & Front-End', headline: 'IVFCRYO', wink: null },
  { slug: 'project-vmspark', path: '/projects/vmspark/', eyebrow: 'Case Study · Design & Front-End', headline: 'VMSpark', wink: null },

  // Personal projects
  { slug: 'pp-bass-face', path: '/personal-projects/bass-face/', eyebrow: 'Personal Project · Design & Front-End', headline: 'Bass Face', wink: null },
  { slug: 'pp-clempo', path: '/personal-projects/clempo/', eyebrow: 'Personal Project · Design & Front-End', headline: 'Clempo', wink: null },
  // Moved back from the client case studies; the eyebrow (baked into the PNG)
  // had to change with it, so this card is regenerated under its old slug.
  { slug: 'pp-rudiment-ui', path: '/personal-projects/rudiment-ui/', eyebrow: 'Personal Project · Design & Front-End', headline: 'Rudiment UI', wink: null },
  { slug: 'pp-token-galaga', path: '/personal-projects/token-galaga/', eyebrow: 'Personal Project · Design & Front-End', headline: 'Token Adventure', wink: null },
  { slug: 'pp-west-baton-rouge-presbyterian', path: '/personal-projects/west-baton-rouge-presbyterian/', eyebrow: 'Personal Project · Design & Front-End', headline: 'West Baton Rouge Presbyterian', wink: null },

  // Blog posts are NOT listed here. They are derived from the posts collection
  // via postToOgEntry() below, so a new post gets a card automatically (just
  // re-run `npm run og:generate`). The blog INDEX (/blog/) is a manifest entry.
];

/** Last word of a string with any trailing punctuation stripped (for winks). */
function lastWord(str) {
  const words = String(str).trim().split(/\s+/);
  const last = words[words.length - 1] ?? '';
  return last.replace(/[.,;:!?"')\]]+$/, '');
}

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
    wink: lastWord(post.title),
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
