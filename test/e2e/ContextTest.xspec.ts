import { test, expect } from '@playwright/test'
import { e2e } from '../Conduit/SystemTest'

test.skip('Context Testing', async () => {
  test.beforeAll(async ({ browser }) => {
    await e2e.home.start(browser)
  })

  test.afterAll(async () => {
    await e2e.home.end()
  })

  test('Login', async () => {
    expect(await e2e.home.actions.Login()).toBeTruthy()
  })

  test('Logout', async () => {
    expect(await e2e.home.actions.Logout()).toBeTruthy()
  })
})
