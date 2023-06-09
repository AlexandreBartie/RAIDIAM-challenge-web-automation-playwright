import { ITestScript } from '../Script/TestScript'
import { TestTarget, TestTargetList } from './TestTarget'

export class TestScope {
  private _title: string

  public readonly title: string
  public readonly targets: TestTargetList = []

  constructor(title: string) {
    this.title = title
  }

  Add(order: string, script: ITestScript): void {
    const target = new TestTarget(order, script)
    this.targets.push(target)
  }

  // end() {
  //   logger.end()
  // }
}
