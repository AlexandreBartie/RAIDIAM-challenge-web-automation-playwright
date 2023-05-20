import { test } from '@playwright/test'

import { SystemHome } from '../Conduit/SystemHome'
import { UserLoginScript } from '../Conduit/User/UserLogin'

const main = new SystemHome()

const script = new UserLoginScript()

test.describe(script.name, () => {
  test.beforeAll(async ({ browser }) => {
    script.setup(await main.start(browser))
  })

  for (const testCase of script.testCases) {
    test(testCase.title, async () => {
      await script.run(testCase.data, testCase.success)
    })
  }
})
