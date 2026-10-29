# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: articles.spec.ts >> article contents track a section after jumping through a long guide
- Location: tests/e2e/articles.spec.ts:49:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.evaluate: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#what-engineering-leaders-should-do')

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
        - 'img "Sample 1: \"This page wandered off.\" in paper at 87% strength on a accent blue background." [ref=e56]':
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
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('article contents and data tables are usable on a narrow phone', async ({ page }) => {
  4  |   await page.setViewportSize({ width: 320, height: 800 });
  5  |   await page.emulateMedia({ reducedMotion: 'reduce' });
  6  |   await page.goto('/blog/future-proofing-front-end-dev-roles/');
  7  |   const contents = page.locator('.article-mobile-toc');
  8  |   await contents.locator('summary').focus();
  9  |   await page.keyboard.press('Enter');
  10 |   await expect(contents).toHaveAttribute('open', '');
  11 |   const section = contents.locator('a').first();
  12 |   const anchor = await section.getAttribute('href');
  13 |   await section.focus();
  14 |   await page.keyboard.press('Enter');
  15 |   await expect(page).toHaveURL(new RegExp(`${anchor}$`));
  16 |   await expect(section).toHaveAttribute('aria-current', 'location');
  17 |   const table = page.locator('.article-table').first();
  18 |   await expect(table.locator('thead')).toBeVisible();
  19 |   await table.focus();
  20 |   await expect(table).toBeFocused();
  21 |   expect(await table.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
  22 |   const frame = page.locator('.article-table-frame').first();
  23 |   await expect(frame).toHaveAttribute('data-overflow-right', '');
  24 |   await expect(frame).not.toHaveAttribute('data-overflow-left', '');
  25 |   await page.keyboard.press('ArrowRight');
  26 |   await expect.poll(() => table.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  27 |   await expect(frame).toHaveAttribute('data-overflow-left', '');
  28 |   await table.evaluate((el) => { el.scrollLeft = el.scrollWidth; });
  29 |   await expect(frame).not.toHaveAttribute('data-overflow-right', '');
  30 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  31 | });
  32 | 
  33 | test('article sharing announces clipboard success and failure', async ({ page }) => {
  34 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  35 |   await page.goto('/blog/measuring-style-guide-adoption/');
  36 |   await page.evaluate(() => {
  37 |     Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (value: string) => { (window as any).__copiedArticle = value; } } });
  38 |   });
  39 |   await page.getByRole('button', { name: 'Copy article link' }).click();
  40 |   await expect(page.locator('[data-article-copy-status]')).toHaveText('Article link copied.');
  41 |   expect(await page.evaluate(() => (window as any).__copiedArticle)).toBe(page.url());
  42 |   await page.evaluate(() => {
  43 |     Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Unavailable'); } } });
  44 |   });
  45 |   await page.getByRole('button', { name: 'Copy article link' }).click();
  46 |   await expect(page.locator('[data-article-copy-status]')).toContainText('address bar');
  47 | });
  48 | 
  49 | test('article contents track a section after jumping through a long guide', async ({ page }) => {
  50 |   await page.setViewportSize({ width: 1440, height: 1000 });
  51 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  52 |   await page.goto('/blog/future-proofing-front-end-dev-roles/');
  53 |   const section = 'what-engineering-leaders-should-do';
> 54 |   await page.locator(`#${section}`).evaluate((heading) => heading.scrollIntoView({ block: 'start' }));
     |                                     ^ Error: locator.evaluate: Test timeout of 30000ms exceeded.
  55 |   const links = page.locator(`[data-toc-link="${section}"]`);
  56 |   await expect(links).toHaveCount(2);
  57 |   await expect(links.nth(0)).toHaveAttribute('aria-current', 'location');
  58 |   await expect(links.nth(1)).toHaveAttribute('aria-current', 'location');
  59 |   expect(await page.locator(`#${section}`).evaluate((heading) => heading.getBoundingClientRect().top)).toBeGreaterThan(84);
  60 | });
  61 | 
```