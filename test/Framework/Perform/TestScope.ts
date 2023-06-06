import { logger } from '../Script/TestLogger'
import { ITestScript } from '../../../TestScript'
import { TestTarget, TestTargetList } from './TestTarget'

export class TestScope {
  public readonly title: string
  public readonly targets: TestTargetList = []
  constructor(title: string) {
    this.title = title
    logger.info(`Scope [${title}] was initialized.`)
  }

  Add(order: string, script: ITestScript): void {
    const target = new TestTarget(order, script)
    this.targets.push(target)
    logger.info(`Target [${target.title}] was added to the scope.`)
  }
}
