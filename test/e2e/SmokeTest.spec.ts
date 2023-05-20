import { test } from '@playwright/test'
import { SystemTest } from '../Conduit/SystemTest'

const e2e = new SystemTest()

test.describe('Smoke Testing', () => {
  test.beforeAll(async ({ browser }) => {
    e2e.start(browser)
  })

  test('Login', async () => {
    e2e.main.home.actions.Login()
  })

  /*   test.skip('Logout', async () => {
    await e2e.main.home.actions.Logout()
  }) */
})
