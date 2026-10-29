# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: articles.spec.ts >> article contents and data tables are usable on a narrow phone
- Location: tests/e2e/articles.spec.ts:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.focus: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.article-mobile-toc').locator('summary')

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
      - button "Menu" [ref=e7] [cursor=pointer]:
        - text: Menu
        - img [ref=e9]
  - main [ref=e11]:
    - generic [ref=e14]:
      - generic [ref=e15]:
        - figure [ref=e16]:
          - generic [ref=e17]: "404"
          - generic [ref=e18]: This 404 fails contrast on purpose.
        - heading "This page took an unplanned detour." [level=1] [ref=e19]:
          - text: This page took an
          - emphasis [ref=e20]: unplanned detour.
        - paragraph [ref=e21]: Maybe it was renamed, maybe it's a typo, or maybe it drifted out of the system and nobody wrote it down. Either way, here are a few good places to land.
        - list [ref=e22]:
          - listitem [ref=e23]:
            - link "Home" [ref=e24] [cursor=pointer]:
              - /url: /
              - text: Home
              - generic [ref=e25]: →
          - listitem [ref=e26]:
            - link "Selected work" [ref=e27] [cursor=pointer]:
              - /url: /projects/
              - text: Selected work
              - generic [ref=e28]: →
          - listitem [ref=e29]:
            - link "Contact" [ref=e30] [cursor=pointer]:
              - /url: /contact/
              - text: Contact
              - generic [ref=e31]: →
        - paragraph [ref=e32]:
          - text: Broken link?
          - link "Let me know" [ref=e33] [cursor=pointer]:
            - /url: /contact/
            - text: Let me know
            - generic [ref=e34]: ↗
      - 'region "While you''re here: pass or fail?" [ref=e35]':
        - 'heading "While you''re here: pass or fail?" [level=2] [ref=e36]'
        - paragraph [ref=e37]: Does this text pass WCAG AA? Body text needs a contrast ratio of at least 4.5:1. Every sample is one of this site's own colors, faded a little.
        - generic [ref=e38]:
          - generic [ref=e39]: Round 1 of 10
          - generic [ref=e40]: Score 0
        - 'img "Sample 1: \"This page wandered off.\" in muted ink at 78% strength on a paper background." [ref=e42]':
          - generic [ref=e43]: This page wandered off.
        - generic [ref=e45]:
          - button "Passes AA" [ref=e46] [cursor=pointer]
          - button "Fails AA" [ref=e47] [cursor=pointer]
        - paragraph [ref=e48]
  - contentinfo [ref=e49]:
    - generic [ref=e50]:
      - generic [ref=e51]:
        - generic [ref=e52]:
          - paragraph [ref=e53]:
            - term [ref=e54]: product design engineer
          - paragraph [ref=e55]:
            - generic [ref=e56]: /ˈprɑːdʌkt dɪˈzaɪn ˌɛndʒəˈnɪr/
            - text: noun
          - paragraph [ref=e57]: Someone who works across the product decision, the design, and the code that ships it.
        - 'navigation "Footer: Get in touch" [ref=e58]':
          - link "Contact me" [ref=e59] [cursor=pointer]:
            - /url: /contact/
            - text: Contact me
            - img [ref=e60]
          - link "josh@thebrileys.com" [ref=e62] [cursor=pointer]:
            - /url: mailto:josh@thebrileys.com
          - link "LinkedIn (opens in a new tab)" [ref=e63] [cursor=pointer]:
            - /url: https://www.linkedin.com/in/joshuabriley/
            - text: LinkedIn
            - generic [ref=e64]: ↗
            - generic [ref=e65]: (opens in a new tab)
          - link "GitHub (opens in a new tab)" [ref=e66] [cursor=pointer]:
            - /url: https://github.com/somecallmejosh
            - text: GitHub
            - generic [ref=e67]: ↗
            - generic [ref=e68]: (opens in a new tab)
      - generic [ref=e69]:
        - 'navigation "Footer: Work" [ref=e70]':
          - heading "Work" [level=2] [ref=e71]
          - list [ref=e72]:
            - listitem [ref=e73]:
              - link "Personal projects Things I build on my own time." [ref=e74] [cursor=pointer]:
                - /url: /personal-projects/
                - generic [ref=e75]: Personal projects
                - generic [ref=e76]: Things I build on my own time.
            - listitem [ref=e77]:
              - link "Tools Free design system tools, no signup." [ref=e78] [cursor=pointer]:
                - /url: /tools/
                - generic [ref=e79]: Tools
                - generic [ref=e80]: Free design system tools, no signup.
            - listitem [ref=e81]:
              - link "Play Short games about accessible interfaces." [ref=e82] [cursor=pointer]:
                - /url: /play/
                - generic [ref=e83]: Play
                - generic [ref=e84]: Short games about accessible interfaces.
          - link "All projects" [ref=e85] [cursor=pointer]:
            - /url: /projects/
            - text: All projects
            - generic [ref=e86]: →
        - 'navigation "Footer: About" [ref=e87]':
          - heading "About" [level=2] [ref=e88]
          - list [ref=e89]:
            - listitem [ref=e90]:
              - link "Biography 20+ years framing, designing, and building products." [ref=e91] [cursor=pointer]:
                - /url: /about/
                - generic [ref=e92]: Biography
                - generic [ref=e93]: 20+ years framing, designing, and building products.
            - listitem [ref=e94]:
              - link "Résumé Roles, skills, and a PDF to download." [ref=e95] [cursor=pointer]:
                - /url: /resume/
                - generic [ref=e96]: Résumé
                - generic [ref=e97]: Roles, skills, and a PDF to download.
            - listitem [ref=e98]:
              - link "Testimonials Recommendations from clients and colleagues." [ref=e99] [cursor=pointer]:
                - /url: /testimonials/
                - generic [ref=e100]: Testimonials
                - generic [ref=e101]: Recommendations from clients and colleagues.
        - 'navigation "Footer: Writing" [ref=e102]':
          - heading "Writing" [level=2] [ref=e103]
          - list [ref=e104]:
            - listitem [ref=e105]:
              - link "Wild Interfaces Nature documentaries about interface patterns, observed quietly in their natural habitat." [ref=e106] [cursor=pointer]:
                - /url: /blog/#wild-interfaces
                - generic [ref=e107]: Wild Interfaces
                - generic [ref=e108]: Nature documentaries about interface patterns, observed quietly in their natural habitat.
            - listitem [ref=e109]:
              - link "UI Court Bad interface patterns stand trial, with witnesses, cross-examination, and a verdict." [ref=e110] [cursor=pointer]:
                - /url: /blog/#ui-court
                - generic [ref=e111]: UI Court
                - generic [ref=e112]: Bad interface patterns stand trial, with witnesses, cross-examination, and a verdict.
            - listitem [ref=e113]:
              - link "Fictional UX Engineers Famous characters imagined on a product team, and what their habits say about the work." [ref=e114] [cursor=pointer]:
                - /url: /blog/#fictional-ux-engineers
                - generic [ref=e115]: Fictional UX Engineers
                - generic [ref=e116]: Famous characters imagined on a product team, and what their habits say about the work.
          - link "All writing" [ref=e117] [cursor=pointer]:
            - /url: /blog/
            - text: All writing
            - generic [ref=e118]: →
      - generic [ref=e119]:
        - generic [ref=e120]:
          - link "Joshua Briley" [ref=e121] [cursor=pointer]:
            - /url: /
            - text: JoshuaBriley
            - generic [ref=e122]: .
          - paragraph [ref=e123]: Based in Connecticut
        - generic [ref=e124]:
          - 'navigation "Footer: Site information" [ref=e125]':
            - link "How this site is designed" [ref=e126] [cursor=pointer]:
              - /url: /style-guide/
            - link "Privacy" [ref=e127] [cursor=pointer]:
              - /url: /privacy/
            - link "Terms" [ref=e128] [cursor=pointer]:
              - /url: /terms/
            - link "Back to top" [ref=e129] [cursor=pointer]:
              - /url: "#main"
              - text: Back to top
              - generic [ref=e130]: ↑
          - paragraph [ref=e131]: © 2026 Joshua Briley
  - generic [ref=e134]:
    - button "Menu" [ref=e135]:
      - img [ref=e137]
      - generic: Menu
    - button "Inspect" [ref=e141]:
      - img [ref=e143]
      - generic: Inspect
    - button "Audit" [ref=e145]:
      - img [ref=e147]
      - generic: Audit
    - button "Settings" [ref=e150]:
      - img [ref=e152]
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
> 8  |   await contents.locator('summary').focus();
     |                                     ^ Error: locator.focus: Test timeout of 30000ms exceeded.
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
  54 |   await page.locator(`#${section}`).evaluate((heading) => heading.scrollIntoView({ block: 'start' }));
  55 |   const links = page.locator(`[data-toc-link="${section}"]`);
  56 |   await expect(links).toHaveCount(2);
  57 |   await expect(links.nth(0)).toHaveAttribute('aria-current', 'location');
  58 |   await expect(links.nth(1)).toHaveAttribute('aria-current', 'location');
  59 |   expect(await page.locator(`#${section}`).evaluate((heading) => heading.getBoundingClientRect().top)).toBeGreaterThan(84);
  60 | });
  61 | 
```