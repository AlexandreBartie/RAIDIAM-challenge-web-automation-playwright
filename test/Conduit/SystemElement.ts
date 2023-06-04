import { logger } from '../Framework/Script/TestLogger'
import { TestElement } from '../Framework/Script/TestElement'

export class WebClickable extends TestElement<WebClickable> {
  async click(pause = 0.5): Promise<void> {
    if (this.hasLocator) {
      await this.pause()
      await this.locator.click()
      logger.info(`Element [${this.tag}] was clicked.`)
      await this.pause(pause)
    } else {
      throw new Error(`WebClickable fail! The element '${this.tag}' dont find!`)
    }
  }

  async clickBy(text: string): Promise<void> {
    this.setLocator(text)
    return this.click()
  }
}

export class WebTextBox extends TestElement<WebTextBox> {
  async fill(text: string): Promise<void> {
    await this.locator.fill(text)
    logger.info(`Element [${this.tag}] was filled with [${text}].`)
  }
}

export class WebButton extends WebClickable {}

export class WebLink extends WebClickable {}

export class WebList extends WebClickable {}
