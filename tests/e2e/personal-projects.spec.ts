import { test, expect } from '@playwright/test';

const pages = ['beckit', 'clempo', 'rudiment-ui', 'token-galaga'];

for (const slug of pages) {
  test(`${slug} is a scrapbook page, not a case study`, async ({ page }) => {
    await page.goto(`/personal-projects/${slug}/`);
    await expect(page.getByRole('heading', { name: 'What I got to play with' })).toBeVisible();
    await expect(page.locator('.project-figures, .project-facts, #outcomes, #tldr')).toHaveCount(0);
  });
}

test('the personal listing has no client-work rows or labels', async ({ page }) => {
  await page.goto('/personal-projects/');
  await expect(page.locator('.work-entry')).toHaveCount(0);
  await expect(page.locator('.scrap-piece')).toHaveCount(4);
  await expect(page.getByText(/Personal project ·/)).toHaveCount(0);
});

test('client case studies do not lead into personal projects', async ({ page }) => {
  await page.goto('/projects/logatot/');
  await expect(page.locator('.project-next-link')).toHaveAttribute('href', '/projects/vmspark/');
});
