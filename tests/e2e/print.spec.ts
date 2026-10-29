import { test, expect } from '@playwright/test';

test('print content retains an inner gutter when named page margins are unavailable', async ({ page }) => {
  await page.goto('/blog/where-to-learn-modern-front-end/');
  await page.setViewportSize({ width: 650, height: 950 });
  await page.emulateMedia({ media: 'print' });
  await page.addStyleTag({ content: '@media print { body { page: auto !important; } }' });
  const insets = await page.locator('#main').evaluate(element => {
    const bounds = element.getBoundingClientRect();
    return { left: bounds.left, right: innerWidth - bounds.right };
  });
  expect(insets.left).toBeGreaterThanOrEqual(15);
  expect(insets.right).toBeGreaterThanOrEqual(15);
  await page.emulateMedia({ media: 'screen' });
  expect(await page.locator('body').evaluate(element => getComputedStyle(element).paddingLeft)).toBe('0px');
});

test('print headings and prose share one centered 70ch body measure', async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 950 });
  const examples = [
    ['/', '.hero-lede'],
    ['/about/', '.page-lede'],
    ['/projects/ivfcryo/', '.project-introduction > p'],
    ['/blog/where-to-learn-modern-front-end/', '.article-prose .lede'],
    ['/resume/', '.experience-lead'],
    ['/tools/roi-calculator/', '.tool-instructions'],
  ];
  for (const [path, prose] of examples) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: 'print' });
    const measure = await page.locator('body').evaluate(body => {
      const probe = document.createElement('div');
      probe.style.cssText = 'width:70ch;font:inherit;position:absolute;visibility:hidden;padding:0;border:0;';
      body.append(probe);
      const expected = probe.getBoundingClientRect().width;
      probe.remove();
      const bounds = body.getBoundingClientRect();
      return { expected, width: bounds.width, left: bounds.left, right: bounds.right, viewport: innerWidth };
    });
    expect(Math.abs(measure.width - measure.expected), path).toBeLessThan(1);
    expect(Math.abs(measure.left - (measure.viewport - measure.right)), path).toBeLessThan(1);
    for (const selector of ['#main h1:visible', prose]) {
      const bounds = await page.locator(selector).first().boundingBox();
      expect(bounds, path).not.toBeNull();
      expect(Math.abs(bounds!.x - measure.left), `${path}: ${selector}`).toBeLessThan(1);
      expect(Math.abs(bounds!.width - measure.width), `${path}: ${selector}`).toBeLessThan(1);
    }
    await page.emulateMedia({ media: 'screen' });
  }
});

test('printed sections use whitespace while table structure remains readable', async ({ page }) => {
  await page.goto('/blog/where-to-learn-modern-front-end/');
  await page.emulateMedia({ media: 'print' });
  for (const selector of ['.print-masthead', '#courses', '.reading-resources > li', '.print-colophon']) {
    const borders = await page.locator(selector).first().evaluate(element => {
      const style = getComputedStyle(element);
      return [style.borderTopWidth, style.borderBottomWidth];
    });
    expect(borders).toEqual(['0px', '0px']);
  }
  expect(await page.locator('#courses').evaluate(element => parseFloat(getComputedStyle(element).marginTop))).toBeGreaterThan(40);
  expect(await page.locator('.reading-resources > li').first().evaluate(element => parseFloat(getComputedStyle(element).paddingTop))).toBeGreaterThan(10);
  await page.goto('/blog/future-proofing-front-end-dev-roles/');
  await page.emulateMedia({ media: 'print' });
  expect(await page.locator('.article-table th').first().evaluate(element => parseFloat(getComputedStyle(element).borderBottomWidth))).toBeGreaterThan(0);
});

test('printing expands case-study disclosures and restores their screen state', async ({ page }) => {
  await page.goto('/projects/ivfcryo/');
  const details = page.locator('.summary-more');
  await expect(details).not.toHaveAttribute('open');
  const lazyImages = await page.locator('#main img[loading="lazy"]').count();
  await page.emulateMedia({ media: 'print' });
  await expect(details).toHaveAttribute('open');
  await expect(page.locator('#main img[loading="lazy"]')).toHaveCount(0);
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('.print-masthead')).toBeVisible();
  await page.emulateMedia({ media: 'screen' });
  await expect(details).not.toHaveAttribute('open');
  await expect(page.locator('#main img[loading="lazy"]')).toHaveCount(lazyImages);
  await expect(page.locator('.print-masthead')).toBeHidden();
  await details.locator('summary').click();
  await page.emulateMedia({ media: 'print' });
  await page.emulateMedia({ media: 'screen' });
  await expect(details).toHaveAttribute('open');
});

test('printed reading lists retain unique numbered destinations without duplicating on repeated events', async ({ page }) => {
  await page.goto('/blog/where-to-learn-modern-front-end/');
  await page.emulateMedia({ media: 'print' });
  const references = page.locator('[data-print-references] li');
  await expect(references).toHaveCount(40);
  const count = await page.locator('.print-link-marker').count();
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  await expect(references).toHaveCount(40);
  await expect(page.locator('.print-link-marker')).toHaveCount(count);
  await expect(page.locator('[data-print-references] a').first()).toHaveAttribute('href', 'https://master.dev/');
  await page.emulateMedia({ media: 'screen' });
  await expect(references).toHaveCount(0);
  await expect(page.locator('.print-link-marker')).toHaveCount(0);
});

test('print keeps the current assessment answers and fits article tables to paper', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/tools/scorecard/');
  const answer = page.locator('.choice input[value="2"]').first();
  await answer.locator('..').click();
  await expect(page.locator('[data-total-score]')).toHaveText('2');
  await page.emulateMedia({ media: 'print' });
  await expect(answer).toBeChecked();
  await expect(page.locator('[data-total-score]')).toHaveText('2');
  await expect(page.locator('#resetBtn')).toBeHidden();
  expect(await answer.locator('..').evaluate(el => getComputedStyle(el).outlineStyle)).toBe('solid');
  await page.emulateMedia({ media: 'screen' });
  await expect(answer).toBeChecked();

  await page.goto('/blog/future-proofing-front-end-dev-roles/');
  await page.setViewportSize({ width: 650, height: 950 });
  await page.emulateMedia({ media: 'print' });
  const table = page.locator('.article-table').first();
  expect(await table.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  expect(await table.locator('thead').evaluate(el => getComputedStyle(el).display)).toBe('table-header-group');
});

test('headings print as plain text and the dedicated resume renderer stays independent', async ({ page }) => {
  await page.goto('/');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('#main h1')).toHaveText('Helping teams ship the right product.');
  await page.goto('/resume-print/');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('body')).toHaveAttribute('data-print-layout', 'document');
  await expect(page.locator('.print-masthead')).toHaveCount(0);
  expect(await page.locator('.doc').evaluate(el => getComputedStyle(el).fontSize)).toBe('12.2667px');
});

test('printed tool sources retain shareable settings and restore the canonical address afterward', async ({ page }) => {
  await page.goto('/tools/scorecard/');
  const count = await page.locator('.q-row').count();
  const ratings = '1'.repeat(count);
  await page.goto(`/tools/scorecard/results/?r=${ratings}`);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('[data-print-source]')).toContainText(`?r=${ratings}`);
  await expect(page.locator('[data-countup]')).toHaveText(String(count));
  expect(await page.locator('.radar-data').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  expect(await page.locator('.bd-row').evaluateAll(rows => rows.every(row => getComputedStyle(row).opacity === '1'))).toBe(true);
  await page.emulateMedia({ media: 'screen' });
  await expect(page.locator('[data-print-source]')).not.toContainText('?r=');
});
