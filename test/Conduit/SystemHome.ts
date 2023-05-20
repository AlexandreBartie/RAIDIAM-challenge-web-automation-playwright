import { WebLink } from './SystemElement'
import { SystemMain } from './SystemMain'
import { UserLoginPage, UserLoginData } from './User/UserLogin'
// import { UserLogoutPage, UserLogoutData } from './User/UserLogout'

export class SystemHome {
  private main: SystemMain

  public HomePage: WebLink
  public SigninPage: WebLink
  public SignupPage: WebLink
  public UserPage: WebLink
  public ProfilePage: WebLink

  public readonly actions = new SystemHomeActions()

  constructor(main: SystemMain) {
    this.main = main

    this.HomePage = this.main.map.SetLink('Home')
    this.SigninPage = this.main.map.SetLink(' Sign in')
    this.SignupPage = this.main.map.SetLink(' Sign up')
    this.UserPage = this.main.map.SetLink()
    this.ProfilePage = this.main.map.SetLink(' Edit Profile Settings')
  }
}

export class SystemHomeActions {
  async Login(): Promise<void> {
    const login = new UserLoginPage()

    await login.run(new UserLoginData())
  }

  // async Logout(): Promise<void> {
  //   const login = new UserLogoutPage()

  //   await login.run(new UserLogoutData())
  // }
}
