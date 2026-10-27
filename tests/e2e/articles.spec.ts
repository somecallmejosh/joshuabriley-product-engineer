import { test, expect } from '@playwright/test';

test('article contents and data tables are usable on a narrow phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/blog/native-lit-or-stencil/');
  const contents = page.locator('.article-mobile-toc');
  await contents.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(contents).toHaveAttribute('open', '');
  const section = contents.locator('a').first();
  const anchor = await section.getAttribute('href');
  await section.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(new RegExp(`${anchor}$`));
  await expect(section).toHaveAttribute('aria-current', 'location');
  const table = page.locator('.article-table').first();
  await expect(table.locator('thead')).toBeVisible();
  await table.focus();
  await expect(table).toBeFocused();
  expect(await table.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
  const frame = page.locator('.article-table-frame').first();
  await expect(frame).toHaveAttribute('data-overflow-right', '');
  await expect(frame).not.toHaveAttribute('data-overflow-left', '');
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => table.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  await expect(frame).toHaveAttribute('data-overflow-left', '');
  await table.evaluate((el) => { el.scrollLeft = el.scrollWidth; });
  await expect(frame).not.toHaveAttribute('data-overflow-right', '');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('article sharing announces clipboard success and failure', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/blog/measuring-style-guide-adoption/');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (value: string) => { (window as any).__copiedArticle = value; } } });
  });
  await page.getByRole('button', { name: 'Copy article link' }).click();
  await expect(page.locator('[data-article-copy-status]')).toHaveText('Article link copied.');
  expect(await page.evaluate(() => (window as any).__copiedArticle)).toBe(page.url());
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Unavailable'); } } });
  });
  await page.getByRole('button', { name: 'Copy article link' }).click();
  await expect(page.locator('[data-article-copy-status]')).toContainText('address bar');
});

test('article contents track a section after jumping through a long guide', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/blog/staff-level-ui-engineering-for-dummies/');
  const section = 'tokens-governance-and-adoption';
  await page.locator(`#${section}`).evaluate((heading) => heading.scrollIntoView({ block: 'start' }));
  const links = page.locator(`[data-toc-link="${section}"]`);
  await expect(links).toHaveCount(2);
  await expect(links.nth(0)).toHaveAttribute('aria-current', 'location');
  await expect(links.nth(1)).toHaveAttribute('aria-current', 'location');
  expect(await page.locator(`#${section}`).evaluate((heading) => heading.getBoundingClientRect().top)).toBeGreaterThan(84);
});
