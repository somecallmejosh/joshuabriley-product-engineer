// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import netlify from '@astrojs/netlify'

const isDev = process.argv.includes('dev')

export default defineConfig({
  site: 'https://joshuabriley.com',
  output: 'static',
  // Keep old links / SEO working after route moves.
  redirects: {
    // The four interactive tools were briefly published as blog posts, where
    // the essay index gave them no visual distinction and buried them. They
    // now live under /tools/ at their original slugs, so these carry the
    // blog-era URLs forward. The scorecard's results renderer never moved.
    '/blog/design-system-scorecard': '/tools/scorecard',
    '/blog/what-an-audit-finds': '/tools/audit-findings',
    '/blog/what-a-design-token-actually-does': '/tools/token-playground',
    '/blog/what-inconsistency-costs': '/tools/roi-calculator',
    '/scorecard': '/tools/scorecard',
    '/scorecard/results': '/tools/scorecard/results',
    // Clempo + Bass Face moved into the personal-projects section.
    // '/projects/clempo': '/personal-projects/clempo',
    // '/projects/bass-face': '/personal-projects/bass-face',
    // Rudiment UI moved back: it has no client and no user research to
    // report, so it doesn't fit the case-study bar the other /projects/
    // pages are held to.
    '/projects/rudiment-ui': '/personal-projects/rudiment-ui',
  },
  ...(isDev ? {} : { adapter: netlify() }),
  // Default (sharp) image service. The passthrough service was carried in at the
  // original Astro migration and silently disabled all optimization, so `<Image>`
  // would have shipped source bytes untouched. Nothing outside src/assets is
  // affected: images still in public/ are never processed either way.
  experimental: {
    // Editorial-Technical type system: one warm grotesk does all the work,
    // one mono carries every technical/metadata moment. Legacy CSS-var names
    // are aliased onto these in global.css so un-migrated pages stay in-system.
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Hanken Grotesk',
        cssVariable: '--font-hanken',
        weights: [400, 500, 600, 700, 800],
        styles: ['normal'],
        subsets: ['latin'],
        display: 'swap',
        fallbacks: ['system-ui', 'sans-serif'],
      },
      {
        // Display serif (the character face). Headlines + oversized numerals only;
        // body stays Hanken, technical labels stay Geist Mono. Newsreader's
        // editorial warmth, optical sizing and distinctive italic break the
        // "one-grotesk Tailwind template" read. Italic carries the editorial wink.
        // The CSS var keeps its historic name so every downstream reference (the
        // font-display/font-serif tokens, .ink-wink, headings) tracks the swap.
        provider: fontProviders.google(),
        name: 'Newsreader',
        cssVariable: '--font-fraunces',
        weights: [400, 500, 600, 700],
        styles: ['normal', 'italic'],
        subsets: ['latin'],
        display: 'swap',
        fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      },
      {
        // Signature script — the brand lockup ONLY (header + footer wordmark).
        // Style Script is a sign-painter hand: even stroke weight, short
        // swashes, generous x-height, so it stays legible at header size and
        // does not optically collapse reversed out on the ink footer. Single
        // weight by design; never ask for bold, the browser will fake it.
        provider: fontProviders.google(),
        name: 'Style Script',
        cssVariable: '--font-script',
        weights: [400],
        styles: ['normal'],
        subsets: ['latin'],
        display: 'swap',
        fallbacks: ['Snell Roundhand', 'Apple Chancery', 'cursive'],
      },
      {
        provider: fontProviders.google(),
        name: 'Geist Mono',
        cssVariable: '--font-geist-mono',
        weights: [400, 500, 600],
        styles: ['normal'],
        subsets: ['latin'],
        display: 'swap',
        fallbacks: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    ],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/dev/') &&
        !page.includes('/component-inventory') &&
        !page.includes('/og-render') &&
        !page.includes('/resume-print') &&
        !page.includes('/tools/scorecard/results'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
})
