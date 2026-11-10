import { test, expect } from '@playwright/test';

test('style guide demonstrates validation and busy feedback without submitting data', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const submissions: string[] = [];
  page.on('request', (request) => { if (request.method() === 'POST') submissions.push(request.url()); });
  await page.goto('/style-guide/');
  const form = page.locator('#sg-form');
  const button = form.locator('[data-submit]');
  await button.click();
  await expect(form.locator('#sg-error')).toBeVisible();
  await expect(form.getByLabel('Email', { exact: false })).toBeFocused();
  await expect(form.getByLabel('Email', { exact: false })).toHaveAttribute('aria-invalid', 'true');
  await form.getByLabel('Email', { exact: false }).fill('reader@example.com');
  await form.getByLabel('Message', { exact: false }).fill('Trying the documented form states.');
  await button.click();
  await expect(button).toHaveAttribute('aria-busy', 'true');
  await expect(button).toBeDisabled();
  await expect(button.locator('[data-submit-loading-label]')).toBeVisible();
  await expect(button.locator('[data-submit-label]')).toBeHidden();
  await expect(form.locator('#sg-success')).toBeVisible();
  await expect(form.locator('#sg-success')).toBeFocused();
  await expect(button).toBeEnabled();
  expect(submissions).toEqual([]);
});

test('style guide examples, catalogue, and media viewer work with the keyboard', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/style-guide/');
  const markup = page.locator('.sg-markup').first();
  await markup.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(markup).toHaveAttribute('open', '');
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => {} } }));
  await markup.locator('[data-copy-button]').click();
  await expect(markup.locator('[data-copy-status]')).toHaveText('Copied to clipboard');
  const catalogue = page.locator('.sg-catalogue-group').first();
  await catalogue.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(catalogue).toHaveAttribute('open', '');
  await expect(catalogue.getByRole('link', { name: 'See Header in use' })).toBeVisible();
  const zoom = page.locator('.plate__zoom');
  await zoom.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Artifact viewer' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Artifact viewer' })).toBeHidden();
  await expect(zoom).toBeFocused();
  await page.getByRole('button', { name: 'Replay entry motion' }).click();
  await expect(page.locator('[data-guide-motion-status]')).toContainText('Reduced motion is enabled');
  expect(await page.locator('[data-guide-motion]').evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
});

test('style guide jump strip stays pinned and lands each section below it', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/style-guide/');
  const strip = page.getByRole('navigation', { name: 'Style guide sections' });
  await expect(strip).toHaveCSS('position', 'sticky');
  const link = strip.getByRole('link', { name: /^Index/ });
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(page).toHaveURL(/#index$/);
  const heading = page.locator('#index-title');
  await expect(heading).toBeInViewport();
  const stripBox = await strip.boundingBox();
  const headingBox = await heading.boundingBox();
  expect(headingBox!.y).toBeGreaterThanOrEqual(stripBox!.y + stripBox!.height);
});

test('component index filter narrows results and shows an empty state', async ({ page }) => {
  await page.goto('/style-guide/');
  const filter = page.getByLabel('Filter components');
  await filter.fill('submitbutton');
  const visible = page.locator('[data-catalogue-item]:visible');
  await expect(visible).toHaveCount(1);
  await expect(visible.getByRole('heading', { name: 'SubmitButton' })).toBeVisible();
  await expect(page.locator('[data-catalogue-count]')).toContainText('1 component match');
  await filter.fill('zzzz');
  await expect(page.locator('[data-catalogue-empty]')).toBeVisible();
  await filter.fill('');
  await expect(page.locator('[data-catalogue-empty]')).toBeHidden();
});

test('system.json exposes tokens, rules, and component props', async ({ request }) => {
  const response = await request.get('/style-guide/system.json');
  expect(response.ok()).toBe(true);
  const data = await response.json();
  expect(data.tokens.color.accent.$value).toBe('#2E5C8A');
  expect(data.rules.guidelines.length).toBeGreaterThan(0);
  const field = data.components.find((component: { name: string }) => component.name === 'Field');
  expect(field.props.find((prop: { name: string }) => prop.name === 'label')).toMatchObject({ required: true, type: 'string' });
});
