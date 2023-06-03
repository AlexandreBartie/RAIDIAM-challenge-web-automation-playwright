import { SystemHome } from './SystemHome'
import { TestPage } from '../Framework/Script/TestPage'
import { WebButton, WebLink, WebList, WebTextBox } from './SystemElement'
import { UserLoginData } from './User/UserLogin'

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
  public home: SystemHome
  SetHome(home: SystemHome): void {
    this.home = home
  }

  private setContextDriver(): void {
    this.SetDriver(this.home.driver)
  }

  async setContextLogin(): Promise<boolean> {
    this.setContextDriver()
    await this.home.context.setLogin()
    return true
  }

  async setContextLogout(): Promise<boolean> {
    this.setContextDriver()
    await this.home.context.setLogout()
    return true
  }

  abstract context(): Promise<boolean>

  abstract run(flow: UserLoginData, success: boolean): Promise<boolean>
}
