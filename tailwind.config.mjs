/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        // One grotesk does display/heading/body/logo; one mono does the rest.
        // Legacy token names are kept and pointed at the new families so every
        // page that still references font-display/-heading/-body reflows cleanly.
        sans: ['var(--font-hanken)', 'system-ui', 'sans-serif'],
        display: ['var(--font-hanken)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-hanken)', 'system-ui', 'sans-serif'],
        body: ['var(--font-hanken)', 'system-ui', 'sans-serif'],
        // Signature script — reserved for the Logo wordmark. Applying it
        // anywhere else is a bug: it has one weight, no mono/tabular figures,
        // and is unreadable below ~20px.
        script: ['var(--font-script)', 'Snell Roundhand', 'cursive'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // ── New "Editorial Technical" system ──────────────────────────────
        paper: '#FAFBFC', // page background — near-white, faint cool cast (terracotta + slate)
        raised: '#FFFFFF', // cards / raised surfaces (pure white, lifts off paper)
        'surface-warm': 'var(--surface-warm)', // warm tint for small inline callouts only (e.g. blog author card), not section washes
        ink: {
          DEFAULT: '#1A1B1E', // primary text + dark surfaces (cool near-black)
          soft: '#292A2E',
          muted: '#565760', // secondary text (~6:1 on paper — AA with margin)
          faint: '#9A9AA1', // metadata / disabled
        },
        line: {
          DEFAULT: '#E5E7EB', // table rows, sticky edges, input outlines
          strong: '#D4D7DD',
        },
        accent: {
          // Channel-based so the accent can FOLLOW the surface: deep denim navy
          // on light paper (AA 6.7:1), a brightened sky-denim on dark ink (AA
          // 6.6:1). --accent-rgb is overridden per-surface in site.css;
          // <alpha-value> keeps `accent/NN` working.
          DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
          ink: '#234A70', // pressed / darker (light-surface press state)
        },

        // ── Legacy tokens remapped to monochrome ──────────────────────────
        // Kept so un-migrated pages render in-system until each is hand-finished.
        // `cream` is the live page-background class (BaseLayout html/body), so it
        // tracks `paper`. The near-black + muted text aliases are cooled to match
        // the new cool-slate ink so body copy doesn't stay warm on a cool page.
        cream: '#ffffff', // = paper (page background)
        coral: 'rgb(var(--accent-rgb) / <alpha-value>)', // legacy alias → follows surface like accent
        sunset: '#8A4B2E', // decorative gradient stop (blog cards, testimonial slabs)
        plum: '#1A1B1E',
        navy: '#1A1B1E',
        charcoal: '#1A1B1E',
        sage: '#565760',
        'sage-deep': '#45464C', // Choice checked-state fill
        sky: '#565760',
        lemon: '#EAE7DD', // decorative gradient stop (blog cards, testimonial slabs)
      },
    },
  },
}
