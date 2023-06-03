import { test } from '@playwright/test'
import { SystemTest } from '../Conduit/SystemTest'

const e2e = new SystemTest()

test.describe(e2e.title, () => {
  for (const target of e2e.targets) {
    test.describe(target.title, async () => {
      test.beforeAll(async ({ browser }) => {
        await e2e.start(browser)
      })
      test.afterAll(async () => {
        await e2e.home.end()
      })

      target.setup()

      for (const scenario of target.scenarios)
        test.describe(scenario.title, () => {
          for (const testCase of scenario.tests) {
            test(testCase.title, async () => {
              await target.run(testCase)
            })
          }
        })
    })
  }
})
