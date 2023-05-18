import { Browser, Page } from 'playwright-core'
import { WebTestPage } from './WebTestPage'

export class WebTestBrowser extends WebTestPage {
  public url: string

  width: number
  height: number

  async start(browser: Browser): Promise<Page> {
    this.SetPage(await (await browser.newContext()).newPage())
    await this.setViewportSize(this.width, this.height)
    await this.go(this.url)
    return this.page
  }

  private async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height })
  }

  private async go(url: string): Promise<void> {
    await this.page.bringToFront()
    this.page.goto(url)
  }
}
