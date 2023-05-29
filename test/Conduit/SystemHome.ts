import { Browser, Page } from 'playwright-core'
import { SystemConnect } from './SystemPage'
import { SystemSettings } from './SystemSettings'
import { UserLoginScript } from './User/UserLogin'
import { UserLogoutScript } from './User/UserLogout'
import { SystemContext } from './SystemContext'

export class SystemHome extends SystemConnect {
  public HomeLink = this.SetLink('Home')
  public SigninLink = this.SetLink('Sign in')
  public SignupLink = this.SetLink('Sign up')

  public NewArticleLink = this.SetLink('New Article')
  public SettingsLink = this.SetLink('Settings')
  public UserPageLink = this.SetLink()
  public ProfileLink = this.SetLink('Edit Profile Settings')

  public readonly settings = new SystemSettings()

  public readonly actions = new SystemActions(this)

  public readonly context = new SystemContext(this)

  async start(browser: Browser): Promise<Page> {
    return this.SetDriver(await this.settings.start(browser))
  }

  async isLoggin(): Promise<boolean> {
    const isLoggin = this.SettingsLink.isVisible()
    return isLoggin
  }

  async isLoggout(): Promise<boolean> {
    const isLoggout = !this.isLoggin()
    return isLoggout
  }

  async AssertLogin(userName: string): Promise<boolean> {
    try {
      this.HomeLink.AssertIsVisible()
      this.NewArticleLink.AssertIsVisible()
      this.SettingsLink.AssertIsVisible()
      this.ProfileLink.AssertIsVisible(userName)
      return true
    } catch {
      return false
    }
  }
}

export class SystemActions {
  private home: SystemHome

  constructor(home: SystemHome) {
    this.home = home
  }
  async Login(): Promise<boolean> {
    const login = new UserLoginScript(this.home)
    return await login.runDefault()
  }

  async Logout(): Promise<boolean> {
    const logout = new UserLogoutScript(this.home)
    return await logout.runDefault()
  }
}
