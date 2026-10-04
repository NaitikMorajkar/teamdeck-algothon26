import { test, expect } from '@playwright/test';

test('workspace exposes board, Today and Copilot surfaces', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Make the next move obvious.')).toBeVisible();
  await page.getByRole('button', { name: 'At risk', exact: true }).click();
  await expect(page.getByRole('button', { name: 'At risk', exact: true })).toBeVisible();
  await page.getByRole('button', { name: /Open Project Copilot/ }).click();
  await expect(page.getByText('Project Copilot')).toBeVisible();
  await page.getByRole('button', { name: /What is late/ }).click();
  await expect(page.getByText(/Two tasks need attention/)).toBeVisible();
});
