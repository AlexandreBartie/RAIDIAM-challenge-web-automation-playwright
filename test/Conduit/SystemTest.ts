import { Browser, Page } from 'playwright-core'
import { TestScope } from '../Framework/Perform/TestScope'
import { SystemHome } from './SystemHome'
import { UserLoginScript } from './User/UserLogin'
import { TestTarget } from '../Framework/Perform/TestTarget'

class SystemTest extends TestScope {
  public readonly home = new SystemHome()

  private target: TestTarget

  async start(browser: Browser): Promise<Page> {
    return await this.home.start(browser)
  }

  setup() {
    this.Add('01', new UserLoginScript(this.home))
    this.Add('01.a', new UserLoginScript(this.home))
    // this.Add('01.b', new UserLoginScript(this.home))
    // this.Add('02', new UserLogoutScript(this.home))
  }
}

const e2e = new SystemTest('SystemTest-Level')

export { e2e }
