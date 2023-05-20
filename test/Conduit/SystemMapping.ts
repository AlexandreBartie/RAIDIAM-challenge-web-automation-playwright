import { WebButton, WebLink, WebList, WebTextBox } from './SystemElement'

import { SystemPage } from './SystemPage'

export class SystemMapping {
  private main: SystemPage

  constructor(main: SystemPage) {
    this.main = main
  }
  SetTextBox(title: string): WebTextBox {
    return new WebTextBox(this.main).setupByTitle(title)
  }

  SetButton(title: string): WebButton {
    return new WebButton(this.main).setupByRole('button', title)
  }

  SetLink(title?: string): WebLink {
    return new WebLink(this.main).setupByRole('link', title)
  }

  SetList(): WebList {
    return new WebList(this.main).setupByRole('list')
  }
}
