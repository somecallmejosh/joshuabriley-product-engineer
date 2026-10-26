# Design system contract

The Calm system in machine-readable form, plus the check that keeps the code honest to it. Written for people and for coding agents.

| File | What it is |
| --- | --- |
| `tokens.json` | Every color, font and easing in the system, in [W3C Design Tokens](https://www.designtokens.org/) (DTCG) format. Each token names the CSS custom property and Tailwind key that implement it. |
| `rules.json` | The enforced rules (each with *why* and *fix*), component prop policy, documented exceptions, and the guidelines a script can't check. |
| `baseline.json` | Generated. Drift that existed when the check was introduced (2026-10-20), counted per file. It can only shrink. |

`/style-guide/` renders the system; these files define it. `src/styles/site.css` and `tailwind.config.mjs` implement `tokens.json`, and the audit fails if either disagrees with it.

## Before UI work

1. Read `tokens.json` and `rules.json`, including `guidelines`.
2. Build from the primitives (`Heading`, `Text`, `Section`, `Container`, …) and token utilities (`text-ink`, `bg-paper`, `border-line`, `text-accent`, `font-mono`).
3. Run `npm run audit:design` before calling the work done. The pre-commit hook runs it too and blocks the commit on failure.

## When the audit fails

Fix the code. The output gives the file, line, rule and fix, and `rules.json` explains each rule.

**Don't** make the audit pass by editing `baseline.json`, adding an exception, or adding a token. Each of those is a design-system decision, and it needs Josh's explicit go-ahead. `--init-baseline` refuses to run once a baseline exists, and `--update-baseline` only lowers counts.

## Changing the system on purpose

When Josh asks for a new or changed token:

1. Edit `tokens.json`.
2. Make the matching change in `src/styles/site.css` (`:root`) and/or `tailwind.config.mjs` in the same commit. The `token-sync` rule checks both directions, so a Tailwind color with no token also fails.
3. Show it on `/style-guide/` and run `npm run audit:contrast` for any new color pair.

A new exception goes in `rules.json` → `exceptions`, with a `reason` that says why the values are content rather than interface.

## Paying down the backlog

Fix baselined violations in small, reviewable passes, then lock the gains in:

```bash
npm run audit:design -- --update-baseline
```

Some fixes change pixels: `#244c71` (the old `--portfolio-blue`) vs the accent `#2E5C8A`, and the warm near-black `rgb(27,26,23)` vs ink `#1A1B1E`. Check those visually rather than swapping them blind.

## Scope

The audit scans `src/` (`.astro`, `.css`, `.ts`, `.mjs`, `.js`) except `src/content/`, where the MDX articles quote code that shows off-system values on purpose. Block and HTML comments are skipped. Tests for the rule engine are in `tests/components/design-rules.test.ts`.
