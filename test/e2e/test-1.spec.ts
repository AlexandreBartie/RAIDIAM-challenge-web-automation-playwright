import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/#');
  await page.goto('http://localhost:8080/#/');
  await page.getByRole('link', { name: ' Sign in' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('´pkopipiópjiopiop');
  await page.getByText('password can\'t be blank').dblclick();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('o');
  await page.locator('div').filter({ hasText: 'Sign in Need an account? password can\'t be blank Sign in' }).nth(3).click();
  await page.getByPlaceholder('Email').dblclick();
  await page.getByPlaceholder('Email').fill('');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('');
  await page.getByText('password can\'t be blank').click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('~[´´´[´[');
  await page.getByPlaceholder('Email').click({
    clickCount: 3
  });
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('´gggg');
  await page.getByPlaceholder('Email').click();
  await page.getByRole('button', { name: 'Si
  await page.getByRole('list').filter({ hasText: 'email or password is invalid' }).click();
  await page.getByRole('list').filter({ hasText: 'email or password is invalid' }).click({
    button: 'right'
  });
  await page.getByText('email or password is invalid').click();
  await page.getByText('email or password is invalid').click({
    button: 'right'
  });
  await page.getByText('email or password is invalid').click();
  await page.getByText('email or password is invalid').click();
  await page.getByText('email or password is invalid').click({
    button: 'right'
  });
  await page.getByText('email or password is invalid').nth(1).click();
  await page.getByRole('list').filter({ hasText: 'email or password is invalid' }).click({
    button: 'right'
  });
  await page.getByText('email or password is invalid').click();
  await page.getByRole('list').filter({ hasText: 'email or password is invalid' }).click();gn in' }).click();
  await page.getByText('email or password is invalid').click();
  await page.getByText('email or password is invalid').click();
  await page.getByText('email or password is invalid').click();
  await page.getByRole('list').filter({ hasText: 'email or password is invalid' }).click({
    button: 'right'
  });
});
