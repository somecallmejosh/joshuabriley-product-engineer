# Design-system schema + drift guard (2026-10-20)

Goal: a machine-readable spec of the Editorial-Technical system that LLMs read
before UI work, plus a blocking audit so off-system values can't creep in.
Decisions (Josh): blocking check; baseline existing drift, fix later.

## Plan
- [x] `design-system/tokens.json`: DTCG-format tokens (color, fontFamily, cubicBezier) mapped to CSS var + Tailwind key; legacy aliases deprecated with `replaceWith`
- [x] `design-system/rules.json`: rule catalogue (id, why, fix), component prop policy, path allowlists, documented exceptions, non-automatable guidelines
- [x] `scripts/lib/design-rules.mjs`: pure rule engine
- [x] `scripts/audit-design-system.mjs`: scan src/ (excl. src/content), token sync (site.css + tailwind ↔ tokens.json, both directions), baseline compare; `--init-baseline` once, `--update-baseline` ratchets down only
- [x] `design-system/baseline.json`: today's violations per file/rule/value
- [x] Unit tests `tests/components/design-rules.test.ts`
- [x] `npm run audit:design`; pre-commit hook runs it when src/, tailwind config, or design-system/ is staged
- [x] `design-system/README.md` + CLAUDE.md pointer
- [x] Verify: tests, audit passes clean, injected violation fails, hook blocks, `npm run check`

