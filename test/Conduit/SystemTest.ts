import { Browser, Page } from 'playwright-core'
import { TestScope } from '../Framework/Perform/TestScope'
import { SystemHome } from './SystemHome'
import { UserLoginScript } from './User/UserLogin'
// import { UserLogoutScript } from './User/UserLogout'

export class SystemTest extends TestScope {
  public readonly home = new SystemHome()

  async start(browser: Browser): Promise<Page> {
    return this.home.start(browser)
  }

  // setup(target: TestTarget): void {
  //   target.setup(this.home)
  // }

  constructor() {
    super()
    this.Add('01', new UserLoginScript(this.home))
    // this.Add('02', new UserLogoutScript(this.home))
  }
}
