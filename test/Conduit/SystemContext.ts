import { logger } from '../Framework/Script/TestLogger'
import { SystemHome } from './SystemHome'

export type contextType = 'Login' | 'Logout'
export class SystemContext {
  private home: SystemHome

  private type: contextType

  constructor(home: SystemHome) {
    this.home = home
  }

  async setup(type: contextType): Promise<boolean> {
    this.type = type
    this.home.waitLoad('load')
    switch (type) {
      case 'Login':
        return await this.setLogin()

      case 'Logout':
        return await this.setLogout()
    }
  }

  private async setLogin(): Promise<boolean> {
    if (await this.home.isLoggin()) return true

    if (await this.home.isLoggout()) {
      this.logContextBuilding()
      await this.home.actions.Login()
    }
    return this.logContextDone(await this.home.isLoggin())
  }

  private async setLogout(): Promise<boolean> {
    if (await this.home.isLoggout()) return true

    if (await this.home.isLoggin()) {
      this.logContextBuilding()
      await this.home.actions.Logout()
    }
    return this.logContextDone(await this.home.isLoggout())
  }

  private logContextBuilding(): void {
    logger.debug(`Context [${this.type}] will be setup.`)
  }

  private logContextDone(success: boolean): boolean {
    if (success) logger.debug('Context was ready.')
    else logger.error('Context was fail!')
    return success
  }
}
