import { logger } from '../Framework/Script/TestLogger'
import { TestElement } from '../Framework/Script/TestElement'

export class WebClickable extends TestElement<WebClickable> {
  async click(): Promise<void> {
    if (await this.waitForClick()) {
      logger.action(this.tag, 'was clicked.')
    } else logger.error('Action click was failed!')
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
