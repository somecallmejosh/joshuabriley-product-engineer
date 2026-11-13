import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('follows the OS setting until the visitor picks a theme, then remembers it', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'dark');

  const toggle = page.locator('[data-theme-toggle]:visible');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await toggle.click();
  await expect(html).toHaveAttribute('data-theme', 'light');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');

  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'light');
});

test('print always uses the light palette', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/about/');
  await page.emulateMedia({ media: 'print', colorScheme: 'dark' });
  const paper = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--paper').trim().toLowerCase());
  expect(paper).toBe('#fafbfc');
});

for (const path of ['/', '/resume/', '/projects/ivfcryo/', '/blog/', '/tools/', '/tools/roi-calculator/', '/play/', '/testimonials/']) {
  test(`dark theme passes WCAG contrast on ${path}`, async ({ page }) => {
    // Reduced motion skips the hero load-in, so axe never samples text mid-fade.
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    await page.goto(path);
    const violations = (await new AxeBuilder({ page }).withRules(['color-contrast', 'link-in-text-block']).analyze()).violations;
    expect(violations.flatMap((v) => v.nodes.map((n) => `${v.id}: ${n.target.join(' ')}`))).toEqual([]);
  });
}
