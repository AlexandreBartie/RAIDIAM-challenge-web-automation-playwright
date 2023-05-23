import { WebTestPage } from '../Framework/Script/WebTestPage'
import { SystemMapping } from './SystemMapping'
import { UserLoginPage, UserLoginData } from './User/UserLogin'

export class SystemPage extends WebTestPage {
  public readonly map = new SystemMapping(this)
  public readonly actions = new SystemActions(this)

  public HomePage = this.map.SetLink('Home')
  public SigninPage = this.map.SetLink(' Sign in')
  public SignupPage = this.map.SetLink(' Sign up')
  public UserPage = this.map.SetLink()
  public ProfilePage = this.map.SetLink(' Edit Profile Settings')
}

export class SystemActions {
  private page: SystemPage

  constructor(page: SystemPage) {
    this.page = page
  }
  async Login(): Promise<void> {
    const login = new UserLoginPage()
    // login.SetPage()
    await login.run(new UserLoginData())
  }

  // async Logout(): Promise<void> {
  //   const login = new UserLogoutPage()

  //   await login.run(new UserLogoutData())
  // }
}
