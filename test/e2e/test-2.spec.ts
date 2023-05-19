import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/#');
  await page.goto('http://localhost:8080/#/');
  await page.getByRole('link', { name: ' Sign in' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('sss');
  await page.getByRole('button', { name: 'Sign in' }).click();
});
