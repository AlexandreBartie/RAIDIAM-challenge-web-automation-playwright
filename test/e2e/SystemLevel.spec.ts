import { test } from '@playwright/test'

import { MainPage } from '../Conduit/MainPage'
import { UserLoginScript } from '../Conduit/User/UserLogin'

const main = new MainPage()

const script = new UserLoginScript()

test.describe(script.name, () => {
  test.beforeAll(async ({ browser }) => {
    script.setup(await main.start(browser))
  })

  for (const testCase of script.testCases) {
    test(testCase.title, async () => {
      await script.run(testCase.data)
    })
  }
})
