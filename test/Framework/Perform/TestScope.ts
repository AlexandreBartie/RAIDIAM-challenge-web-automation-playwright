import { ITestScript } from '../Script/TestScript'
import { WebTestTarget, TestTargetList } from './TestTarget'

export class TestScope {
  public targets: TestTargetList = []

  Add(order: string, script: ITestScript): void {
    this.targets.push(new WebTestTarget(order, script))
  }
}
