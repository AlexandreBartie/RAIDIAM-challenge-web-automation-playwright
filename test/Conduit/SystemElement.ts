import {
  WebTestElement,
  findElementBy,
  roleType,
} from '../Framework/Script/WebTestElement'

export class WebTextBox extends WebTestElement {
  setup(title: string, findby: findElementBy): WebTextBox {
    this.setKey(title)
    this.setFindby(findby)
    return this
  }

  async fill(text: string): Promise<void> {
    await this.locator.fill(text)
  }
}

export class WebButton extends WebTestElement {
  setup(title: string, role: roleType): WebButton {
    this.setKey(title)
    this.setRole(role)
    return this
  }
  async click(): Promise<void> {
    await this.locator.click()
  }
}

export class WebLink extends WebTestElement {
  setup(title: string, role: roleType): WebLink {
    this.setKey(title)
    this.setRole(role)
    return this
  }
  async click(): Promise<void> {
    await this.locator.click()
  }
}

export class WebList extends WebTestElement {
  setup(role: roleType): WebList {
    this.setRole(role)
    return this
  }
  async AssertItem(title: string): Promise<void> {
    await this.setLocator(title)
  }
}
