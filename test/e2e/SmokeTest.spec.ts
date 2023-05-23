import { test } from '@playwright/test'
import { SystemTest } from '../Conduit/SystemTest'

const e2e = new SystemTest()

test.describe('Smoke Testing', () => {
  test.beforeAll(async ({ page }) => {
    await e2e.startPage(page)
  })

  test('Login', async () => {
    await e2e.home.actions.Login()
  })

  /*   test.skip('Logout', async () => {
    await e2e.main.home.actions.Logout()
  }) */
})
