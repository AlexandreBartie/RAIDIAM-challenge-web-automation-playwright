import { Browser, Page } from 'playwright-core'

import { WebTestScope } from '../Framework/Perform/WebTestScope'
import { UserLoginScript } from './User/UserLogin'
import { WebTestTarget } from '../Framework/Perform/WebTestTarget'
import { SystemSettings } from './SystemSettings'
import { SystemPage } from './SystemPage'

export class SystemTest {
  public readonly page = new SystemPage()

  public readonly settings = new SystemSettings()

  private scope = new WebTestScope()

  get targets(): Array<WebTestTarget> {
    return this.scope.targets
  }

  constructor() {
    this.scope.Add('01', new UserLoginScript())
  }

  async start(browser: Browser): Promise<Page> {
    return this.page.SetPage(await this.settings.start(browser))
  }
}
