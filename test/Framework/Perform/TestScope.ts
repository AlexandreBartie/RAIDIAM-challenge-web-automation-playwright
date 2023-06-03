import { ITestScript } from '../Script/TestScript'
import { TestTarget, TestTargetList } from './TestTarget'

export class TestScope {
  public readonly title: string
  public readonly targets: TestTargetList = []
  constructor(title: string) {
    this.title = title
  }

  Add(order: string, script: ITestScript): void {
    this.targets.push(new TestTarget(order, script))
  }
}
