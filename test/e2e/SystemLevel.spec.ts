import { test } from '@playwright/test'
import { e2e } from '../Conduit/SystemTest'

console.log(e2e.title)

test.describe(e2e.title, async () => {
  for (const target of e2e.targets) {
    target.setup()

    test.describe(target.title, async () => {
      test.beforeAll(async ({ browser }) => {
        await e2e.start(browser)
      })
      test.afterAll(async () => {
        await e2e.home.end()
      })

      for (const scenario of target.scenarios)
        test.describe(scenario.title, async () => {
          for (const testCase of scenario.tests) {
            test(testCase.title, async () => {
              await target.run(testCase)
            })
          }
        })
    })
  }
})
