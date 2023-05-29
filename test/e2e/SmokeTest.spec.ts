import { test, expect } from '@playwright/test'
import { SystemTest } from '../Conduit/SystemTest'

const e2e = new SystemTest()

test.describe('Smoke Testing', async () => {
  test.beforeAll(async ({ browser }) => {
    await e2e.home.start(browser)
  })

  test('Login', async () => {
    expect(await e2e.home.actions.Login()).toBeTruthy()
  })

  test('Logout', async () => {
    expect(await e2e.home.actions.Logout()).toBeTruthy()
  })
})
