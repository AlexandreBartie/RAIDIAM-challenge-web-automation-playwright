import { Browser, Page } from 'playwright-core'
import { TestPage } from './TestPage'
import { logger } from './TestLogger'

export class TestBrowser {
  public url: string

  public page = new TestPage()

  width: number
  height: number

  async start(browser: Browser): Promise<Page> {
    this.page.setDriver(await browser.newPage()) //    .newContext()).newPage())
    logger.trace('The driver was created.', '=')
    await this.setViewportSize(this.width, this.height)
    await this.go(this.url)
    return this.page.driver
  }

  private async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.driver.setViewportSize({ width, height })
  }

  private async go(url: string): Promise<void> {
    await this.page.driver.bringToFront()
    await this.page.driver.goto(url)
    await this.page.waitLoad()
  }
}
