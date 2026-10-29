# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: keyboard.spec.ts >> page /blog/future-proofing-front-end-dev-roles/ >> axe-core scan reports no WCAG 2.1 AA violations
- Location: tests/e2e/keyboard.spec.ts:50:5

# Error details

```
Error: /blog/future-proofing-front-end-dev-roles/ did not return 200

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Joshua Briley" [ref=e5] [cursor=pointer]:
        - /url: /
        - text: JoshuaBriley
        - generic [ref=e6]: .
      - generic [ref=e7]:
        - navigation "Primary" [ref=e8]:
          - list [ref=e9]:
            - listitem [ref=e10]:
              - button "Work" [ref=e11] [cursor=pointer]:
                - text: Work
                - img [ref=e12]
            - listitem [ref=e14]:
              - button "About" [ref=e15] [cursor=pointer]:
                - text: About
                - img [ref=e16]
            - listitem [ref=e18]:
              - button "Writing" [ref=e19] [cursor=pointer]:
                - text: Writing
                - img [ref=e20]
        - link "Contact me" [ref=e22] [cursor=pointer]:
          - /url: /contact/
          - text: Contact me
          - img [ref=e23]
  - main [ref=e25]:
    - generic [ref=e28]:
      - generic [ref=e29]:
        - figure [ref=e30]:
          - generic [ref=e31]: "404"
          - generic [ref=e32]: This 404 fails contrast on purpose.
        - heading "This page took an unplanned detour." [level=1] [ref=e33]:
          - text: This page took an
          - emphasis [ref=e34]: unplanned detour.
        - paragraph [ref=e35]: Maybe it was renamed, maybe it's a typo, or maybe it drifted out of the system and nobody wrote it down. Either way, here are a few good places to land.
        - list [ref=e36]:
          - listitem [ref=e37]:
            - link "Home" [ref=e38] [cursor=pointer]:
              - /url: /
              - text: Home
              - generic [ref=e39]: →
          - listitem [ref=e40]:
            - link "Selected work" [ref=e41] [cursor=pointer]:
              - /url: /projects/
              - text: Selected work
              - generic [ref=e42]: →
          - listitem [ref=e43]:
            - link "Contact" [ref=e44] [cursor=pointer]:
              - /url: /contact/
              - text: Contact
              - generic [ref=e45]: →
        - paragraph [ref=e46]:
          - text: Broken link?
          - link "Let me know" [ref=e47] [cursor=pointer]:
            - /url: /contact/
            - text: Let me know
            - generic [ref=e48]: ↗
      - 'region "While you''re here: pass or fail?" [ref=e49]':
        - 'heading "While you''re here: pass or fail?" [level=2] [ref=e50]'
        - paragraph [ref=e51]: Does this text pass WCAG AA? Body text needs a contrast ratio of at least 4.5:1. Every sample is one of this site's own colors, faded a little.
        - generic [ref=e52]:
          - generic [ref=e53]: Round 1 of 10
          - generic [ref=e54]: Score 0
        - 'img "Sample 1: \"This page wandered off.\" in paper at 39% strength on a ink background." [ref=e56]':
          - generic [ref=e57]: This page wandered off.
        - generic [ref=e59]:
          - button "Passes AA" [ref=e60] [cursor=pointer]
          - button "Fails AA" [ref=e61] [cursor=pointer]
        - paragraph [ref=e62]
  - contentinfo [ref=e63]:
    - generic [ref=e64]:
      - generic [ref=e65]:
        - generic [ref=e66]:
          - paragraph [ref=e67]:
            - term [ref=e68]: product design engineer
          - paragraph [ref=e69]:
            - generic [ref=e70]: /ˈprɑːdʌkt dɪˈzaɪn ˌɛndʒəˈnɪr/
            - text: noun
          - paragraph [ref=e71]: Someone who works across the product decision, the design, and the code that ships it.
        - 'navigation "Footer: Get in touch" [ref=e72]':
          - link "Contact me" [ref=e73] [cursor=pointer]:
            - /url: /contact/
            - text: Contact me
            - img [ref=e74]
          - link "josh@thebrileys.com" [ref=e76] [cursor=pointer]:
            - /url: mailto:josh@thebrileys.com
          - link "LinkedIn (opens in a new tab)" [ref=e77] [cursor=pointer]:
            - /url: https://www.linkedin.com/in/joshuabriley/
            - text: LinkedIn
            - generic [ref=e78]: ↗
            - generic [ref=e79]: (opens in a new tab)
          - link "GitHub (opens in a new tab)" [ref=e80] [cursor=pointer]:
            - /url: https://github.com/somecallmejosh
            - text: GitHub
            - generic [ref=e81]: ↗
            - generic [ref=e82]: (opens in a new tab)
      - generic [ref=e83]:
        - 'navigation "Footer: Work" [ref=e84]':
          - heading "Work" [level=2] [ref=e85]
          - list [ref=e86]:
            - listitem [ref=e87]:
              - link "Personal projects Things I build on my own time." [ref=e88] [cursor=pointer]:
                - /url: /personal-projects/
                - generic [ref=e89]: Personal projects
                - generic [ref=e90]: Things I build on my own time.
            - listitem [ref=e91]:
              - link "Tools Free design system tools, no signup." [ref=e92] [cursor=pointer]:
                - /url: /tools/
                - generic [ref=e93]: Tools
                - generic [ref=e94]: Free design system tools, no signup.
            - listitem [ref=e95]:
              - link "Play Short games about accessible interfaces." [ref=e96] [cursor=pointer]:
                - /url: /play/
                - generic [ref=e97]: Play
                - generic [ref=e98]: Short games about accessible interfaces.
          - link "All projects" [ref=e99] [cursor=pointer]:
            - /url: /projects/
            - text: All projects
            - generic [ref=e100]: →
        - 'navigation "Footer: About" [ref=e101]':
          - heading "About" [level=2] [ref=e102]
          - list [ref=e103]:
            - listitem [ref=e104]:
              - link "Biography 20+ years framing, designing, and building products." [ref=e105] [cursor=pointer]:
                - /url: /about/
                - generic [ref=e106]: Biography
                - generic [ref=e107]: 20+ years framing, designing, and building products.
            - listitem [ref=e108]:
              - link "Résumé Roles, skills, and a PDF to download." [ref=e109] [cursor=pointer]:
                - /url: /resume/
                - generic [ref=e110]: Résumé
                - generic [ref=e111]: Roles, skills, and a PDF to download.
            - listitem [ref=e112]:
              - link "Testimonials Recommendations from clients and colleagues." [ref=e113] [cursor=pointer]:
                - /url: /testimonials/
                - generic [ref=e114]: Testimonials
                - generic [ref=e115]: Recommendations from clients and colleagues.
        - 'navigation "Footer: Writing" [ref=e116]':
          - heading "Writing" [level=2] [ref=e117]
          - list [ref=e118]:
            - listitem [ref=e119]:
              - link "Wild Interfaces Nature documentaries about interface patterns, observed quietly in their natural habitat." [ref=e120] [cursor=pointer]:
                - /url: /blog/#wild-interfaces
                - generic [ref=e121]: Wild Interfaces
                - generic [ref=e122]: Nature documentaries about interface patterns, observed quietly in their natural habitat.
            - listitem [ref=e123]:
              - link "UI Court Bad interface patterns stand trial, with witnesses, cross-examination, and a verdict." [ref=e124] [cursor=pointer]:
                - /url: /blog/#ui-court
                - generic [ref=e125]: UI Court
                - generic [ref=e126]: Bad interface patterns stand trial, with witnesses, cross-examination, and a verdict.
            - listitem [ref=e127]:
              - link "Fictional UX Engineers Famous characters imagined on a product team, and what their habits say about the work." [ref=e128] [cursor=pointer]:
                - /url: /blog/#fictional-ux-engineers
                - generic [ref=e129]: Fictional UX Engineers
                - generic [ref=e130]: Famous characters imagined on a product team, and what their habits say about the work.
          - link "All writing" [ref=e131] [cursor=pointer]:
            - /url: /blog/
            - text: All writing
            - generic [ref=e132]: →
      - generic [ref=e133]:
        - generic [ref=e134]:
          - link "Joshua Briley" [ref=e135] [cursor=pointer]:
            - /url: /
            - text: JoshuaBriley
            - generic [ref=e136]: .
          - paragraph [ref=e137]: Based in Connecticut
        - generic [ref=e138]:
          - 'navigation "Footer: Site information" [ref=e139]':
            - link "How this site is designed" [ref=e140] [cursor=pointer]:
              - /url: /style-guide/
            - link "Privacy" [ref=e141] [cursor=pointer]:
              - /url: /privacy/
            - link "Terms" [ref=e142] [cursor=pointer]:
              - /url: /terms/
            - link "Back to top" [ref=e143] [cursor=pointer]:
              - /url: "#main"
              - text: Back to top
              - generic [ref=e144]: ↑
          - paragraph [ref=e145]: © 2026 Joshua Briley
  - generic [ref=e148]:
    - button "Menu" [ref=e149]:
      - img [ref=e151]
      - generic: Menu
    - button "Inspect" [ref=e155]:
      - img [ref=e157]
      - generic: Inspect
    - button "Audit" [ref=e159]:
      - generic [ref=e160]:
        - img [ref=e161]
        - img [ref=e164]
      - generic: Audit
    - button "Settings" [ref=e167]:
      - img [ref=e169]
      - generic: Settings
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import AxeBuilder from '@axe-core/playwright';
  3   | 
  4   | // One page per template, plus every tool page: the islands are the only
  5   | // surfaces with real interactive state, so they carry the most a11y risk.
  6   | // `/services/`, `/faqs/` and `/component-inventory/` used to be in this list
  7   | // and no longer exist — a scan of a 404 passes, which is how they went stale
  8   | // without failing. Anything added here must be a route `astro build` emits.
  9   | const PAGES = [
  10  |   '/',
  11  |   '/about/',
  12  |   '/projects/',
  13  |   '/projects/ivfcryo/',
  14  |   '/projects/logatot/',
  15  |   '/projects/vmspark/',
  16  |   '/personal-projects/rudiment-ui/',
  17  |   '/personal-projects/token-galaga/',
  18  |   '/personal-projects/',
  19  |   '/blog/',
  20  |   '/blog/measuring-style-guide-adoption/',
  21  |   '/blog/the-hidden-cost-of-component-inconsistency/',
  22  |   '/blog/future-proofing-front-end-dev-roles/',
  23  |   '/blog/web-component-libraries-in-the-ai-era/',
  24  |   '/blog/where-to-learn-modern-front-end/',
  25  |   '/testimonials/',
  26  |   '/resume/',
  27  |   '/contact/',
  28  |   '/style-guide/',
  29  |   '/tools/',
  30  |   '/tools/scorecard/',
  31  |   '/tools/roi-calculator/',
  32  |   '/tools/token-playground/',
  33  |   '/tools/audit-findings/',
  34  |   '/play/',
  35  |   '/play/contrast/',
  36  |   '/play/alt-or-not/',
  37  |   '/play/use-the-platform/',
  38  |   '/play/name-that-button/',
  39  |   '/play/tab-order/',
  40  |   '/play/fix-the-outline/',
  41  |   '/play/snap-to-grid/',
  42  |   '/play/spot-the-drift/',
  43  |   '/play/just-enough-contrast/',
  44  |   '/play/should-it-stop/',
  45  |   '/play/name-that-token/',
  46  | ];
  47  | 
  48  | for (const path of PAGES) {
  49  |   test.describe(`page ${path}`, () => {
  50  |     test('axe-core scan reports no WCAG 2.1 AA violations', async ({ page }) => {
  51  |       // Scan the resting state: scroll-reveal fades content in from opacity 0, and
  52  |       // an unscrolled full-DOM scan would otherwise catch sections mid-fade (real
  53  |       // text blended over the background reads as a false low-contrast hit). Under
  54  |       // reduced-motion the reveal is skipped, so this is also what those users see.
  55  |       await page.emulateMedia({ reducedMotion: 'reduce' });
  56  |       // Assert the route exists. Scanning a 404 passes cleanly, which is how
  57  |       // three deleted pages sat in this list for months looking green.
  58  |       const response = await page.goto(path, { waitUntil: 'networkidle' });
> 59  |       expect(response?.status(), `${path} did not return 200`).toBe(200);
      |                                                                ^ Error: /blog/future-proofing-front-end-dev-roles/ did not return 200
  60  |       const results = await new AxeBuilder({ page })
  61  |         .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
  62  |         .analyze();
  63  |       expect(results.violations).toEqual([]);
  64  |     });
  65  | 
  66  |     test('skip link moves focus to main', async ({ page }) => {
  67  |       await page.goto(path);
  68  |       await page.keyboard.press('Tab');
  69  |       await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  70  |       await page.keyboard.press('Enter');
  71  |       await expect(page.locator('#main')).toBeVisible();
  72  |     });
  73  |   });
  74  | }
  75  | 
  76  | test('mobile menu opens and restores focus after Escape', async ({ page }) => {
  77  |   await page.setViewportSize({ width: 375, height: 800 });
  78  |   await page.goto('/');
  79  |   const toggle = page.locator('#mobile-menu-toggle');
  80  |   await toggle.click();
  81  |   await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  82  |   await page.keyboard.press('Escape');
  83  |   await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  84  |   await expect(toggle).toBeFocused();
  85  | });
  86  | 
  87  | test('IVFCRYO readiness checks fit a narrow phone viewport', async ({ page }) => {
  88  |   await page.setViewportSize({ width: 320, height: 800 });
  89  |   await page.emulateMedia({ reducedMotion: 'reduce' });
  90  |   await page.goto('/projects/ivfcryo/#readiness');
  91  |   await expect(page.locator('#readiness')).toBeVisible();
  92  |   const width = await page.evaluate(() => ({
  93  |     viewport: document.documentElement.clientWidth,
  94  |     content: document.documentElement.scrollWidth,
  95  |   }));
  96  |   expect(width.content).toBeLessThanOrEqual(width.viewport);
  97  | });
  98  | 
  99  | for (const path of ['/projects/ivfcryo/', '/projects/logatot/', '/projects/vmspark/']) {
  100 |   test(`project summary expands with the keyboard: ${path}`, async ({ page }) => {
  101 |     await page.emulateMedia({ reducedMotion: 'reduce' });
  102 |     await page.goto(path, { waitUntil: 'networkidle' });
  103 |     const summary = page.locator('.summary-more > summary');
  104 |     await summary.focus();
  105 |     await page.keyboard.press('Enter');
  106 |     await expect(page.locator('.summary-more')).toHaveAttribute('open', '');
  107 |     await expect(page.getByRole('heading', { name: 'What I would improve', exact: true })).toBeVisible();
  108 |     await page.keyboard.press('Enter');
  109 |     await expect(page.locator('.summary-more')).not.toHaveAttribute('open', '');
  110 |   });
  111 | }
  112 | 
  113 | test('project artifact viewer returns focus after keyboard dismissal', async ({ page }) => {
  114 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  115 |   await page.goto('/projects/ivfcryo/', { waitUntil: 'networkidle' });
  116 |   const trigger = page.locator('.plate__zoom').first();
  117 |   await trigger.focus();
  118 |   await page.keyboard.press('Enter');
  119 |   await expect(page.getByRole('dialog', { name: 'Artifact viewer' })).toBeVisible();
  120 |   await page.keyboard.press('Escape');
  121 |   await expect(page.getByRole('dialog', { name: 'Artifact viewer' })).toBeHidden();
  122 |   await expect(trigger).toBeFocused();
  123 | });
  124 | 
  125 | 
  126 | test('token playground fits a narrow phone at maximum spacing', async ({ page }) => {
  127 |   await page.setViewportSize({ width: 320, height: 850 });
  128 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  129 |   await page.goto('/tools/token-playground/', { waitUntil: 'networkidle' });
  130 |   await page.locator('#tp-spacing').evaluate((input: HTMLInputElement) => {
  131 |     input.value = input.max;
  132 |     input.dispatchEvent(new Event('input', { bubbles: true }));
  133 |   });
  134 |   await page.locator('[data-tp-chip="density"][data-value="comfortable"]').click();
  135 |   const width = await page.evaluate(() => ({
  136 |     viewport: document.documentElement.clientWidth,
  137 |     content: document.documentElement.scrollWidth,
  138 |   }));
  139 |   expect(width.content).toBeLessThanOrEqual(width.viewport);
  140 | });
  141 | 
```