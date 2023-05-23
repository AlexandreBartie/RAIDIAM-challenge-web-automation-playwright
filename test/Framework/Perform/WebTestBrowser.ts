import { Browser, Page } from 'playwright-core'
import { WebTestPage } from '../Script/WebTestPage'

export class WebTestBrowser {
  public url: string

  public page = new WebTestPage()

  width: number
  height: number

  async start(browser: Browser): Promise<Page> {
    this.page.SetPage(await (await browser.newContext()).newPage())
    await this.setViewportSize(this.width, this.height)
    await this.go(this.url)
    return this.page.pageControl
  }

  private async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.pageControl.setViewportSize({ width, height })
  }

  private async go(url: string): Promise<void> {
    await this.page.pageControl.bringToFront()
    await this.page.pageControl.goto(url)
  }
}
