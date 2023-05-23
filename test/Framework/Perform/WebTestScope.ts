import { IWebTestScript } from '../Script/WebTestScript'
import { WebTestTarget, WebTestTargetList } from './WebTestTarget'

export class WebTestScope {
  public targets: WebTestTargetList = []

  Add(order: string, script: IWebTestScript): void {
    this.targets.push(new WebTestTarget(order, script))
  }
}
