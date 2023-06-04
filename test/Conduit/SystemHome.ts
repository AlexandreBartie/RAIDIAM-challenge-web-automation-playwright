import { Browser, Page } from 'playwright-core'
import { SystemConnect } from './SystemPage'
import { SystemSettings } from './SystemSettings'
import { UserLoginScript } from './User/UserLogin'
import { UserLogoutScript } from './User/UserLogout'
import { SystemContext } from './SystemContext'
import { logger } from '../Framework/Script/TestLogger'

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
    const page = await this.settings.start(browser)
    return this.SetDriver(page)
  }

  async isLoggin(): Promise<boolean> {
    const isLoggin = await this.SettingsLink.isVisible()
    const isLoggout = await this.SigninLink.isVisible()
    logger.info('Check: ', isLoggin, isLoggout)
    return isLoggin
  }

  async isLoggout(): Promise<boolean> {
    const isLoggin = await this.SettingsLink.isVisible()
    const isLoggout = await this.SigninLink.isVisible()
    logger.info('Check: ', isLoggin, isLoggout)
    return isLoggout
  }

  async AssertLogin(userName: string): Promise<boolean> {
    try {
      await this.HomeLink.AssertIsVisible()
      await this.NewArticleLink.AssertIsVisible()
      await this.SettingsLink.AssertIsVisible()
      await this.ProfileLink.AssertIsVisible(userName)
      return true
    } catch {
      return false
    }
  }

  async AssertLogout(): Promise<boolean> {
    try {
      await this.HomeLink.AssertIsVisible()
      await this.SigninLink.AssertIsVisible()
      await this.SignupLink.AssertIsVisible()
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
