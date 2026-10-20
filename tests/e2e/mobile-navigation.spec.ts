import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/about/');
  await page.addStyleTag({ content: 'astro-dev-toolbar { display: none; }' });
});

test('mobile navigation is a named modal with usable destinations and contained focus', async ({ page }) => {
  const toggle = page.locator('#mobile-menu-toggle');
  const dialog = page.getByRole('dialog', { name: 'Explore' });
  await expect(dialog).not.toBeVisible();
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(dialog).toBeVisible();
  const close = dialog.getByRole('button', { name: 'Close', exact: true });
  await expect(close).toBeFocused();
  await expect(dialog.getByRole('link', { name: 'About', exact: true })).toHaveAttribute('aria-current', 'page');
  for (const name of ['Writing', 'Tools', 'Recommendations', 'Personal projects', 'Contact me']) {
    await expect(dialog.getByRole('link', { name, exact: true })).toBeVisible();
  }
  await expect(page.locator('html')).toHaveClass(/nav-open/);
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).overflowY)).toBe('hidden');
  // Attempts to focus the background remain inside the native modal.
  await page.locator('#main a').first().evaluate(el => (el as HTMLElement).focus());
  expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
  await close.focus();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link', { name: 'Contact me', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  const violations = (await new AxeBuilder({ page }).include('#mobile-menu').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()).violations;
  expect(violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await expect(page.locator('html')).not.toHaveClass(/nav-open/);
});

test('outside clicks and the close button dismiss the menu; inside clicks do not', async ({ page }) => {
  const toggle = page.locator('#mobile-menu-toggle');
  const dialog = page.getByRole('dialog', { name: 'Explore' });
  await page.evaluate(() => window.scrollTo(0, 300));
  const initialScroll = await page.evaluate(() => window.scrollY);
  // Click the visible sticky control without Playwright scrolling it into view.
  const bounds = await toggle.boundingBox();
  await page.mouse.click(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2);
  expect(await page.evaluate(() => window.scrollY)).toBe(initialScroll);
  await dialog.getByRole('heading', { name: 'Explore', exact: true }).click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(3, 3);
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/\/about\/$/);
  expect(await page.evaluate(() => window.scrollY)).toBe(initialScroll);
  await expect(toggle).toBeFocused();
  await toggle.click();
  await dialog.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(toggle).toBeFocused();
});

test('links navigate and switching to desktop clears the modal and scroll lock', async ({ page }) => {
  const toggle = page.locator('#mobile-menu-toggle');
  const dialog = page.getByRole('dialog', { name: 'Explore' });
  await toggle.click();
  await dialog.getByRole('link', { name: 'Tools', exact: true }).click();
  await expect(page).toHaveURL(/\/tools\/$/);
  await expect(page.locator('html')).not.toHaveClass(/nav-open/);
  await toggle.click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('html')).not.toHaveClass(/nav-open/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('.desktop-nav a').first()).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(dialog).not.toBeVisible();
  await toggle.click();
  await expect(dialog).toBeVisible();
});

test('menu remains operable on narrow and short screens, with reduced motion', async ({ page }) => {
  await page.locator('#mobile-menu-toggle').click();
  const dialog = page.getByRole('dialog', { name: 'Explore' });
  for (const viewport of [{ width: 320, height: 568 }, { width: 667, height: 375 }, { width: 767, height: 600 }]) {
    await page.setViewportSize(viewport);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await expect(dialog).toBeVisible();
    const bounds = await dialog.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(dialog.getByRole('button', { name: 'Close', exact: true })).toBeInViewport();
    const contact = dialog.getByRole('link', { name: 'Contact me', exact: true });
    await dialog.getByRole('button', { name: 'Close', exact: true }).focus();
    await contact.focus();
    await expect(contact).toBeInViewport();
    const targets = await dialog.locator('a, button').evaluateAll(els => els.map(el => el.getBoundingClientRect().height));
    expect(targets.every(height => height >= 44)).toBe(true);
    expect(await dialog.locator('.mobile-supporting a').evaluateAll(els => els.every(el => el.scrollWidth <= el.clientWidth + 1))).toBe(true);
  }
  expect(await dialog.evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-menu-toggle')).toBeFocused();
});
