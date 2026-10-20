# Verification

Run `npm run audit:components` to check component reachability from site pages and content. The audit excludes style-guide-only examples, reports unused components and missing imports, and compares production components with the style guide’s index in `src/lib/component-catalogue.ts`. Add or remove an index entry when production usage changes.

Run `npm run check` and `npm run build` for Astro and production validation. Stop the development server before these commands so development and production content caches do not write concurrently. Archived prototypes in `notes/` are excluded from TypeScript checks.

## Unit tests

`npm test` checks the pure class-name helper in `tests/components/cx.test.ts`.

## Browser tests

Run `npm run test:e2e` after building. Playwright uses a running server on port 4321 when available, or starts the production preview. `npx playwright install` installs browsers if they are missing.

- `keyboard.spec.ts` checks existing routes for WCAG 2.1 AA violations, skip-link behavior, and selected navigation and tool interactions at desktop and phone sizes.
- `articles.spec.ts` checks contents navigation, scrolling tables, reading-position tracking, and clipboard feedback.
- `style-guide.spec.ts` checks local form validation and busy feedback, expandable examples and component groups, code copying, artifact-viewer focus restoration, and reduced-motion behavior.

The style-guide form is a local demonstration. Its browser tests do not submit a contact message. Clipboard tests use a mock writer.
