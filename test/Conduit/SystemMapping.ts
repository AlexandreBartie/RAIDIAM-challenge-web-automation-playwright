// import { WebTestPage } from '../Framework/Script/WebTestPage'
import { WebButton, WebLink, WebList, WebTextBox } from './SystemElement'
import { SystemPage } from './SystemPage'

export class SystemMapping {
  private home: SystemPage

  constructor(home: SystemPage) {
    this.home = home
  }

  public SetTextBox(title: string): WebTextBox {
    return new WebTextBox(this.home).setupByTitle(title)
  }

  public SetButton(title: string): WebButton {
    return new WebButton(this.home).setupByRole('button', title)
  }

  public SetLink(title?: string): WebLink {
    return new WebLink(this.home).setupByRole('link', title)
  }

  public SetList(): WebList {
    return new WebList(this.home).setupByRole('list')
  }
}
