import { WebTestElement } from '../Framework/Script/WebTestElement'

export class WebTextBox extends WebTestElement<WebTextBox> {
  async fill(text: string): Promise<void> {
    await this.locator.fill(text)
  }
}

export class WebButton extends WebTestElement<WebButton> {
  async click(): Promise<void> {
    await this.locator.click()
  }
}

export class WebLink extends WebTestElement<WebLink> {
  async click(): Promise<void> {
    await this.locator.click()
  }
}

export class WebList extends WebTestElement<WebLink> {}
