import { TestElement } from '../Framework/Script/TestElement'

export class WebClickable extends TestElement<WebClickable> {
  async click(text?: string): Promise<void> {
    if (text) this.setLocator(text)

    if (this.hasLocator) {
      await this.pause()
      await this.locator.click()
      await this.pause()
    } else {
      throw new Error(`WebClickable fail! The element '${this.tag}' dont find!`)
    }
  }
}

export class WebTextBox extends TestElement<WebTextBox> {
  async fill(text: string): Promise<void> {
    await this.locator.fill(text)
  }
}

export class WebButton extends WebClickable {}

export class WebLink extends WebClickable {}

export class WebList extends WebClickable {}
