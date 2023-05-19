import { Browser, Page } from 'playwright-core'
import { WebTestScope } from '../Framework/Perform/WebTestScope'
import { MainPage } from './MainPage'
import { UserLoginScript } from './User/UserLogin'
import { WebTestTarget } from '../Framework/Perform/WebTestTarget'

export class SystemTest {
  private main = new MainPage()

  private scope = new WebTestScope(this.main)

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
