import { TestCases } from '../Model/TestCase'
import { IDataFlowType } from '../Model/TestData'
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

  // setup(home: SystemHome): void {
  //   this.script.setup()
  //   this.script.ho
  // }

  async run(flow: IDataFlowType, success: boolean): Promise<boolean> {
    return await this.script.run(flow, success)
  }

  constructor(order: string, script: ITestScript) {
    this.order = order
    this.script = script
  }
}
