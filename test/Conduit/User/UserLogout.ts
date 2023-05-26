import { IDataFlowType, TestData } from '../../Framework/Model/TestData'
import { SystemHome } from '../SystemHome'
import { SystemConnect } from '../SystemPage'
import { SystemScript } from '../SystemScript'

export class UserLogoutData extends TestData {
  name = 'Alexandre Silva'
  email = 'alexandre_bartie@hotmail.com'
  password = '1234567890'
  actions = 'SignIn'
  msg = ''
}

export class UserLogoutMapping extends SystemConnect {
  public Submit = this.SetButton('Or click here to logout.')
}

export class UserLogoutPage extends UserLogoutMapping {
  async run(flow: UserLogoutData, success = true): Promise<void> {
    await this.home.UserPageLink.click(flow.name)
    await this.home.SettingsLink.click()
    await this.Submit.click()
    this.Assert(success)
  }
}

export class UserLogoutScript extends SystemScript<
  UserLogoutPage,
  UserLogoutData
> {
  name = 'User Logout'
  constructor(home: SystemHome) {
    super(home)
    this.page = new UserLogoutPage()
    this.data = new UserLogoutData()

    this.page.SetHome(home)

    this.createTestCases()
  }

  private createTestCases(): void {
    this.addTestDefault('Should logout using valid data')
  }

  async run(flow: IDataFlowType, sucess: boolean): Promise<void> {
    await this.page.run(this.getMerge(flow), sucess)
  }
}
