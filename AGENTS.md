# Agent instructions

Personal site of Joshua Briley, built with Astro 5, Tailwind 5, and MDX. `CLAUDE.md` has the full guide (commands, architecture, conventions); this file covers what every coding agent needs before touching the UI.

## Design system

1. **Read `design-system/system.json` before any UI work.** It holds every color, font, and easing token with its CSS variable and Tailwind key, the enforced rules, the guidelines no script can check, and each component with its props and a page that uses it. Regenerate it with `npm run design:context` if it looks stale.
2. **Build from what exists.** Use the listed components and token utilities. Never hardcode a color or font stack; use `accent`, never an accent hex, so it follows the surface.
3. **Verify before you finish:** `npm run audit:design` (blocking), plus `npm run audit:components` when you add or stop using a component.
4. **Don't change the system to pass the audit.** Editing `baseline.json`, adding exceptions, or adding tokens needs the site owner's approval. A new pattern isn't part of the system until it appears on `/style-guide/` and in `src/lib/component-catalogue.ts`.

The human-readable version is `/style-guide/` (run `npm run dev`, then open http://localhost:4321/style-guide/).

## Working here

- Use `npm run dev` for local work; `npm run preview` does not work with the Netlify adapter.
- Case-study and testimonial copy comes from the site owner. Don't invent facts, metrics, or quotes.
