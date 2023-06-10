import { SystemHome } from './SystemHome'
import { TestPage } from '../Framework/Script/TestPage'
import { WebButton, WebLink, WebList, WebTextBox } from './SystemElement'
import { logger } from '../Framework/Script/TestLogger'

export class SystemConnect extends TestPage {
  public SetTextBox(title: string): WebTextBox {
    return new WebTextBox(this).setupByTitle(title)
  }

  public SetButton(title: string): WebButton {
    return new WebButton(this).setupByRole('button', title)
  }

  public SetLink(title?: string): WebLink {
    return new WebLink(this).setupByRole('link', title)
  }

  public SetList(title?: string): WebList {
    return new WebList(this).setupByFilter('list', title)
  }
}

export abstract class SystemPage extends SystemConnect {
  public Home: SystemHome

  setHome(home: SystemHome): void {
    this.Home = home
  }

  private setContextDriver(): void {
    this.setDriver(this.Home.driver)
    logger.info('The PAGE driver was set.')
  }

  async setContextLogin(): Promise<boolean> {
    this.setContextDriver()
    const isLogin = await this.Home.context.setup('Login')
    return isLogin
  }

  async setContextLogout(): Promise<boolean> {
    this.setContextDriver()
    const isLogout = this.Home.context.setup('Logout')
    return isLogout
  }

  // async AssertContext(): Promise<boolean> {
  //   const msg = `Context [${context}] is Ok`
  //   const isContext = await this.context()
  //   if (isContext) {
  //     logger.context(context, 'is Ok')
  //     return true
  //   }
  //   this.assert(isContext, msg)
  //   return false
  // }

  abstract context(): Promise<boolean>

  abstract run(flow: unknown, success: boolean): Promise<boolean>
}
