import { TestCase, TestCases } from '../Model/TestCase'
import { logger } from '../Script/TestLogger'
import { TestScenarios } from '../Model/TestScenario'
import { ITestScript } from '../../../TestScript'

export type TestTargetList = Array<TestTarget>

export class TestTarget {
  public order: string
  public script: ITestScript

  get title(): string {
    return `${this.order}.${this.script.name}`
  }

  get scenarios(): TestScenarios {
    return this.script.scenarios
  }

  get tests(): TestCases {
    return this.scenarios.getTests()
  }

  setup(): void {
    this.script.setup()
    logger.info(`Script [${this.script.name}] has its testcases added.`)
  }

  async run(test: TestCase): Promise<void> {
    const title = `Test# [${test.title}]`
    logger.trace(`${title}`)
    await this.script.run(test.data, test.success)
    logger.info(`${title} is OK.`)
  }

  constructor(order: string, script: ITestScript) {
    this.order = order
    this.script = script
  }
}
