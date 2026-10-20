import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// One page per template, plus every tool page: the islands are the only
// surfaces with real interactive state, so they carry the most a11y risk.
// `/services/`, `/faqs/` and `/component-inventory/` used to be in this list
// and no longer exist — a scan of a 404 passes, which is how they went stale
// without failing. Anything added here must be a route `astro build` emits.
const PAGES = [
  '/',
  '/about/',
  '/projects/',
  '/projects/ivfcryo/',
  '/projects/logatot/',
  '/projects/vmspark/',
  '/personal-projects/rudiment-ui/',
  '/personal-projects/token-galaga/',
  '/personal-projects/west-baton-rouge-presbyterian/',
  '/personal-projects/',
  '/blog/',
  '/blog/native-lit-or-stencil/',
  '/blog/staff-level-ui-engineering-for-dummies/',
  '/blog/measuring-style-guide-adoption/',
  '/blog/the-hidden-cost-of-component-inconsistency/',
  '/blog/future-proofing-front-end-dev-roles/',
  '/blog/web-component-libraries-in-the-ai-era/',
  '/blog/where-to-learn-modern-front-end/',
  '/testimonials/',
  '/resume/',
  '/contact/',
  '/style-guide/',
  '/tools/',
  '/tools/scorecard/',
  '/tools/roi-calculator/',
  '/tools/token-playground/',
  '/tools/audit-findings/',
];

for (const path of PAGES) {
  test.describe(`page ${path}`, () => {
    test('axe-core scan reports no WCAG 2.1 AA violations', async ({ page }) => {
      // Scan the resting state: scroll-reveal fades content in from opacity 0, and
      // an unscrolled full-DOM scan would otherwise catch sections mid-fade (real
      // text blended over the background reads as a false low-contrast hit). Under
      // reduced-motion the reveal is skipped, so this is also what those users see.
      await page.emulateMedia({ reducedMotion: 'reduce' });
      // Assert the route exists. Scanning a 404 passes cleanly, which is how
      // three deleted pages sat in this list for months looking green.
      const response = await page.goto(path, { waitUntil: 'networkidle' });
      expect(response?.status(), `${path} did not return 200`).toBe(200);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });

    test('skip link moves focus to main', async ({ page }) => {
      await page.goto(path);
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.locator('#main')).toBeVisible();
    });
  });
}

test('mobile menu opens, traps focus on first item, closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const toggle = page.locator('#mobile-menu-toggle');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('IVFCRYO readiness checks fit a narrow phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/projects/ivfcryo/#readiness');
  await expect(page.locator('#readiness')).toBeVisible();
  const width = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(width.content).toBeLessThanOrEqual(width.viewport);
});

for (const path of ['/projects/ivfcryo/', '/projects/logatot/', '/projects/vmspark/']) {
  test(`project summary expands with the keyboard: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(path, { waitUntil: 'networkidle' });
    const summary = page.locator('.summary-more > summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.summary-more')).toHaveAttribute('open', '');
    await expect(page.getByRole('heading', { name: 'What I would improve', exact: true })).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.locator('.summary-more')).not.toHaveAttribute('open', '');
  });
}

test('project artifact viewer returns focus after keyboard dismissal', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/projects/ivfcryo/', { waitUntil: 'networkidle' });
  const trigger = page.locator('.plate__zoom').first();
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Artifact viewer' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Artifact viewer' })).toBeHidden();
  await expect(trigger).toBeFocused();
});


test('token playground fits a narrow phone at maximum spacing', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/tools/token-playground/', { waitUntil: 'networkidle' });
  await page.locator('#tp-spacing').evaluate((input: HTMLInputElement) => {
    input.value = input.max;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.locator('[data-tp-chip="density"][data-value="comfortable"]').click();
  const width = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(width.content).toBeLessThanOrEqual(width.viewport);
});
