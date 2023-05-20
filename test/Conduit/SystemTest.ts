import { Browser, Page } from 'playwright-core'
import { WebTestScope } from '../Framework/Perform/WebTestScope'
import { UserLoginScript } from './User/UserLogin'
import { WebTestTarget } from '../Framework/Perform/WebTestTarget'
import { SystemMain } from './SystemMain'

export class SystemTest {
  public readonly main = new SystemMain()

  private scope = new WebTestScope()

  get targets(): Array<WebTestTarget> {
    return this.scope.targets
  }

  constructor() {
    this.scope.Add('01', new UserLoginScript())
  }

  start(browser: Browser): Promise<Page> {
    return this.main.start(browser)
  }
}
