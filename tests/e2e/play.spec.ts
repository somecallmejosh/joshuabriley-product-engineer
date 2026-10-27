import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { GAMES } from '../../src/lib/games';

const scan = async (page: Page) =>
  (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations.map(
    (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`,
  );

test('the /play/ index lists every game and scans clean', async ({ page }) => {
  // Resting state: scroll-reveal fades entries in, which axe would read mid-fade.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/play/');
  for (const game of GAMES) {
    await expect(page.getByRole('link', { name: game.title, exact: true })).toHaveAttribute('href', `/play/${game.slug}/`);
  }
  expect(await scan(page)).toEqual([]);
});

test('the contrast game runs on its own page without the 404 heading', async ({ page }) => {
  await page.goto('/play/contrast/');
  await expect(page.locator('[data-contrast-game]')).toBeVisible();
  await expect(page.getByRole('heading', { name: /While you're here/ })).toHaveCount(0);
  expect(await scan(page)).toEqual([]);
});

for (const game of GAMES.filter((g) => g.kind === 'quiz')) {
  test(`${game.title} plays start to finish by keyboard and scans clean`, async ({ page }) => {
    const total = game.kind === 'quiz' ? game.questions.length : 0;
    await page.goto(`/play/${game.slug}/`);
    const quiz = page.locator(`[data-quiz="${game.slug}"]`);
    await expect(quiz).toBeVisible();

    for (let i = 0; i < total; i++) {
      const question = quiz.locator(`[data-qz-question="${i}"]`);
      await expect(question).toBeVisible();
      if (i > 0) await expect(question.locator('.qz-prompt')).toBeFocused();
      expect(await scan(page)).toEqual([]);

      // Alternate between the first and last choice so both verdicts get exercised.
      const choices = question.locator('[data-choice]');
      const pick = i % 2 ? choices.last() : choices.first();
      await pick.focus();
      await page.keyboard.press('Enter');

      await expect(question.locator('[data-qz-verdict]')).toHaveText(/^(Right\.|Not quite\. The answer is .+\.)$/);
      await expect(question.getByText('Correct answer')).toHaveCount(1);
      await expect(quiz.locator('[data-qz-next]')).toBeFocused();
      expect(await scan(page)).toEqual([]);
      await page.keyboard.press('Enter');
    }

    await expect(quiz.locator('[data-qz-summary]')).toHaveText(new RegExp(`^You got \\d+ of ${total}\\.$`));
    await expect(quiz.locator('[data-qz-summary]')).toBeFocused();
    expect(await scan(page)).toEqual([]);

    await quiz.getByRole('button', { name: 'Play again' }).click();
    await expect(quiz.locator('[data-qz-question="0"] .qz-prompt')).toBeFocused();
    await expect(quiz.locator('[data-qz-question="0"] [data-choice]').first()).toBeEnabled();
  });
}

test('Tab order: reorder by keyboard, check, and finish all rounds', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/play/tab-order/');
  const game = page.locator('[data-tab-order]');
  await expect(game).toBeVisible();
  expect(await scan(page)).toEqual([]);

  // Round 1: move "Last name" (starts 4th) up to 2nd, keeping focus on its button.
  const round = game.locator('[data-to-round="0"]');
  const moveUp = round.getByRole('button', { name: 'Move Last name up' });
  await moveUp.click();
  await expect(moveUp).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(round.locator('[data-item]').nth(1)).toHaveAttribute('data-item', 'last');
  await expect(round.locator('[data-mock="last"] [data-badge]')).toHaveText('2');
  await round.getByRole('button', { name: 'Check the order' }).click();
  await expect(round.locator('[data-to-verdict]')).toHaveText('Right. Focus follows the layout.');
  await expect(game.locator('[data-to-next]')).toBeFocused();
  expect(await scan(page)).toEqual([]);

  for (let i = 1; i < 3; i++) {
    await page.keyboard.press('Enter');
    const r = game.locator(`[data-to-round="${i}"]`);
    await expect(r.locator('.game-prompt')).toBeFocused();
    await r.getByRole('button', { name: 'Check the order' }).click();
    await expect(r.locator('[data-to-verdict]')).toHaveText('Not quite.');
    await expect(r.locator('[data-to-answer]')).toContainText('The order should be:');
  }
  await page.keyboard.press('Enter');
  await expect(game.locator('[data-to-summary]')).toHaveText('You got 1 of 3 rounds right.');
  expect(await scan(page)).toEqual([]);
});

test('Fix the outline: live checks, verdict marks, finish', async ({ page }) => {
  await page.goto('/play/fix-the-outline/');
  const game = page.locator('[data-outline-game]');
  await expect(game).toBeVisible();
  const round = game.locator('[data-ol-round="0"]');
  await expect(round.locator('[data-ol-issues]')).toContainText('There are 2 h1 headings');
  expect(await scan(page)).toEqual([]);

  // Recipe target: 1, 2, 3, 2, 2 from a start of 1, 4, 2, 1, 3.
  await round.getByRole('button', { name: 'Raise Ingredients to h3' }).click();
  await round.getByRole('button', { name: 'Raise Ingredients to h2' }).click();
  await round.getByRole('button', { name: 'Lower Spices to h3' }).click();
  await round.getByRole('button', { name: 'Lower Method to h2' }).click();
  await round.getByRole('button', { name: 'Raise Serving to h2' }).click();
  await expect(round.locator('[data-ol-issues]')).toContainText('No structural problems');
  await round.getByRole('button', { name: 'Check the outline' }).click();
  await expect(round.locator('[data-ol-verdict]')).toHaveText('Right. That outline matches the page.');
  expect(await scan(page)).toEqual([]);

  for (let i = 1; i < 3; i++) {
    await game.locator('[data-ol-next]').click();
    const r = game.locator(`[data-ol-round="${i}"]`);
    await r.getByRole('button', { name: 'Check the outline' }).click();
    await expect(r.locator('[data-ol-verdict]')).toContainText('Not quite.');
    await expect(r.locator('[data-note]').filter({ hasText: /^Should be h\d$/ }).first()).toBeVisible();
  }
  await game.locator('[data-ol-next]').click();
  await expect(game.locator('[data-ol-summary]')).toHaveText('You fixed 1 of 3 outlines.');
  expect(await scan(page)).toEqual([]);
});

test('Snap to grid: nudge every piece on with buttons and arrow keys', async ({ page }) => {
  await page.goto('/play/snap-to-grid/');
  const game = page.locator('[data-snap-grid]');
  await expect(game).toBeVisible();
  await expect(game.locator('[data-status="heading"]')).toHaveText('3 pixels too far right, 3 pixels too high');
  expect(await scan(page)).toEqual([]);

  // Heading (27, 21): left 3, down 3. Card (35, 69): left 3, down 3. Button (141, 182): right 3, down 2.
  const pad = game.getByRole('group', { name: /Nudge the selected piece/ });
  const press = async (dir: string, times: number) => {
    for (let i = 0; i < times; i++) await pad.getByRole('button', { name: dir, exact: true }).click();
  };
  await press('Left', 3);
  await press('Down', 3);
  await expect(game.locator('[data-status="heading"]')).toHaveText('on the grid');
  await game.getByRole('radio', { name: /^Card/ }).check();
  await pad.getByRole('button', { name: 'Left', exact: true }).focus();
  for (const key of ['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowDown', 'ArrowDown', 'ArrowDown']) await page.keyboard.press(key);
  await expect(game.locator('[data-status="card"]')).toHaveText('on the grid');
  await game.getByRole('radio', { name: /^Button/ }).check();
  await expect(game.locator('[data-status="button"]')).toHaveText('3 pixels too far left, 2 pixels too high');
  await press('Right', 3);
  await press('Down', 2);

  await expect(game.locator('[data-sg-summary]')).toHaveText('All three pieces are on the grid. That took 17 nudges.');
  await expect(game.locator('[data-sg-summary]')).toBeFocused();
  expect(await scan(page)).toEqual([]);
});

test('Spot the drift: pick, check, and finish all rounds', async ({ page }) => {
  await page.goto('/play/spot-the-drift/');
  const game = page.locator('[data-drift-game]');
  await expect(game).toBeVisible();
  expect(await scan(page)).toEqual([]);

  const round = game.locator('[data-dg-round="0"]');
  await round.getByText('Compare the specs in text').click();
  await expect(round.getByRole('table')).toBeVisible();
  expect(await scan(page)).toEqual([]);
  for (const name of ['Padding', 'Corner radius', 'Border color']) await round.getByRole('checkbox', { name }).check();
  await round.getByRole('button', { name: 'Check my picks' }).click();
  await expect(round.locator('[data-dg-verdict]')).toHaveText("You found 2 of 3, plus 1 that didn't drift. Each option is marked.");
  await expect(round.locator('[data-option="icon-size"] [data-tag]')).toHaveText('Drifted, missed');
  await expect(game.locator('[data-dg-next]')).toBeFocused();
  expect(await scan(page)).toEqual([]);

  for (let i = 1; i < 3; i++) {
    await page.keyboard.press('Enter');
    await game.locator(`[data-dg-round="${i}"]`).getByRole('button', { name: 'Check my picks' }).click();
  }
  await page.keyboard.press('Enter');
  await expect(game.locator('[data-dg-summary]')).toHaveText('You found 2 of 9 drifted properties.');
  expect(await scan(page)).toEqual([]);
});

test('Just enough contrast: slider by keyboard, lock in, score all rounds', async ({ page }) => {
  await page.goto('/play/just-enough-contrast/');
  const game = page.locator('[data-just-enough]');
  await expect(game).toBeVisible();
  const slider = game.getByRole('slider', { name: 'Text strength' });
  await expect(slider).toHaveAttribute('aria-valuetext', '20%');
  expect(await scan(page)).toEqual([]);

  // Round 1 at 20% fails; round 2 at full strength passes with room to spare.
  await game.getByRole('button', { name: 'Lock it in' }).click();
  await expect(game.locator('[data-je-verdict]')).toContainText('fails, so no points');
  await expect(game.locator('[data-je-detail]')).toHaveText(/^You set 20%\. The lowest strength that passes here is \d+%\.$/);
  await expect(game.locator('[data-je-next]')).toBeFocused();
  expect(await scan(page)).toEqual([]);

  await page.keyboard.press('Enter');
  await expect(slider).toBeFocused();
  await page.keyboard.press('End');
  await expect(slider).toHaveAttribute('aria-valuetext', '100%');
  await game.getByRole('button', { name: 'Lock it in' }).click();
  await expect(game.locator('[data-je-verdict]')).toContainText('passes');

  await game.locator('[data-je-next]').click();
  await game.getByRole('button', { name: 'Lock it in' }).click();
  await game.locator('[data-je-next]').click();
  await expect(game.locator('[data-je-summary]')).toHaveText(/^You scored \d+ of 300\.$/);
  expect(await scan(page)).toEqual([]);
});

for (const game of GAMES.filter((g) => g.posts?.length)) {
  for (const post of game.posts!) {
    test(`/blog/${post}/ embeds ${game.title} after the article`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(`/blog/${post}/`);
      const embed = page.locator('.article-game');
      await expect(embed.getByRole('heading', { level: 2, name: `Try it: ${game.title}` })).toBeVisible();
      await expect(embed.getByRole('region', { name: 'Game' })).toBeVisible();
      expect(await scan(page)).toEqual([]);
    });
  }
}
