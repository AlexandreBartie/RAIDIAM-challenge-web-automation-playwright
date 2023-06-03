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
    await this.Home.SettingsLink.click()
    await this.Submit.click(2)
    await this.Home.AssertLogout()
    return success
  }
}

export class UserLogoutScript extends SystemScript<
  UserLogoutPage,
  UserLogoutData
> {
  name = 'User Logout'
  constructor(home: SystemHome) {
    super(home, UserLogoutPage, UserLogoutData)
  }

  setup(): void {
    this.addTestDefault('Should logout using valid data')
    // this.addScenario('Should different')
    // {
    //   this.addTestCaseOk('valid is Ok', {})
    //   this.addTestCaseOk('valid is Very good', {})
    // }
  }

  async run(flow: IDataFlowType, success = true): Promise<boolean> {
    let result = false

    if (await this.page.context()) {
      result = await this.page.run(this.getMerge(flow), success)
    }

    return result
  }
}
