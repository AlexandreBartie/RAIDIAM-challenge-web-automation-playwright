import { Browser, Page } from 'playwright-core'
import { TestPage } from './TestPage'

export class TestBrowser {
  public url: string

  public page = new TestPage()

  width: number
  height: number

  async start(browser: Browser): Promise<Page> {
    this.page.SetDriver(await (await browser.newContext()).newPage())
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
  }
}
