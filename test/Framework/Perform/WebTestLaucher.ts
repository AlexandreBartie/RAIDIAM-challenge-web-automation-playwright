import { test } from '@playwright/test'

import { IWebTestScript } from '../Script/WebTestScript'
import { WebTestScope } from './WebTestScope'
import { WebTestBrowser } from '../Script/WebTestBrowser'

export class WebTestLaucher {
  readonly scope: WebTestScope

  constructor(main: WebTestBrowser) {
    this.scope = new WebTestScope(main)
  }

  run(script: IWebTestScript): void {
    test.describe(script.name, () => {
      test.beforeAll(async ({ browser }) => {
        script.setup(await this.scope.start(browser))
      })

      for (const testCase of script.testCases) {
        test(testCase.title, async () => {
          await script.run(testCase.data)
        })
      }
    })
  }
}
