import { TestCases } from '../Model/TestCase'
import { IDataFlowType } from '../Model/TestData'
import { TestScenarios } from '../Model/TestScenario'
import { IWebTestScript } from '../Script/TestScript'

export type WebTestTargetList = Array<WebTestTarget>

export class WebTestTarget {
  public order: string
  public script: IWebTestScript

  get title(): string {
    return `${this.order}.${this.script.name}`
  }

  get scenarios(): TestScenarios {
    return this.script.scenarios
  }

  get tests(): TestCases {
    return this.scenarios.getTests()
  }

  async run(flow: IDataFlowType, success: boolean): Promise<void> {
    return await this.script.run(flow, success)
  }

  constructor(order: string, script: IWebTestScript) {
    this.order = order
    this.script = script
  }
}
