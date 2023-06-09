import { logger } from '../Framework/Script/TestLogger'
import { SystemHome } from './SystemHome'

export class SystemContext {
  private home: SystemHome

  constructor(home: SystemHome) {
    this.home = home
  }

  async setLogin(): Promise<boolean> {
    const isLoggout = await this.home.isLoggout()
    if (isLoggout) {
      logger.info('Context >>> Login will be executed')
      await this.home.actions.Login()
      logger.info('Context >>> Login was executed')
    }
    return await this.home.isLoggin()
  }

  async setLogout(): Promise<boolean> {
    const isLoggin = await this.home.isLoggin()
    if (isLoggin) {
      logger.info('Context >>> Logout will be executed')
      await this.home.actions.Logout()
      logger.info('Context >>> Logout was executed')
    }
    return await this.home.isLoggout()
  }
}
