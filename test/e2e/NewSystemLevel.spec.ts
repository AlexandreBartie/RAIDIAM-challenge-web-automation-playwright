import { test } from '@playwright/test'
import { SystemTest } from '../Conduit/SystemTest'

const e2e = new SystemTest()

for (const target of e2e.targets)
  test.describe(target.title, () => {
    test.beforeAll(async ({ browser }) => {
      target.script.setup(await e2e.main.start(browser))
    })

    for (const testCase of target.testCases) {
      test(testCase.title, async () => {
        await target.run(testCase.data, testCase.success)
      })
    }
  })
