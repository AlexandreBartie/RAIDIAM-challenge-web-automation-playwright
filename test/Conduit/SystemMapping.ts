// import { WebTestPage } from '../Framework/Script/WebTestPage'
import { WebButton, WebLink, WebList, WebTextBox } from './SystemElement'
import { SystemPage } from './SystemPage'

export class SystemMapping {
  private page: SystemPage

  constructor(page: SystemPage) {
    this.page = page
  }

  public SetTextBox(title: string): WebTextBox {
    return new WebTextBox(this.page).setupByTitle(title)
  }

  public SetButton(title: string): WebButton {
    return new WebButton(this.page).setupByRole('button', title)
  }

  public SetLink(title?: string): WebLink {
    return new WebLink(this.page).setupByRole('link', title)
  }

  public SetList(): WebList {
    return new WebList(this.page).setupByRole('list')
  }
}
