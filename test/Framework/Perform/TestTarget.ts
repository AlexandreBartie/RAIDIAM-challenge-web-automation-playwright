import { TestCase, TestCases } from '../Model/TestCase'
import { logger } from '../Script/TestLogger'
import { TestScenarios } from '../Model/TestScenario'
import { ITestScript } from '../Script/TestScript'

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

  constructor(order: string, script: ITestScript) {
    this.order = order
    this.script = script
  }

  setup(): void {
    this.script.setup()
  }

  async run(test: TestCase): Promise<void> {
    const title = `Test# [${test.title}]`
    logger.trace(`${title}`)
    const result = await this.script.run(test.data, test.success)

    if (result) {
      logger.info(`Test# Result is OK.`)
    } else {
      this.script.page.assertFail(`Test# Result`)
    }
  }
}
