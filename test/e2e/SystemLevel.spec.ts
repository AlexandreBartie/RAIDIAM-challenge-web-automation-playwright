import { test } from '@playwright/test'
import { SystemTest } from '../Conduit/SystemTest'

const e2e = new SystemTest()

for (const target of e2e.targets)
  test.describe(target.title, async () => {
    test.beforeAll(async ({ browser }) => {
      await e2e.start(browser)
    })

    // e2e.setup(target)

    for (const testCase of target.tests) {
      test(testCase.title, async () => {
        await target.run(testCase.data, testCase.success)
      })
    }
  })
