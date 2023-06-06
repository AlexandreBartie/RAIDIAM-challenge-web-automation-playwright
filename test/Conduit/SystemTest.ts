import { Browser, Page } from 'playwright-core'
import { TestScope } from '../Framework/Perform/TestScope'
import { SystemHome } from './SystemHome'
import { UserLoginScript } from './User/UserLogin'
import { TestTarget } from '../Framework/Perform/TestTarget'
import { UserLogoutScript } from './User/UserLogout'

class SystemTest extends TestScope {
  public readonly home = new SystemHome()

  private target: TestTarget

  async start(browser: Browser): Promise<Page> {
    return await this.home.start(browser)
  }

  constructor(title: string) {
    super(title)
    this.Add('01', new UserLoginScript(this.home))
    this.Add('02', new UserLogoutScript(this.home))
  }
}

const e2e = new SystemTest('Autotest: System Level')

export { e2e }
