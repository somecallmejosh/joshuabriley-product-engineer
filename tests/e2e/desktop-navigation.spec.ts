import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.skip(({ isMobile }) => isMobile, 'The desktop navigation is hidden below md.');

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/tools/');
  await page.addStyleTag({ content: 'astro-dev-toolbar { display: none; }' });
});

test('menus open from the keyboard, follow reading order, and close on Escape', async ({ page }) => {
  const work = page.getByRole('button', { name: 'Work' });
  const panel = page.locator('#nav-panel-work');
  await expect(work).toHaveAttribute('data-current', '');
  await expect(panel).not.toBeVisible();
  await work.focus();
  await page.keyboard.press('Enter');
  await expect(work).toHaveAttribute('aria-expanded', 'true');
  await expect(panel).toBeVisible();
  await expect(panel.getByRole('link', { name: /^Tools/ })).toHaveAttribute('aria-current', 'page');
  await page.keyboard.press('Tab');
  await expect(panel.getByRole('link', { name: /^IVFCRYO/ })).toBeFocused();
  const violations = (await new AxeBuilder({ page }).include('.desktop-nav').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()).violations;
  expect(violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(panel).not.toBeVisible();
  await expect(work).toHaveAttribute('aria-expanded', 'false');
  await expect(work).toBeFocused();
});

test('hover moves between menus and leaving the nav closes it', async ({ page }) => {
  await page.getByRole('button', { name: 'Work' }).hover();
  await expect(page.locator('#nav-panel-work')).toBeVisible();
  await page.getByRole('button', { name: 'About' }).hover();
  await expect(page.locator('#nav-panel-about')).toBeVisible();
  await expect(page.locator('#nav-panel-work')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Work' })).toHaveAttribute('aria-expanded', 'false');
  await page.mouse.move(640, 700);
  await expect(page.locator('#nav-panel-about')).not.toBeVisible();
});

test('tabbing out of a panel to the next item closes the menu', async ({ page }) => {
  const about = page.getByRole('button', { name: 'About' });
  await about.click();
  await page.locator('#nav-panel-about').getByRole('link', { name: /^Testimonials/ }).focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Writing' })).toBeFocused();
  await expect(about).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#nav-panel-about')).not.toBeVisible();
});

test('the Writing menu teases the latest article and links to topic sections that exist', async ({ page }) => {
  await page.getByRole('button', { name: 'Writing' }).click();
  const panel = page.locator('#nav-panel-writing');
  await expect(panel).toBeVisible();
  const teaser = panel.locator('.nav-article');
  await expect(teaser).toHaveAttribute('href', /^\/blog\/[^/]+\/$/);
  const anchors = await panel.locator('.nav-link').evaluateAll((links) => links.map((a) => (a as HTMLAnchorElement).hash));
  expect(anchors.length).toBeGreaterThan(0);
  await page.goto('/blog/');
  for (const hash of anchors) await expect(page.locator(hash)).toHaveCount(1);
});
