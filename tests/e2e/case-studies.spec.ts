import { test, expect } from '@playwright/test';

// A lede is optional, but no section of a case study may have more than one.
const LEDE = '.case-lede, .case-prose--lede';

for (const slug of ['vmspark', 'ivfcryo', 'logatot']) {
  test(`${slug} has at most one lede per section`, async ({ page }) => {
    await page.goto(`/projects/${slug}/`);
    const counts = await page.locator('main section').evaluateAll((sections, sel) =>
      sections.map((s) => ({ id: s.id || s.className, n: s.querySelectorAll(sel).length })), LEDE);
    expect(counts.filter((c) => c.n > 1)).toEqual([]);
  });
}
