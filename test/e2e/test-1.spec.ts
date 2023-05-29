import { test } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/#/')
  await page.getByRole('link', { name: 'Home' }).click()
  await page.getByRole('link', { name: 'Sign in' }).click()

  const x = page.getByPlaceholder('Email')

  const regexA = new RegExp('Sign in') // Regular expression to match "Sign in" case-insensitively
  const regexZ = new RegExp('Settings')

  const aLocator = page.getByRole('link', { name: regexA })
  const zLocator = page.getByRole('link', { name: regexZ })

  await x.fill('alexandre_bartie@hotmail.com')

  let aVisible = await aLocator.isVisible()
  let zVisible = await zLocator.isVisible()

  console.log(aVisible, zVisible)

  await page.getByPlaceholder('Password').fill('1234567890')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.getByRole('link', { name: 'New Article' }).click()
  await page.getByRole('link', { name: 'Home' }).click()
  await page.getByRole('link', { name: 'Settings' }).click()

  aVisible = await aLocator.isVisible()
  zVisible = await zLocator.isVisible()

  console.log(aVisible, zVisible)

  console.log('stop')
})
