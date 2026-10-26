# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal site and portfolio of Joshua Briley (Product Design Engineer). Astro 5 static site, Tailwind 3 + hand-written CSS tokens, MDX content collections, deployed to Netlify on push to `main`. See `README.md` for the full script table and content-authoring rules.

## Commands

```bash
npm run dev                 # astro dev on :4321 — use this for ALL local work
npm run build               # static build to dist/
npm run check               # astro check (TS + content-collection Zod schemas)
npm test                    # Vitest unit tests (tests/components/**/*.test.ts)
npx vitest run tests/components/cx.test.ts         # single unit test file
npm run test:e2e            # Playwright (chromium + mobile-chrome) + axe-core
npx playwright test tests/e2e/code-blocks.spec.ts  # single spec
npx playwright test -g "skip link" --project=chromium   # single test / single project
npm run audit:design        # design-system drift check (blocking; also runs in pre-commit)
npm run audit:components    # component reachability vs. style-guide catalogue
npm run audit:contrast      # WCAG contrast of design-token pairs
npm run audit:style-guide   # live WCAG audit of /style-guide/ (needs dev server)
npm run og:generate         # regenerate OG cards (needs dev server)
npm run resume:pdf          # regenerate public/resume.pdf (needs dev server)
```

- **`npm run preview` does not work** (Netlify adapter). The adapter is only applied outside `dev` (`astro.config.mjs`). Playwright's `webServer` falls back to `npm run preview`, so start `npm run dev` first and Playwright will reuse it. Kill any stale process on :4321 before starting.
- Stop the dev server before `npm run check` / `npm run build` so dev and prod content caches don't write concurrently.
- `notes/` holds archived prototypes and research; it is excluded from TS checks and is not site source.

## Architecture

**Routing & layouts.** File-based routes in `src/pages/`. Every page goes through `src/layouts/BaseLayout.astro` (head, fonts via `<Font>`, header/footer, OG image lookup, global islands like InspectorMode/ViewSource/Lightbox). Specialized layouts wrap it: `BlogPost`, `ProjectLayout` (client case studies in `src/pages/projects/`), `ToolPage`. Moved routes must get a `redirects` entry in `astro.config.mjs`.

**Content collections** (`src/content.config.ts`): `posts` (MDX), `tools` (MDX), `testimonials` (JSON). Each tool essay's `tool` frontmatter names a key of `ISLANDS` in `src/layouts/ToolPage.astro`, which renders the interactive island above the essay via `src/pages/tools/[...slug].astro`. Island logic lives in pure helpers (`src/lib/roi.ts`, `src/lib/scorecard.ts`).

**Data modules in `src/lib/` are single sources of truth shared by multiple consumers:**
- `resume-data.mjs` → both `/resume/` and `/resume-print/` (which `scripts/generate-resume-pdf.mjs` prints to `public/resume.pdf`). Re-run `npm run resume:pdf` after editing it.
- `og-pages.mjs` → both `BaseLayout` (`ogImageForPath`) and `scripts/generate-og.mjs`, which screenshots the dev-only `/og-render/[slug]` route into `public/images/og/`. Routes without an entry fall back to the default card.
- `project-pages.ts`, `project-summaries.ts`, `selected-work.ts` → case-study and listing content.
- `component-catalogue.ts` → the style guide's component index; `audit:components` compares it to actual production usage, so update it when a component starts or stops being used on real pages.

**Git hook.** `.githooks/pre-commit` (enabled by `npm install` via `prepare`) boots a throwaway `astro dev` on :4399 and regenerates + stages OG cards whenever `src/lib/og-pages.mjs`, `src/pages/og-render/`, or `src/content/posts/` is staged. Bypass with `--no-verify`.

**Components** (`src/components/`): `primitives/` → `patterns/` → `layout/`, `chrome/`, `form/`, `islands/` (client-interactive, vanilla TS `<script>`s; no UI framework). Import alias `~/*` → `src/*`.

## Styling system ("Calm")

**The contract is `design-system/`: read `design-system/README.md`, `tokens.json` and `rules.json` (including `guidelines`) before any UI work, and run `npm run audit:design` before calling it done.** The audit fails on hardcoded or off-palette colors, Tailwind default-palette and legacy color classes, arbitrary values outside `src/components/primitives/`, literal font stacks, and deprecated or forbidden component prop values. It also checks that `site.css` and `tailwind.config.mjs` match `tokens.json`. When it fails, fix the code. Never edit `baseline.json`, add exceptions, or add tokens to make it pass; those are design-system changes that need Josh's go-ahead.

- CSS entry: `src/styles/global.css` imports `site.css` (tokens + global classes), `link-motion.css`, `syntax-highlighting.css`, then Tailwind layers. `BaseLayout` also imports `redesign.css`. Page-family sheets: `articles.css`, `projects.css`, `tools.css`, `style-guide.css`.
- Tokens are defined in **both** `site.css` (`:root` CSS vars) and `tailwind.config.mjs`. Legacy token names (`cream`, `coral`, `font-display`, etc.) are deliberately remapped onto the new monochrome system — don't delete them without migrating callers.
- The accent is surface-aware: use `accent` / `var(--accent-rgb)`, never a hardcoded accent hex, so it shifts correctly on ink (dark) surfaces.
- Fonts: Hanken Grotesk (everything; light 300 for display, medium for labels), Geist Mono (code and technical labels inside illustrations only), Style Script (logo wordmark only, via the Logo component). Adding a font requires both the `astro.config.mjs` entry and a `<Font cssVariable>` in `BaseLayout`.
- Page structure uses the shared `calm-*` classes in `redesign.css` (`calm-open`, `calm-label`, `calm-title`, `calm-lede`, `calm-section`, `calm-heading`, `calm-column`, `calm-point`). Separate sections with space, not rules; see `design-system/rules.json` guidelines.
- `site.css` owns global class names (`.measure`, `.prose-whimsy`, …). A scoped Astro `<style>` with the same class name won't override properties it doesn't declare, and scoped styles don't reach DOM created at runtime by scripts — pre-render and toggle instead.
- Accessibility (WCAG AA) is enforced by the audit scripts and the axe-core e2e suite; `--ink-faint` is decoration-only and must not carry text.

## Repo conventions

- `tasks/todo.md` and `tasks/lessons.md` are the working plan/lessons files; review `lessons.md` before visual or content work.
- Case-study and testimonial copy must come from Josh — don't invent facts, metrics, or quotes. Spelling: "Logatot".
- Project-local skills live in `.claude/skills/` (`design-ui-with-restraint`, `write-practical-copy`).
