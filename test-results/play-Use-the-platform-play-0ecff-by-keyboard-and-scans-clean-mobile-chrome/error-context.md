# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: play.spec.ts >> Use the platform plays start to finish by keyboard and scans clean
- Location: tests/e2e/play.spec.ts:36:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.evaluate: Test timeout of 30000ms exceeded.
 Please check out https://github.com/dequelabs/axe-core-npm/blob/develop/packages/playwright/error-handling.md
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Joshua Briley" [ref=e5] [cursor=pointer]:
        - /url: /
        - text: JoshuaBriley
        - generic [ref=e6]: .
      - generic [ref=e7]:
        - button "Dark theme" [ref=e8] [cursor=pointer]:
          - img [ref=e9]
          - generic [ref=e12]: Dark theme
        - button "Menu" [ref=e13] [cursor=pointer]:
          - text: Menu
          - img [ref=e15]
  - main [ref=e17]:
    - generic [ref=e19]:
      - navigation "Breadcrumb" [ref=e20]:
        - list [ref=e21]:
          - listitem [ref=e22]:
            - link "Play" [ref=e23] [cursor=pointer]:
              - /url: /play/
          - listitem [ref=e24]: Use the platform
      - generic [ref=e25]:
        - generic [ref=e26]:
          - heading "Use the platform" [level=1] [ref=e27]
          - paragraph [ref=e28]: Match each behavior to the native HTML element that already does it.
        - img "A div wearing glasses and a fake moustache pretends to be a button, next to a real button that works out of the box." [ref=e32]:
          - generic [ref=e33]:
            - generic [ref=e34]: HTML · ALREADY BUILT IN
            - generic [ref=e40]: <div onclick>
            - generic [ref=e41]: A div in disguise
            - generic [ref=e45]: Save
            - generic [ref=e46]: Works out of the box
            - generic [ref=e47]: Skip the costume
    - generic [ref=e50]:
      - region "Game" [ref=e52]:
        - generic [ref=e53]:
          - generic [ref=e54]: Question 8 of 8
          - generic [ref=e55]: Score 4
        - generic [ref=e56]:
          - paragraph [active] [ref=e57]:
            - generic [ref=e58]: Question 8 of 8.
            - text: Five shipping address fields need one shared label, "Shipping address". Which element should group them?
          - group "Question 8 of 8. Five shipping address fields need one shared label, \"Shipping address\". Which element should group them?" [ref=e59]:
            - button "<fieldset> with a <legend>" [ref=e60] [cursor=pointer]:
              - code [ref=e61]: <fieldset> with a <legend>
            - button "<section> with an <h3>" [ref=e62] [cursor=pointer]:
              - code [ref=e63]: <section> with an <h3>
            - button "<div class=\"group\">" [ref=e64] [cursor=pointer]:
              - code [ref=e65]: <div class="group">
        - paragraph [ref=e66]: Not quite. The answer is <meter>. Storage used is a measurement within a known range, not a task that finishes, so it's a meter. meter can also mark low, high and optimum ranges.
      - complementary [ref=e67]:
        - region "Lesson" [ref=e68]:
          - heading "Lesson" [level=2] [ref=e69]
          - paragraph [ref=e70]: Which built-in elements give you keyboard support, states, and semantics without extra JavaScript.
        - region "Up next" [ref=e71]:
          - heading "Up next" [level=2] [ref=e72]
          - link "Name that button Choose the accessible name for icon-only buttons, from trash cans to three-dot menus." [ref=e73] [cursor=pointer]:
            - /url: /play/name-that-button/
            - img [ref=e77]:
              - generic [ref=e78]:
                - generic [ref=e79]: ICON BUTTONS · NO NAMES
                - generic [ref=e87]: “Button. Button. Button.”
                - generic [ref=e88]: Say what it does
            - generic [ref=e89]: Name that button
            - generic [ref=e91]: Choose the accessible name for icon-only buttons, from trash cans to three-dot menus.
          - link "All 11 games" [ref=e92] [cursor=pointer]:
            - /url: /play/
  - contentinfo [ref=e93]:
    - generic [ref=e94]:
      - generic [ref=e95]:
        - 'navigation "Footer: Work" [ref=e96]':
          - heading "Work" [level=2] [ref=e97]
          - list [ref=e98]:
            - listitem [ref=e99]:
              - link "Personal projects Things I make for the fun of it." [ref=e100] [cursor=pointer]:
                - /url: /personal-projects/
                - generic [ref=e101]: Personal projects
                - generic [ref=e102]: Things I make for the fun of it.
            - listitem [ref=e103]:
              - link "Tools Free design system tools, no signup." [ref=e104] [cursor=pointer]:
                - /url: /tools/
                - generic [ref=e105]: Tools
                - generic [ref=e106]: Free design system tools, no signup.
            - listitem [ref=e107]:
              - link "Play Short games about accessible interfaces." [ref=e108] [cursor=pointer]:
                - /url: /play/
                - generic [ref=e109]: Play
                - generic [ref=e110]: Short games about accessible interfaces.
          - link "All projects" [ref=e111] [cursor=pointer]:
            - /url: /projects/
            - text: All projects
        - 'navigation "Footer: About" [ref=e113]':
          - heading "About" [level=2] [ref=e114]
          - list [ref=e115]:
            - listitem [ref=e116]:
              - link "Biography 20+ years framing, designing, and building products." [ref=e117] [cursor=pointer]:
                - /url: /about/
                - generic [ref=e118]: Biography
                - generic [ref=e119]: 20+ years framing, designing, and building products.
            - listitem [ref=e120]:
              - link "Résumé Roles, skills, and a PDF to download." [ref=e121] [cursor=pointer]:
                - /url: /resume/
                - generic [ref=e122]: Résumé
                - generic [ref=e123]: Roles, skills, and a PDF to download.
            - listitem [ref=e124]:
              - link "Testimonials Recommendations from clients and colleagues." [ref=e125] [cursor=pointer]:
                - /url: /testimonials/
                - generic [ref=e126]: Testimonials
                - generic [ref=e127]: Recommendations from clients and colleagues.
        - 'navigation "Footer: Writing" [ref=e128]':
          - heading "Writing" [level=2] [ref=e129]
          - list [ref=e130]:
            - listitem [ref=e131]:
              - link "Wild Interfaces Interface patterns described in the style of a nature documentary." [ref=e132] [cursor=pointer]:
                - /url: /blog/#wild-interfaces
                - generic [ref=e133]: Wild Interfaces
                - generic [ref=e134]: Interface patterns described in the style of a nature documentary.
            - listitem [ref=e135]:
              - link "UI Court Bad interface patterns stand trial. Each case has witnesses, cross-examination, and a verdict." [ref=e136] [cursor=pointer]:
                - /url: /blog/#ui-court
                - generic [ref=e137]: UI Court
                - generic [ref=e138]: Bad interface patterns stand trial. Each case has witnesses, cross-examination, and a verdict.
            - listitem [ref=e139]:
              - link "Fictional UX Engineers Famous characters imagined as members of a product team. Each profile covers what their habits teach about interface work." [ref=e140] [cursor=pointer]:
                - /url: /blog/#fictional-ux-engineers
                - generic [ref=e141]: Fictional UX Engineers
                - generic [ref=e142]: Famous characters imagined as members of a product team. Each profile covers what their habits teach about interface work.
          - link "All writing" [ref=e143] [cursor=pointer]:
            - /url: /blog/
            - text: All writing
      - generic [ref=e145]:
        - generic [ref=e146]:
          - link "Joshua Briley" [ref=e147] [cursor=pointer]:
            - /url: /
            - text: JoshuaBriley
            - generic [ref=e148]: .
          - paragraph [ref=e149]: Based in Connecticut
          - 'navigation "Footer: Get in touch" [ref=e150]':
            - link "Contact me" [ref=e151] [cursor=pointer]:
              - /url: /contact/
              - text: Contact me
            - generic [ref=e153]:
              - link "josh@thebrileys.com" [ref=e154] [cursor=pointer]:
                - /url: mailto:josh@thebrileys.com
              - button "Copy email address" [ref=e155] [cursor=pointer]:
                - img [ref=e157]
                - generic [ref=e159]: Copy
            - link "LinkedIn (opens in a new tab)" [ref=e161] [cursor=pointer]:
              - /url: https://www.linkedin.com/in/joshuabriley/
              - text: LinkedIn
              - generic [ref=e163]: (opens in a new tab)
            - link "GitHub (opens in a new tab)" [ref=e164] [cursor=pointer]:
              - /url: https://github.com/somecallmejosh
              - text: GitHub
              - generic [ref=e166]: (opens in a new tab)
        - generic [ref=e167]:
          - 'navigation "Footer: Site information" [ref=e168]':
            - link "How this site is designed" [ref=e169] [cursor=pointer]:
              - /url: /style-guide/
            - link "Privacy" [ref=e170] [cursor=pointer]:
              - /url: /privacy/
            - link "Terms" [ref=e171] [cursor=pointer]:
              - /url: /terms/
            - link "Back to top" [ref=e172] [cursor=pointer]:
              - /url: "#main"
              - text: Back to top
          - paragraph [ref=e174]: © 2026 Joshua Briley
  - generic [ref=e177]:
    - button "Menu" [ref=e178]:
      - img [ref=e180]
      - generic: Menu
    - button "Inspect" [ref=e184]:
      - img [ref=e186]
      - generic: Inspect
    - button "Audit" [ref=e188]:
      - generic [ref=e189]:
        - img [ref=e190]
        - img [ref=e193]
      - generic: Audit
    - button "Settings" [ref=e196]:
      - img [ref=e198]
      - generic: Settings
