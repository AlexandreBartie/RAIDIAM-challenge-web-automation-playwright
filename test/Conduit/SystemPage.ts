import { SystemHome } from './SystemHome'
import { WebTestPage } from '../Framework/Script/WebTestPage'
import { WebButton, WebLink, WebList, WebTextBox } from './SystemElement'

export class SystemPage extends WebTestPage {
  public SetTextBox(title: string): WebTextBox {
    return new WebTextBox(this).setupByTitle(title)
  }

  public SetButton(title: string): WebButton {
    return new WebButton(this).setupByRole('button', title)
  }

  public SetLink(title?: string): WebLink {
    return new WebLink(this).setupByRole('link', title)
  }

  public SetList(): WebList {
    return new WebList(this).setupByRole('list')
  }
}

export class SystemConnect extends SystemPage {
  public home: SystemHome
  SetHome(home: SystemHome): void {
    this.home = home
    this.SetDriver(this.home.driver)
  }
}
