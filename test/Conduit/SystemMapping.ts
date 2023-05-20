import { WebButton, WebLink, WebList, WebTextBox } from './SystemElement'

import { SystemMain } from './SystemMain'

export class SystemMapping {
  private main: SystemMain

  constructor(main: SystemMain) {
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