```

# Test source

```ts
  1   | import { test, expect, type Page } from '@playwright/test';
  2   | import AxeBuilder from '@axe-core/playwright';
  3   | import { GAMES } from '../../src/lib/games';
  4   | 
  5   | // The first scan in each test covers the whole page. Later scans cover only
  6   | // the game, which is the only part that changes as it's played; full-page
  7   | // scans at every step pushed the longer games past the test timeout.
  8   | const scan = async (page: Page, root?: string) => {
  9   |   const builder = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']);
  10  |   if (root) builder.include(root);
> 11  |   return (await builder.analyze()).violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`);
      |           ^ Error: page.evaluate: Test timeout of 30000ms exceeded.
  12  | };
  13  | 
  14  | // Resting state: entrance animations fade text in, which axe would read mid-fade.
  15  | test.beforeEach(async ({ page }) => {
  16  |   await page.emulateMedia({ reducedMotion: 'reduce' });
  17  | });
  18  | 
  19  | test('the /play/ index lists every game and scans clean', async ({ page }) => {
  20  |   await page.goto('/play/');
  21  |   for (const game of GAMES) {
  22  |     // The featured game's link reads "Play all 10 rounds of Pass or fail?", so match on the title.
  23  |     await expect(page.getByRole('link', { name: game.title })).toHaveAttribute('href', `/play/${game.slug}/`);
  24  |   }
  25  |   expect(await scan(page)).toEqual([]);
  26  | });
  27  | 
  28  | test('the contrast game runs on its own page without the 404 heading', async ({ page }) => {
  29  |   await page.goto('/play/contrast/');
  30  |   await expect(page.locator('[data-contrast-game]')).toBeVisible();
  31  |   await expect(page.getByRole('heading', { name: /While you're here/ })).toHaveCount(0);
  32  |   expect(await scan(page)).toEqual([]);
  33  | });
  34  | 
  35  | for (const game of GAMES.filter((g) => g.kind === 'quiz')) {
  36  |   test(`${game.title} plays start to finish by keyboard and scans clean`, async ({ page }) => {
  37  |     const total = game.kind === 'quiz' ? game.questions.length : 0;
  38  |     await page.goto(`/play/${game.slug}/`);
  39  |     const quiz = page.locator(`[data-quiz="${game.slug}"]`);
  40  |     await expect(quiz).toBeVisible();
  41  | 
  42  |     for (let i = 0; i < total; i++) {
  43  |       const question = quiz.locator(`[data-qz-question="${i}"]`);
  44  |       await expect(question).toBeVisible();
  45  |       if (i > 0) await expect(question.locator('.qz-prompt')).toBeFocused();
  46  |       expect(await scan(page, i === 0 ? undefined : `[data-quiz="${game.slug}"]`)).toEqual([]);
  47  | 
  48  |       // Alternate between the first and last choice so both verdicts get exercised.
  49  |       const choices = question.locator('[data-choice]');
  50  |       const pick = i % 2 ? choices.last() : choices.first();
  51  |       await pick.focus();
  52  |       await page.keyboard.press('Enter');
  53  | 
  54  |       await expect(question.locator('[data-qz-verdict]')).toHaveText(/^(Right\.|Not quite\. The answer is .+\.)$/);
  55  |       await expect(question.getByText('Correct answer')).toHaveCount(1);
  56  |       await expect(quiz.locator('[data-qz-next]')).toBeFocused();
  57  |       expect(await scan(page, `[data-quiz="${game.slug}"]`)).toEqual([]);
  58  |       await page.keyboard.press('Enter');
  59  |     }
  60  | 
  61  |     await expect(quiz.locator('[data-qz-summary]')).toHaveText(new RegExp(`^You got \\d+ of ${total}\\.$`));
  62  |     await expect(quiz.locator('[data-qz-summary]')).toBeFocused();
  63  |     expect(await scan(page, `[data-quiz="${game.slug}"]`)).toEqual([]);
  64  | 
  65  |     await quiz.getByRole('button', { name: 'Play again' }).click();
  66  |     await expect(quiz.locator('[data-qz-question="0"] .qz-prompt')).toBeFocused();
  67  |     await expect(quiz.locator('[data-qz-question="0"] [data-choice]').first()).toBeEnabled();
  68  |   });
  69  | }
  70  | 
  71  | test('Tab order: reorder by keyboard, check, and finish all rounds', async ({ page }) => {
  72  |   await page.emulateMedia({ reducedMotion: 'reduce' });
  73  |   await page.goto('/play/tab-order/');
  74  |   const game = page.locator('[data-tab-order]');
  75  |   await expect(game).toBeVisible();
  76  |   expect(await scan(page)).toEqual([]);
  77  | 
  78  |   // Round 1: move "Last name" (starts 4th) up to 2nd, keeping focus on its button.
  79  |   const round = game.locator('[data-to-round="0"]');
  80  |   const moveUp = round.getByRole('button', { name: 'Move Last name up' });
  81  |   await moveUp.click();
  82  |   await expect(moveUp).toBeFocused();
  83  |   await page.keyboard.press('Enter');
  84  |   await expect(round.locator('[data-item]').nth(1)).toHaveAttribute('data-item', 'last');
  85  |   await expect(round.locator('[data-mock="last"] [data-badge]')).toHaveText('2');
  86  |   await round.getByRole('button', { name: 'Check the order' }).click();
  87  |   await expect(round.locator('[data-to-verdict]')).toHaveText('Right. Focus follows the layout.');
  88  |   await expect(game.locator('[data-to-next]')).toBeFocused();
  89  |   expect(await scan(page, '[data-tab-order]')).toEqual([]);
  90  | 
  91  |   for (let i = 1; i < 3; i++) {
  92  |     await page.keyboard.press('Enter');
  93  |     const r = game.locator(`[data-to-round="${i}"]`);
  94  |     await expect(r.locator('.game-prompt')).toBeFocused();
  95  |     await r.getByRole('button', { name: 'Check the order' }).click();
  96  |     await expect(r.locator('[data-to-verdict]')).toHaveText('Not quite.');
  97  |     await expect(r.locator('[data-to-answer]')).toContainText('The order should be:');
  98  |   }
  99  |   await page.keyboard.press('Enter');
  100 |   await expect(game.locator('[data-to-summary]')).toHaveText('You got 1 of 3 rounds right.');
  101 |   expect(await scan(page, '[data-tab-order]')).toEqual([]);
  102 | });
  103 | 
  104 | test('Fix the outline: live checks, verdict marks, finish', async ({ page }) => {
  105 |   await page.goto('/play/fix-the-outline/');
  106 |   const game = page.locator('[data-outline-game]');
  107 |   await expect(game).toBeVisible();
  108 |   const round = game.locator('[data-ol-round="0"]');
  109 |   await expect(round.locator('[data-ol-issues]')).toContainText('There are 2 h1 headings');
  110 |   expect(await scan(page)).toEqual([]);
  111 | 
```