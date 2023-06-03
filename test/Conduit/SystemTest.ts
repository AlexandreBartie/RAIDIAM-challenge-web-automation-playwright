import { Browser, Page } from 'playwright-core'
import { TestScope } from '../Framework/Perform/TestScope'
import { SystemHome } from './SystemHome'
import { UserLoginScript } from './User/UserLogin'
import { TestTarget } from '../Framework/Perform/TestTarget'
// import { UserLogoutScript } from './User/UserLogout'

export class SystemTest extends TestScope {
  public readonly home = new SystemHome()

  private target: TestTarget

  async start(browser: Browser): Promise<Page> {
    return this.home.start(browser)
  }

  constructor() {
    super()
    this.Add('01', new UserLoginScript(this.home))
    // this.Add('02', new UserLogoutScript(this.home))
  }
}
