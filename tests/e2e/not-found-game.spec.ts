import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// The 404 page hosts the "Pass or fail?" contrast game. Half its samples fail
// contrast on purpose, so this checks they stay a picture of text (SVG with an
// accessible name) and that every game state still scans clean.
const scan = async (page: import('@playwright/test').Page) =>
  (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations.map(
    (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`,
  );

test('the contrast game plays ten rounds by keyboard and scans clean throughout', async ({ page }) => {
  await page.goto('/this-page-does-not-exist/');
  const game = page.locator('[data-contrast-game]');
  await expect(game).toBeVisible();
  await expect(page.locator('[data-cg-art]')).toHaveAttribute('aria-label', /^Sample 1: /);

  for (let round = 1; round <= 10; round++) {
    expect(await scan(page)).toEqual([]);
    await page.getByRole('button', { name: round % 2 ? 'Passes AA' : 'Fails AA' }).click();
    await expect(page.locator('[data-cg-verdict]')).toHaveText(/^(Right|Not quite)\. \d+\.\d\d:1 (passes|fails) for body text\.$/);
    expect(await scan(page)).toEqual([]);
    const next = page.locator('[data-cg-next]');
    await expect(next).toBeFocused();
    await page.keyboard.press('Enter');
  }

  await expect(page.locator('[data-cg-summary]')).toHaveText(/^You scored \d+ of 10\.$/);
  await expect(page.getByRole('button', { name: 'Play again' })).toBeFocused();
  expect(await scan(page)).toEqual([]);
});

test('the game stays hidden without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/this-page-does-not-exist/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('[data-contrast-game]')).toBeHidden();
  await context.close();
});
