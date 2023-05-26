import { Browser, Page } from 'playwright-core'
import { SystemPage } from './SystemPage'
import { SystemSettings } from './SystemSettings'
import { UserLoginPage, UserLoginData } from './User/UserLogin'
import { UserLogoutPage, UserLogoutData } from './User/UserLogout'

export class SystemHome extends SystemPage {
  public HomeLink = this.SetLink('Home')
  public SigninLink = this.SetLink(' Sign in')
  public SignupLink = this.SetLink(' Sign up')

  public NewArticleLink = this.SetLink(' New Article')
  public SettingsLink = this.SetLink(' Settings')
  public UserPageLink = this.SetLink()
  public ProfileLink = this.SetLink(' Edit Profile Settings')

  public readonly settings = new SystemSettings()

  public readonly actions = new SystemActions(this)

  async start(browser: Browser): Promise<Page> {
    return this.SetDriver(await this.settings.start(browser))
  }
}

export class SystemActions {
  private home: SystemHome

  constructor(home: SystemHome) {
    this.home = home
  }
  async Login(): Promise<void> {
    const login = new UserLoginPage()
    login.SetHome(this.home)
    await login.run(new UserLoginData())
  }

  async Logout(): Promise<void> {
    const logout = new UserLogoutPage()
    logout.SetHome(this.home)
    await logout.run(new UserLogoutData())
  }
}
