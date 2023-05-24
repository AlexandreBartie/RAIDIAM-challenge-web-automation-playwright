import { WebTestElement } from '../Framework/Script/WebTestElement'

export class WebClickable extends WebTestElement<WebClickable> {
  async click(text?: string): Promise<void> {
    if (text) this.setLocator(text)
    await this.pause()
    await this.locator.click()
    await this.pause()
  }
}

export class WebTextBox extends WebTestElement<WebTextBox> {
  async fill(text: string): Promise<void> {
    await this.locator.fill(text)
  }
}

export class WebButton extends WebClickable {}

export class WebLink extends WebClickable {}

export class WebList extends WebClickable {}
