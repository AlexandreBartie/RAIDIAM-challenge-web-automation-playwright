import { TestCase, TestCases } from '../Model/TestCase'
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

  setup(): void {
    this.script.setup()
  }

  async run(test: TestCase): Promise<boolean> {
    console.log(`test# ${test.name}: ${test.data.JSON}`)
    return await this.script.run(test.data, test.success)
  }

  constructor(order: string, script: ITestScript) {
    this.order = order
    this.script = script
  }
}
