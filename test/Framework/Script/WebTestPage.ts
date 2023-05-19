import { Locator, Page } from 'playwright-core'
import {
  WebButton,
  WebLink,
  WebList,
  WebTextBox,
  findElementBy,
  roleType,
} from './WebTestElement'

export class WebTestMapping {
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

export class WebTestCore {
  public page: Page

  SetPage(page: Page): void {
    this.page = page
  }
}

export class WebTestPage extends WebTestCore {
  public page: Page

  public map = new WebTestMapping(this)

  findByPlaceholder(title: string): Locator {
    return this.page.getByPlaceholder(title)
  }

  findByRole(role: roleType, name: string): Locator {
    return this.page.getByRole(role, { name: name })
  }

  findByRoleFilter(role: roleType, text: string): Locator {
    return this.page.getByRole(role).filter({ hasText: text })
  }

  async pause(seconds = 1): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
  }
}
