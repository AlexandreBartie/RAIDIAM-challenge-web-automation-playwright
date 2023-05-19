import { WebButton, WebLink, WebList, WebTextBox } from './SystemElement'

import { WebTestPage } from '../Framework/Script/WebTestPage'
import { findElementBy } from '../Framework/Script/WebTestElement'

export class SystemMapping {
  private web: WebTestPage

  constructor(web: WebTestPage) {
    this.web = web
  }
  SetTextBox(title: string): WebTextBox {
    return new WebTextBox(this.web).setup(title, findElementBy.findByTitle)
  }

  SetButton(title: string): WebButton {
    return new WebButton(this.web).setup(title, 'button')
  }

  SetLink(title: string): WebLink {
    return new WebLink(this.web).setup(title, 'link')
  }

  SetList(): WebList {
    return new WebList(this.web).setup('list')
  }
}
