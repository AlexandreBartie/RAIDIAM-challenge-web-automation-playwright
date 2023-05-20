import { TestData } from '../../Framework/Design/TestData'
import { SystemMain } from '../SystemMain'

export class UserLogoutData extends TestData {
  name = 'Alexandre Silva'
}

export class UserLogoutMapping extends SystemMain {
  public Logout = this.map.SetButton('Or click here to logout.')
}

export class UserLogoutPage extends UserLogoutMapping {
  async run(flow: UserLogoutData): Promise<void> {
    this.home.ProfilePage.AssertHasText(flow.name)

    this.Logout.click()

    this.home.SignupPage.AssertExist()
  }
}