## Review
- 391 existing violations baselined across 41 files (222 off-palette, 118 arbitrary, 35 hardcoded token, 8 default palette, 7 legacy class, 1 font-family). Zero legacy/forbidden prop values in use.
- Verified: 17 unit tests; audit passes clean; probe file with 5 violations fails with line + fix; pre-commit hook exits 1 on it; re-running --init-baseline refused; `astro check` 0 errors.
- Exceptions proposed (need Josh's OK): TokenPlayground demo palette, wireframe-kit + wires-and-flows/_src artwork, syntax-highlighting.css.
- Not done: Netlify build doesn't run the audit (only pre-commit); Tailwind default palette still compiles (could drop via theme.colors once backlog clears).

# Site-wide content audit (2026-07-27)

Full-project scan for factual inconsistencies and LLM writing patterns.

## Applied
- [x] Drop NASCAR + NFL from the homepage "Shipped at" strip (unsourced anywhere in repo)
- [x] Align the homepage project `kind` labels to the vocabulary `projects.astro:14` declares
- [x] Rewrite the homepage Logatot line (gerund cargo phrasing, repeated the client name)
- [x] Reframe `audit-findings.mdx` from a sold service to the method behind the work
- [x] Correct six stale facts in README (title, case studies, personal projects, `content.config.ts` path, tools collection, tools location)
- [x] Remove the duplicate H1 in `web-component-libraries-in-the-ai-era.mdx` and the duplicate H2 in `future-proofing-front-end-dev-roles.mdx`
- [x] Blog titles to sentence case; hyphenate "Future-proofing"; terminal periods on descriptions
- [x] `readMinutes: 19` → `8` on the 1,345-word adoption spec
- [x] De-LLM the two research posts (triads, not-X-but-Y, "most profound shift", holistic/seamless/robust)
- [x] Drop needless acronym expansions (DOM, JSON, CLI) for a front-end audience
- [x] "Astro.js" → "Astro"; LinkedIn URL trailing slash; Privacy/Terms title case
- [x] Replace five "Click below" instructions in `ScorecardEngine.astro`

## Open (needs Josh)
- [ ] Em dash policy (49 in shipped prose: 40 in `src/pages`, 2 in `src/content`, 7 in README) — not decided, left untouched
- [ ] British vs American spelling (`colour` ×34, `modelled`, `behaviour`, `centre`) — not decided, left untouched
- [ ] Testimonial names: `12-adam-czerepinsky.json` displays "Czerepinkski"; `14-michael-peritore.json` displays "Pertiore". Filename + image path disagree with the `name` field in both
- [ ] `astro.config.mjs:26-27` redirects `/projects/clempo` and `/projects/bass-face` to pages that don't exist
- [ ] Homepage `3 → 1 brands` metric is real but its only source is the unpublished `notes/americas-test-kitchen.astro`
- [ ] ROI table rows in `roi-calculator.mdx` don't reproduce from one set of stated inputs
- [ ] "Design System Scorecard" in `the-hidden-cost-of-component-inconsistency.mdx` describes a different tool than `/tools/scorecard/`
- [ ] `IVFCRYO` (22×) vs `IVFCryo` (8×); `Logatot` vs `LogATot, Inc.` in `resume.astro:34`
- [ ] "20 years" site-wide vs "20+ years" twice in `resume.astro`
- [x] ~~Changing `resume.astro` desyncs `public/resume.pdf`~~ FIXED 2026-08-03: both now read `src/lib/resume-data.mjs`; `npm run resume:pdf` regenerates the PDF from `/resume-print/`. `notes/resume.md` retired to a pointer.

---

# VMSpark design artifacts → shared standard

## Plan
- [x] Extract the shared machinery into `src/assets/wireframe-kit/`
- [x] Verify Logatot's 15 sheets still render byte-identical after the extraction
- [x] Write a VMSpark `theme.css` (high-fidelity colour) + authoring note
- [x] Prove one screen sheet and one flow sheet before fanning out
- [x] Rebuild the remaining 14 sheets against the template
- [x] Sketch + lo-fi wireframe SVGs for the 4 key screens
- [x] Add a "Screens and flows" section to `vmspark.astro` (it had none)
- [x] Remove the stale `public/` duplicates and dead `render.sh`

## The call that shaped this
VMSpark's sheets were **high-fidelity colour**; IVFCRYO and Logatot are lo-fi
greyscale. Converting would have deleted the evidence this case study rests on —
it is specifically about visual-system work (8+ button styles, 10+ form-element
styles, 6+ table conventions, ~40 views bypassing the token system).

So only the **annotation layer** was standardised: white sheet, brand/kind mark,
prose callouts in a right gutter on dashed rust leader lines. The artwork keeps
the product's own language, and callout discs stay rust rather than VMSpark blue
so commentary never reads as part of the thing it describes.

That gives VMSpark a better fidelity ladder than Logatot's: sketch → lo-fi
greyscale wireframe → **annotated colour**, where the colour pass is the payoff.

## Why a shared kit
`sheet.js`, `flow.js`, `sketchify.mjs` and `render.mjs` are entirely
project-agnostic and had already absorbed six bug fixes during the Logatot work.
Copying them into VMSpark would have meant fixing everything twice. They now
live in `src/assets/wireframe-kit/`; each project supplies only a `theme.css`.
Logatot's 15 sheets were rewired and re-render byte-identical.

## Kit improvements this round drove
Each was reported independently by two or more sheet authors, which is the bar
used for promoting anything:

- `flow.js` gained an `offset` option — a loop-back edge leaving and re-entering
  the same side of a column turned at the midpoint of two identical x values,
  i.e. exactly on the column border, through the left vertex of every diamond it
  passed.
- `sketchify.mjs` gained occlusion — it dropped rect fills, so an overlay panel
  did not cover what was behind it and grid rows ghosted through the inspector's
  JSON column.
- `flow.js` layout now positions `.lane` / `.band`, for flows split into an
  operator band and a system band.
- `AUTHORING.md` documents three traps found only by rendering: branch diamonds
  cap at ~200px of label, an edge between two column-1 nodes that skips rows
  draws through whatever sits between, and sheet-local class names must be
  prefixed (a bare `.kind` reaches up into the title band; `.ph` collided with
  the theme's placeholder modifier).

## Review
All 16 VMSpark sheets render at 3200px, renderer exits 0. Four sketch/wireframe
pairs generate clean. Logatot's 15 still render identically. `astro build`
passes and the plate was verified in-browser.

One real bug caught at build inspection: the five flow diagrams were mounted
through `ScrollShot`, which takes a string path and therefore bypasses Astro's
image pipeline — that served five full-size PNGs with no `srcset` and no webp.
Replaced with a local `.flow-sheet` mount using `<Image>`; all 16 images now go
through the CDN transform, matching Logatot.

Not done, deliberately: sketch/wireframe passes cover the 4 mounted screens
only. Sheet-local CSS that only one sheet needed (overlay dialog, resolution
card, stepper, month grid) stayed scoped rather than being promoted.

---

# Logatot design artifacts → IVFCRYO standard

## Plan
- [x] Establish the IVFCRYO standard precisely (sample palette, measure geometry)
- [x] Build a shared sheet template: stylesheet, callout/leader-line layer, renderer
- [x] Build a flow-diagram engine (5 of the 15 sheets are flows)
- [x] Prove both templates on one screen sheet and one flow sheet before fanning out
- [x] Rebuild the remaining 13 sheets against the template
- [x] Author clean wireframe SVGs for the 4 key screens
- [x] Derive the sketch SVGs from those wireframes
- [x] Mount the 4 key screens in `FidelityPlate` on `logatot.astro`
- [x] Document the pipeline (README, `_src/AUTHORING.md`)

## What the gap actually was
The two standards differed in more than styling. IVFCRYO puts annotations in a
right-hand gutter on dashed rust leader lines, white sheet, brand/kind mark.
Logatot had them in a two-column block *below* the artwork, warm grey, amber
markers, page-numbered footer — and no sketch/wireframe passes at all, so the
page used a bespoke `sheet-plate` where IVFCRYO used `FidelityPlate`.

Both projects' `_src/` HTML had been deleted; only rendered PNGs survived, and
`render.js` pointed at a `_src` that no longer existed and wanted `puppeteer-core`
(not installed — the project has Playwright). So the 15 sheets were re-authored
rather than restyled, and the renderer was ported.

Callout copy moved from bold lead-in labels to IVFCRYO's plain prose. Flows were
converted from swimlanes to the top-down chart idiom.

## Decisions
- **Geometry is derived, not authored.** Callout placement, de-overlap, disc
  numbering and leader routing are computed after layout, so fifteen sheets
  cannot drift. Discs number by vertical position, so they always read 1..n down
  the page regardless of authoring order.
- **The renderer fails loudly** — a callout with no matching anchor exits
  non-zero, so an unattached leader line cannot ship.
- **Sketches are generated from the wireframes.** A sketch that disagrees with
  its wireframe reads as two unrelated pictures. Jitter is seeded from element
  geometry, so re-running is byte-identical and does not churn git.

## Bugs found by rendering and looking
- Gutter positioned in page coords but resolved inside the padded body — whole
  callout column sat 40px right of IVFCRYO's.
- Sketch element regex used a lazy body group that matched empty, truncating
  every label to its first character.
- Flow edge labels drew into the wire layer *behind* the node divs, so an
  overrunning label vanished silently instead of showing a collision.
- Leader elbow could overshoot past its disc on full-bleed artwork; now clamped
  both sides, with `--art-w` reserving the margin the jog needs.
- Sketch derivation dropped dashed strokes and solid fills, losing
  placeholder/optional and active/selected state.
- Greeked copy bars came out as hollow boxes; now struck as scribbled strokes,
  which is what actually makes them read as sketches.

## Review
All 15 sheets render at 3200px, renderer exits 0. Four sketch/wireframe pairs
generate clean. `astro build` passes, all eight SVGs ship, and the plate was
verified in-browser (tab rail switches, sketch renders, spec rail updates).

Scoped deliberately: sketch/wireframe passes exist for the 4 mounted screens
only, matching IVFCRYO (which built 12 pairs but mounts 4). The other 11 remain
annotated-only in the rest-of-system grid.

Left alone on purpose: several sheets carry bespoke scoped CSS (timeline rail,
month grid, printed page, audio transport) — genuinely one-sheet things. Only
the primitives three or more sheets reinvented (flow-legend keys for the exit
stadium and dashed system step) were promoted to `sheet.css` with the local
copies removed. Retrofitting the rest meant re-verifying eleven renders for no
visual gain.

---

# Dead-code removal — get tech debt to ~zero

## Plan
- [ ] Delete 4 dead files (hero-motion.ts, BrandSwitcher, StatusAnnouncer, TokenChain)
- [ ] Remove `gsap` dependency (only consumer was hero-motion.ts) + refresh lockfile
- [ ] Delete dead functions: encodeRatings, emptyRatings (scorecard.ts); formatCompactCurrency (roi.ts)
- [ ] Narrow 9 internal-only exports (drop `export`): ScorecardItem, sectionComplete, RoiResult,
      WEEKS_PER_YEAR, RECLAIM_BY_LEVEL, SURFACE_DRAG, SURFACE_DRAG_CAP, normalize, lastWord
- [ ] Delete obsolete tests/components/tones.test.ts (tests removed `toneStyles`)
- [ ] Gate: `npm run build` + `npm run test` green

## Review
Done. ~1,232 lines removed across 10 files; build + `npm run test` (3/3) green.

- Deleted 4 dead files: hero-motion.ts, BrandSwitcher, StatusAnnouncer, TokenChain (never imported).
- Removed `gsap` dependency (its only consumer was hero-motion.ts) + refreshed lockfile.
- Deleted dead functions: encodeRatings, emptyRatings (scorecard.ts); formatCompactCurrency (roi.ts).
- Narrowed 9 internal-only exports to module-private (ScorecardItem, sectionComplete, RoiResult,
  WEEKS_PER_YEAR, RECLAIM_BY_LEVEL, SURFACE_DRAG, SURFACE_DRAG_CAP, normalize, lastWord).
- Deleted obsolete tests/components/tones.test.ts (tested `toneStyles`, deliberately removed earlier;
  this was the failing test in the baseline).

Verified NOT dead (left untouched): all public/ assets — OG images are referenced via computed
paths in og-pages.mjs; social banners + robots.txt are served/linked externally. All other deps,
scripts (scroll-reveal, whimsy, contact-form), and components are in use.

Note: `astro check` crashes with a `@astrojs/compiler` wasm error (unrelated to our code);
`astro build` is the reliable gate and passes.

---

# Give the interactive tools their own home at /tools/

Four of seven blog posts were interactive tools wrapped in framing prose. The blog
index never branched on `interactive: true`, so nothing marked them as runnable
software. Moved them to a real `/tools/` section.

- [x] Add a `tools` content collection (`src/content.config.ts`) with `tool`, `kind`,
      `order`, `takeaway`, `props`, `instructions`
- [x] Move the 4 MDX files to `src/content/tools/` at their original slugs
- [x] New `src/layouts/ToolPage.astro` + `src/pages/tools/[...slug].astro`
- [x] New `src/pages/tools/index.astro` (hairline bento, 4 items -> 4 cells)
- [x] Add Tools to `PRIMARY_NAV` + footer (`src/lib/nav.ts`)
- [x] Replace the buried tool mention on the home page with a real ink Tools band
- [x] Reverse the blog-era redirects in `astro.config.mjs`; fix results.astro links
- [x] Blog index pointer to /tools/

## Review

Done. Build green, `npm run test` 3/3 green.

**Reverses an earlier decision.** `astro.config.mjs` had `/tools/* -> /blog/*` redirects
("The interactive tools were repurposed as blog posts"); the four tool entries were
already commented out when this started. Redirects now run the other way, so blog-era
URLs are preserved.

**The `instructions` frontmatter field is the load-bearing bit.** On a tool page the
island leads and the essay follows, which inverts the blog order. Three of the four
essays used deictic copy ("the exhibits below", "the playground below", "each number
on the right"). Pulling the how-to-drive-it paragraph into frontmatter puts it directly
above the island, so no copy points at something the reader already scrolled past. The
remaining prose was edited for the new order.

**Widths match the old embed exactly.** `.tool-stage` is `min(72rem, 94vw)`, the same
breakout `.post-tool` had inside `.prose-interactive` (BlogPost.astro), so the islands
render identically to before the move. Measured at 1152px.

Verified: all 4 tool pages render island + essay; bento is 4 cells with no empty area
(featured 820x656, three stacked 409-wide totalling 654); nav stays one line at 1024 /
1280 / 1536 with `aria-current` correct on child routes; scorecard round-trip works
end to end (32 questions -> 64/64 -> results verdict -> retake with `?r=` prefill ->
32 answered restored); invalid `?r=` bounces to `/tools/scorecard/` not the old blog
URL; blog is 3 rows plus the pointer; zero em-dashes in new files.

Not done, deliberately: the duplicated button-class constants in results.astro:606-615
and the ~1.5KB of scorecard prose living in that page's script tag. Both are real debt
and this was the natural moment, but folding them in would have made the diff
unreviewable. Left `InspectorMode` alone (konami easter egg, not a tool).

`astro check` still crashes on the pre-existing `@astrojs/compiler` wasm error in
FAQ.astro (untouched); `astro build` remains the gate.

### Follow-up: threshold framing on the ROI calculator

A total with no threshold beside it is not actionable. Added a "When the number
starts to matter" section to `src/content/tools/roi-calculator.mdx`, between the
tool and "Defensible beats dramatic".

Every figure in it was computed by running `computeRoi` from `src/lib/roi.ts` at
each team shape, not estimated. The reframe is hours rather than dollars: divide
recovered hours by 40 and you get weeks of one person's time, which is the only
figure comparable against what building the system would cost.

| Shape | Recovered/yr | Source |
| 2 people, 1 surface, 1h/wk, low | 18 hrs (~0.5 wk) | low reclaim 20%, no surface drag |
| 6 people, 2 surfaces, 3h/wk, med | 348 hrs (~8.7 wk) | 42% after 1 surface of drag |
| 12 people, 4 surfaces, 4h/wk, med | 1016 hrs (~25 wk) | 46% |
| 40 people, 8 surfaces, 4h/wk, high | 5962 hrs (~149 wk) | 81%, near the 85% cap |

The section says plainly that at the small end the right answer is to do nothing.
Point being made: enterprise teams end up with design systems and small studios do
not because of arithmetic, not sophistication.

Also fixed: `.tool-stage` was `min(72rem, 94vw)`, copied from `.post-tool`, which
needed viewport units to break out of a narrow prose column with negative margins.
`.tool-stage` already sits in a wide padded container, so 94vw overhung the
container padding by a sub-pixel and gave all four tool pages a 1px horizontal
overflow at 390px. Now `min(72rem, 100%)`. Desktop width still measures 1152px.

### Follow-up: bento hover was too dark, and link text was not descriptive

**Hover.** The `/tools/` bento cells used the site-standard `hover:bg-ink/[0.02]`,
the same class the blog and personal-projects rows use, but rendered visibly darker.
Cause: those rows have no background of their own, so the 2% ink composites over the
section's paper. The bento cells carry an opaque `bg-paper` and sit on a `bg-line`
grid, so the hover class REPLACED the paper and exposed the grey grid gap beneath.

Measured, sampling real pixels:

| Surface | rest | hover (before) | hover (after) |
| ------- | ---- | -------------- | ------------- |
| Blog row | rgb(250,251,252) | rgb(246,247,248) | unchanged |
| Personal-projects row | rgb(250,251,252) | rgb(246,247,248) | unchanged |
| Tools bento cell | rgb(250,251,252) | ~rgb(225,227,231) | rgb(246,247,248) |

Fixed with a scoped `.tool-cell` that keeps the cell opaque and mixes the tint into
paper (`color-mix(in srgb, var(--ink) 2%, var(--paper))`), landing on exactly the
colour the other rows composite to. `color-mix` was already in use in
TokenPlayground.astro, so this is in-system.

Checked the other `gap-px bg-line` grids (about.astro, index.astro, style-guide):
their cells are divs with no hover, so none had the bug. Unique to /tools/ because
it is the only hairline bento whose cells are links.

**Link text.** Three of the four cells said just "Open", which is weak copy and bad
for screen-reader users navigating by link text alone (three identical links).
Added a required `action` field to the tools schema, verb-first and specific:

- scorecard: Take the assessment
- roi-calculator: Run your numbers
- token-playground: Move a token
- audit-findings: Inspect a specimen

Also removed the derived `Open the {kind.toLowerCase()}` string on the featured cell,
which produced the awkward "Open the self-assessment".

Note: changing the collection schema requires a dev-server restart (or `rm -rf .astro`)
before the new field appears in rendered output. The content layer caches parsed
frontmatter and does not re-sync on schema edits alone.

---

# Home + about consistency pass against the case studies (2026-08-03)

Reference pages (source of truth): `projects/ivfcryo.astro`, `projects/logatot.astro`,
`projects/vmspark.astro`, plus `projects.astro` (the hub whose per-project notes
the home page has to agree with). Mode: redesign-preserve. No IA, slug, nav, or
brand-token changes. Dials held at the site's existing reading (variance 6,
motion 3, density 4).

## Applied

### Factual conflicts
- [x] Home metrics: `3 → 1 brands` (America's Test Kitchen) sat in a section
      whose three links are IVFCRYO / VMSpark / Logatot. Replaced all three with
      one number per linked case study, so every figure is click-through
      verifiable. Closes the older open item at line 24 of the July audit: the
      ATK number is real but its only source is unpublished, so it belongs on
      the resume, not in a band of case-study links.
- [x] Home IVFCRYO one-liner said "Accessibility was the mechanism that moved
      the numbers." The case study's thesis is the five-party readiness gate.
      Rewritten to match.
- [x] Home work order (IVFCRYO, Logatot, VMSpark) disagreed with `projects.astro`
      (IVFCRYO 01, VMSpark 02, Logatot 03). Home reordered to match.
- [x] `projects.astro` IVFCRYO summary claimed he "built the Rails domain and the
      carrier, telemetry, and alerting services underneath it." The case study is
      emphatic that engineering owned the Rails/Postgres implementation and he
      partnered on it. Corrected to the case study's own wording.
- [x] `ivfcryo.astro` mixed `IVFCRYO` (11x) and `IVFCryo` (7x) within one page,
      while every other file on the site uses `IVFCRYO`. Normalized to 18x
      `IVFCRYO`. Closes part of the July open item at line 27 (the `Logatot` vs
      `LogATot, Inc.` half is still open in `resume.astro`).
- [x] Home "Four working instruments" hardcoded against the tools collection.
      Now derived from `tools.length`.

### Dead code / false comments
- [x] Home `clients` array declared, never rendered. Removed.
- [x] Home hero comment claimed a "Shipped at" credentials strip carried the
      proof; the strip below renders capability chips. Comment corrected.
- [x] `about.astro` imported `Link`, never used it. Removed.
- [x] Home `<style>` block re-declared `.hero-in`, its delay steps, and the
      reduced-motion guard, all already global in `site.css` (which also defines
      `-5`). Removed, and the stale site.css comment pointing at it corrected.

### Style drift on identical elements
- [x] Home hand-rolled its metric figure in `font-serif` (Fraunces); the
      `<Metric>` component the case studies use renders figures in
      `font-display` (Hanken). Home now matches Metric's figure/label/caption
      typography exactly, in paper rather than ink for the dark surface.
- [x] Capability chips: home and about rendered the same strip with different
      items and different phrasing. Unified to one four-item list, declared in
      each page's frontmatter.
- [x] Portfolio-intent CTA had three labels ("See what I've built", "See the
      work", "View all projects"). Both hero CTAs are now "See the work";
      "View all projects" kept as the list-overflow link, matching the case
      studies' "Back to all projects".
- [x] `about.astro` ink CTA was missing `js-magnetic`, which every other primary
      CTA on the site carries. Added.

### Copy
- [x] `about.astro` ran "the empty states, the keyboard paths, the screen that
      shows when there's nothing to show yet" verbatim in the hero and again in
      the pull quote one section later. Hero paragraph rewritten to carry range
      instead, leaving the formulation to land once.
- [x] `about.astro` described Rudiment UI two ways on one page ("open-source
      sandbox for accessible component primitives" vs "open-source library").
      Both aligned to `personal-projects/rudiment-ui.astro`: "open-source React
      component library".

### Responsive
- [x] Home selected-work metrics used `grid-cols-3` at every width, including
      320px. Now `grid-cols-1 sm:grid-cols-3`.

## Deliberate no-change
- The resume secondary link and primary-CTA icon differ between the marketing
  family (`index`, `about`, `projects`, `personal-projects`: mono micro-link,
  arrow-right) and the case-study family (`ivfcryo`, `logatot`, `vmspark`: sans
  link, envelope-left). Each family is internally consistent; flipping either
  creates more drift than it removes. Left alone.

## Decided
- The home page no longer shows any client credibility. The `clients` array
  (Travelers, Berkshire Hathaway, America's Test Kitchen) was dead code, and the
  hero comment showed a "Shipped at" strip was once intended there. Josh's call
  (2026-08-03): **do not build the "Shipped at" strip.** Closed, not deferred.
  The capability chips and the case-study numbers carry the proof instead.

## Review
`npm run build` clean; rendered output verified in `dist/` for the metric
typography, work order, derived tool count, matched capability chips, and the
IVFCRYO casing. `npx astro check` crashes in the compiler WASM on
`components/patterns/FAQ.astro` — pre-existing, unrelated to these edits.

---

# Resume rewrite + PDF pipeline (2026-08-03)

Ask: much less verbose introduction; job bullets that read as benefits to the
company rather than tech-stack descriptions.

## Content
- [x] Summary cut from 95 words / 3 long sentences to 41 words. Drops the
      process narration ("framing ambiguous problems, prototyping directly in
      code, validating with real users and behavioral data..."), keeps the
      positioning and the Travelers scale proof.
- [x] Every bullet across all six roles rewritten to lead with what the company
      got. Tech moved to the per-job `stack` line and `SKILLS`, so the keyword
      surface is unchanged for ATS and skim-readers.
- [x] Added Gatsby to the toolkit. It was named in the old Travelers bullet and
      would otherwise have been lost when that bullet became a benefit.
- [x] Added VMSpark to the freelance bullets. Real client with a published case
      study and a testimonial, previously absent from the resume entirely.
- [x] Freelance bullets now carry the numbers the case studies substantiate
      (75% / 55% for IVFCRYO, zero pipeline regressions for VMSpark).

## Pipeline (fixes the long-standing desync)
- [x] `src/lib/resume-data.mjs` is now the single source of truth.
- [x] `src/pages/resume-print/[...path].astro`: letter-format print document,
      bare + noindex, dev-only via `getStaticPaths` (same guard as og-render, so
      it never ships to dist). Excluded from the sitemap and robots.txt.
- [x] `scripts/generate-resume-pdf.mjs` + `npm run resume:pdf`, following the
      `generate-og.mjs` pattern (Playwright against a running `astro dev`).
- [x] `resume.astro` now imports the shared data instead of inlining 107 lines
      of it.
- [x] `notes/resume.md` retired to a pointer at the new source, with the
      regeneration steps and the bullet house rule.

## Print-specific bugs found and fixed
- [x] The layout's screen affordances (skip link, inspector toast, view-source
      chip, lightbox scaffold) are siblings of `<main>` and printed as a stray
      grey block at the foot of page 2. Hidden in the print route.
- [x] Site's warm paper background forced to white for print stock.
- [x] Masthead title was wrapping to a stranded "Developer"; widened to hold one
      line.
- [x] `break-inside: avoid` on jobs, strengths, and toolkit rows so a role never
      splits across sheets; `break-after: avoid` on section rules.

## Review
Regenerated: 2 pages, letter, 218 KB. Both pages inspected as images. `npm run
build` clean, `/resume-print/` absent from `dist/` and the sitemap, `/resume/`
renders the new bullets.

## Note
`LogATot, Inc.` (resume) vs `Logatot` (case study) is left as-is: the resume
lists the incorporated employer, the case study names the product. Still open in
the July audit list as a naming inconsistency if Josh wants them unified.

---

# Tools CTA aligned to the site pattern (2026-08-03)

`CTABanner.astro` was the only CTA on the site rendering as a centered paper
card (`rounded-xl border border-line bg-raised`, `text-center`, `mx-auto`) on a
`tone="paper"` section. Every other closing CTA is a full-bleed
`tone="ink" padding="loose"` band, left-aligned, no card. Its only consumers
were the tools pages, so the tools were the only pages ending differently.

- [x] Rewrote `CTABanner.astro` to the canonical shape: ink surface, left
      aligned, `mono-label !text-paper/65` eyebrow, `display-lg` heading in
      paper, `whiteMuted` lead, `mt-8 flex flex-col items-start gap-4
      sm:flex-row sm:items-center` button row.
- [x] Dropped the now-meaningless `align` prop (neither call site passed it).
- [x] Fixed both call sites' button variants for the dark surface:
      `primary` → `navy`, `ghost` → `secondary`. `ghost` is `text-ink` and would
      have been near-invisible on ink. Added the missing `size="lg"` on the
      scorecard results buttons so they match every other CTA.
- [x] Removed the unused `CTABanner` import from `tools/index.astro` (that page
      closes with its own ink "Why these are here" band, not a CTA).

Verified: build clean, old card markup absent from `dist/`, and the tool CTA
screenshotted beside the IVFCRYO CTA at 1280px. Identical treatment.

---

# Resume PDF: borderless, type-only (2026-08-03)

Ask: remove all borders and background colors from `public/resume.pdf`; let the
font do the design work; use the site's fonts.

- [x] Removed every `border-*` and decorative `background` from the print route.
      Only remaining background is `html, body { background: #fff }`, which is
      paper, not decoration: without it the site's surface tokens invert under
      `prefers-color-scheme: dark` and the resume prints white-on-black.
- [x] Bullet markers were `background: #a8412a` squares on `::before`. Now real
      `list-style: disc` with a muted `::marker`, so the marker is drawn by the
      font.
- [x] Type now matches the site's three faces in their site roles: Newsreader
      (`--font-fraunces`) for the name, Hanken Grotesk (`--font-hanken`) for
      body, Geist Mono (`--font-geist-mono`) for the uppercase labels (contact
      block, section labels, periods, stack, toolkit groups). Previously the
      whole document was Hanken.
- [x] With the hairlines gone, hierarchy is spacing + scale + the accent mono
      section label. Section labels get much more space above than below so they
      group with the content beneath rather than floating between blocks.

## Bug found
- [x] Section headings were `class="rule"`. `site.css:196` already owns `.rule`
      as a 1px hairline with `background: var(--line)`. Astro's scoped styles do
      not override properties they don't declare, so every section heading
      printed with a grey bar behind it. Renamed to `.section-label`. Caught by
      dumping `getComputedStyle` for borders/backgrounds across `.doc *` in a
      headless browser, not by reading the CSS.

Verified: `getComputedStyle` reports zero borders and zero backgrounds inside
`.doc`; regenerated at 2 pages, letter, 211 KB; both pages inspected as images.

---

# Project case-study pages: redesign around the artwork

Ask: minimize clicks to see all visual assets; comfortable on the eyes; minimize
cognitive load. Applies to `ivfcryo`, `logatot`, `vmspark`.

## Diagnosis (measured, not assumed)

| | ivfcryo | logatot | vmspark |
|---|---|---|---|
| Interactions to see every asset | ~44 | ~56 | ~58 |
| Tab clicks hiding artifacts | 8 | 8 | 8 |
| Lightbox open/close round-trips | 18 | 24 | 25 |
| Nested scroll traps | 3 | 4 | 7 |

Root cause: artwork was laid out on the prose grid. Sheets are 3200px wide; in
`case-layout__body` they rendered at ~680px = **19% of source**, which cannot
show a callout, so the lightbox was the only way to read anything. Verified the
same sheet at 1320px (41%) reads cleanly, which set the target width.

## Done

- [x] `Plate.astro` — one artifact primitive replacing five bespoke treatments
      (`fplate`, `flow-plate`, `sheet-plate`, `flow-sheet`, `rest-shot`).
      Natural aspect, no max-height, no overflow, no fade, no scroll cue.
      `band` (1230px) and `half` (598px) tracks.
- [x] `FidelityBand.astro` — sketch → wireframe → annotated shown ONCE per page
      in a 1fr/1fr/2fr ramp. Replaced the tab rail that repeated 4x per page and
      hid 8 artifacts behind clicks.
- [x] Plates moved out of `case-layout` into sibling `<Container width="wide">`.
- [x] `ScrollShot` converted from internal scrollbar to expand-in-place.
- [x] Rest-of-system grids: 4:3 crops behind modals → whole sheets, two-up.
- [x] `FidelityPlate.astro` deleted; all page-scoped plate CSS deleted.

## Bugs found and fixed during the work

- [x] **Sticky rail painted over the plates.** First attempt put plates inside
      `.case-layout` as a `1 / -1` grid item. A sticky grid item is constrained
      by the grid *container*, not its own grid area, so the section rail stayed
      pinned on top of the artwork all the way down it. `grid-row: 1` does not
      fix it. Fixed by keeping plates out of the grid entirely (sibling
      Containers), which also removed the need for any custom width math.
- [x] **Caption bottom-align silently did nothing.** `.fband__label
      { margin-top: auto }` sat inside a `@media` block placed *before* the base
      `.fband__label` rule. Both score 0-1-0 and a media query adds no
      specificity, so source order decided it and the base rule won. Same family
      of trap as the `.rule` collision noted above: it is not always a global-vs-
      scoped conflict, sometimes it is just order.
- [x] **`.plate__index` failed WCAG AA at 2.69:1** — `--ink-faint` (#9a9aa1) on
      paper. Inherited from the old plate chrome, and there are far more of these
      labels now. Moved to `--ink-muted`. Same fix applied to
      `.scroll-shot-index` / `.scroll-shot-kind`.

## Result

| | ivfcryo | logatot | vmspark |
|---|---|---|---|
| Clicks required to see every asset | 0 | 0 | 4 |
| Nested scroll traps | 0 | 0 | 0 |
| `role="tab"` buttons | 0 | 0 | 0 |
| Sheet render width | 1230px | 1230px | 1230px |
| Page height | 20.6k → 26.4k | 22.2k → 29.5k | 21.8k → 32.2k |

vmspark's 4 clicks are the style-guide full-page captures (up to 1600x11531,
a 7:1 ratio) which cannot render whole; they expand in place rather than trap
the scroll. Pages are 29-48% longer: that is the trade for removing ~150
interactions across the three. If it reads long, the lever is the `size` prop
per call site, not a return to cropping.

Verified: `npm run build` clean; `npm test` 3/3; `npm run test:e2e` 26/26;
`npm run audit:contrast` 0 fail; axe WCAG 2.1 AA shows **0 violations in the new
components** on all three pages (remaining 1-3 are pre-existing site-wide
elements also present on the untouched `/projects/` control). No horizontal
scroll at 390/768/1440. Reduced-motion expand/collapse round-trips cleanly.
Lightbox still traps focus and restores it to the opener on Escape.

Note: `astro check` crashes in the WASM compiler on `src/components/patterns/
FAQ.astro`, an untouched file. Pre-existing, not caused by this work.
