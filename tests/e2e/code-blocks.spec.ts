import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const path of ['/style-guide/']) {
  test(`highlighted code preserves source, copy, and accessible layout: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async (text: string) => { (window as typeof window & { copiedCode: string }).copiedCode = text; } },
      });
    });
    await page.goto(path);
    await page.addStyleTag({ content: 'astro-dev-toolbar { display: none; }' });
    if (path === '/style-guide/') await page.locator('.sg-markup > summary').first().click();
    const artifact = page.locator('.code-artifact').first();
    await artifact.scrollIntoViewIfNeeded();
    const code = artifact.locator('pre.astro-code');
    await expect(code).toHaveClass(/github-dark/);
    const source = await artifact.locator('[data-copy-button]').getAttribute('data-copy-text');
    const lines = await artifact.locator('.code-line-content').allTextContents();
    expect(lines.join('\n')).toBe(source);
    await expect(artifact.locator('.code-line-number')).toHaveCount(lines.length);
    expect(await artifact.locator('.code-line-number').evaluateAll(els => els.every(el => el.getAttribute('aria-hidden') === 'true'))).toBe(true);
    const colors = await code.locator('span[style*="color:"]').evaluateAll(els => [...new Set(els.map(el => getComputedStyle(el).color))]);
    expect(colors.length).toBeGreaterThan(2);
    // Snippet markup must remain text rather than becoming interactive DOM.
    await expect(code.locator('a, button, script')).toHaveCount(0);
    await artifact.locator('[data-copy-button]').click();
    expect(await page.evaluate(() => (window as typeof window & { copiedCode: string }).copiedCode)).toBe(source);
    await expect(artifact.locator('[data-copy-status]')).toHaveText('Copied to clipboard');
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(await code.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
      await code.focus();
      await expect(code).toBeFocused();
      const issues = (await new AxeBuilder({ page }).include('.code-artifact').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()).violations;
      expect(issues).toEqual([]);
    }
  });
}

// No current post or case study carries code, so the theme is checked against the style guide.
test('code blocks use the shared theme with readable comment colors', async ({ page }) => {
  await page.goto('/style-guide/');
  const code = page.locator('#main pre.astro-code').first();
  await expect(code).toHaveClass(/github-dark/);
  // The style-guide snippets have no comments, so add a span the way Shiki styles one.
  const color = await code.evaluate(pre => {
    const span = document.createElement('span');
    span.setAttribute('style', 'color:#6A737D');
    pre.append(span);
    return getComputedStyle(span).color;
  });
  expect(color).toBe('rgb(163, 178, 191)');
});
