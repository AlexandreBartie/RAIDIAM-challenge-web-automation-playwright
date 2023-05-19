import { WebButton, WebLink, WebList, WebTextBox } from './SystemElement'

import { WebTestPage } from '../Framework/Script/WebTestPage'

export class SystemMapping {
  private web: WebTestPage

  constructor(web: WebTestPage) {
    this.web = web
  }
  SetTextBox(title: string): WebTextBox {
    return new WebTextBox(this.web).setupByTitle(title)
  }

  SetButton(title: string): WebButton {
    return new WebButton(this.web).setupByRole('button', title)
  }

  SetLink(title: string): WebLink {
    return new WebLink(this.web).setupByRole('link', title)
  }

  SetList(): WebList {
    return new WebList(this.web).setupByRole('list')
  }
}
