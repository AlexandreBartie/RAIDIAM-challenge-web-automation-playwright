import { SystemHome } from './SystemHome'

export class SystemContext {
  private home: SystemHome

  constructor(home: SystemHome) {
    this.home = home
  }

  async setLogin(): Promise<boolean> {
    const isLoggout = await this.home.isLoggout()
    if (isLoggout) {
      this.home.actions.Login()
    }
    return this.home.isLoggin()
  }

  async setLogout(): Promise<boolean> {
    const isLoggin = await this.home.isLoggin()
    if (isLoggin) {
      this.home.actions.Logout()
    }
    return this.home.isLoggout()
  }
}
