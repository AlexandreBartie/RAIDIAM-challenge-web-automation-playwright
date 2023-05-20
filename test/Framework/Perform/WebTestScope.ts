// import { Browser, Page } from 'playwright-core'
import { IWebTestScript } from '../Script/WebTestScript'
import { WebTestTarget, WebTestTargetList } from './WebTestTarget'
// import { WebTestBrowser } from './WebTestBrowser'

export class WebTestScope {
  // private main: WebTestBrowser

  public targets: WebTestTargetList = []

  // constructor(main: WebTestBrowser) {
  //   this.main = main
  // }

  Add(order: string, script: IWebTestScript): void {
    this.targets.push(new WebTestTarget(order, script))
  }

  // async start(browser: Browser): Promise<Page> {
  //   return this.main.start(browser)
  // }
}
