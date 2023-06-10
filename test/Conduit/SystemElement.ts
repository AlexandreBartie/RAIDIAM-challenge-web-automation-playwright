import { logger } from '../Framework/Script/TestLogger'
import { TestElement } from '../Framework/Script/TestElement'

export class WebClickable extends TestElement<WebClickable> {
  async click(): Promise<void> {
    if (await this.waitForClick()) {
      this.logAction('was clicked.')
    } else logger.error('Action click was failed!')
  }

  async clickBy(text: string): Promise<void> {
    this.setLocator(text)
    return this.click()
  }
}

export class WebTextBox extends TestElement<WebTextBox> {
  async fill(text: string): Promise<void> {
    if (await this.waitForVisible()) {
      await this.locator.fill(text)
      this.logAction(`was filled with [${text}].`)
    } else logger.error('Action fill was failed!')
  }
}

export class WebButton extends WebClickable {}

export class WebLink extends WebClickable {}

export class WebList extends WebClickable {}
