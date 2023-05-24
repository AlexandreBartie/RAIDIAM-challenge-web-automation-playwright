import { WebTestPage } from '../Framework/Script/WebTestPage'
import { WebLink } from './SystemElement'
import { SystemMapping } from './SystemMapping'
import { UserLoginPage, UserLoginData } from './User/UserLogin'

export class SystemPage extends WebTestPage {
  public readonly map = new SystemMapping(this)
  public readonly home = new SystemHome(this)
}

export class SystemHome {
  public readonly page: SystemPage

  public HomePage: WebLink
  public SigninPage: WebLink
  public SignupPage: WebLink

  public NewArticlePage: WebLink
  public SettingsPage: WebLink
  public UserPage: WebLink
  public ProfilePage: WebLink

  public readonly actions = new SystemActions(this)

  constructor(page: SystemPage) {
    this.page = page
    this.HomePage = page.map.SetLink('Home')
    this.SigninPage = page.map.SetLink(' Sign in')
    this.SignupPage = page.map.SetLink(' Sign up')

    this.NewArticlePage = page.map.SetLink(' New Article')
    this.SettingsPage = page.map.SetLink(' Settings')
    this.UserPage = page.map.SetLink()
    this.ProfilePage = page.map.SetLink(' Edit Profile Settings')
  }
}

export class SystemActions {
  private home: SystemHome

  constructor(home: SystemHome) {
    this.home = home
  }
  async Login(): Promise<void> {
    const login = new UserLoginPage()
    login.SetPage(this.home.page.pageControl)
    await login.run(new UserLoginData())
  }

  // async Logout(): Promise<void> {
  //   const logout = new UserLogoutPage()
  //   logout.SetPage(this.home.page.pageControl)
  //   await logout.run(new UserLogoutData())
  // }
}
