import { logger } from '../Script/TestLogger'
import { ITestScript } from '../Script/TestScript'
import { TestTarget, TestTargetList } from './TestTarget'

export class TestScope {
  public readonly title: string
  public readonly targets: TestTargetList = []
  constructor(title: string) {
    this.title = title
    logger.info(`Scope [${title}] was initialized.`)
  }

  Add(order: string, script: ITestScript): void {
    this.targets.push(new TestTarget(order, script))
    logger.info(`Script [${script.name}] was added to the scope..`)
  }
}
