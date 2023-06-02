import { IDataFlowType, TestData } from '../../Framework/Model/TestData'
import { SystemHome } from '../SystemHome'
import { SystemPage } from '../SystemPage'
import { SystemScript } from '../SystemScript'

export class UserLogoutData extends TestData {
  name = 'Alexandre Silva'
  email = 'alexandre_bartie@hotmail.com'
  password = '1234567890'
  actions = 'SignIn'
  msg = ''
}

export class UserLogoutPage extends SystemPage {
  public Submit = this.SetButton('Or click here to logout.')
  async context(): Promise<boolean> {
    return await this.setContextLogin()
  }
  async run(flow: UserLogoutData, success = true): Promise<boolean> {
    await this.home.SettingsLink.click()
    await this.Submit.click()
    return success
  }
}

export class UserLogoutScript extends SystemScript<
  UserLogoutPage,
  UserLogoutData
> {
  name = 'User Logout'
  constructor(home: SystemHome) {
    super(UserLogoutPage, UserLogoutData)
    this.page.SetHome(home)
  }

  setup(): void {
    this.addTestDefault('Should logout using valid data')
  }

  async run(flow: IDataFlowType, success = true): Promise<boolean> {
    this.page.context()
    return await this.page.run(this.getMerge(flow), success)
  }
}
