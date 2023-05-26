import { test } from '@playwright/test'
import { SystemTest } from '../Conduit/SystemTest'

const e2e = new SystemTest()

test.describe('Smoke Testing', () => {
  test.beforeAll(async ({ browser }) => {
    await e2e.home.start(browser)
  })

  test('Login', async () => {
    await e2e.home.actions.Login()
  })

  test('Logout', async () => {
    await e2e.home.actions.Logout()
  })
})
