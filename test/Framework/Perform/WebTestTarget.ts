import { TestCases } from '../Design/TestCase'
import { DataFlowType } from '../Design/TestData'
import { IWebTestScript } from '../Script/WebTestScript'

export type WebTestTargetList = Array<WebTestTarget>

export class WebTestTarget {
  public order: string
  public script: IWebTestScript

  get title(): string {
    return `${this.order}.${this.script.name}`
  }

  get testCases(): TestCases {
    return this.script.testCases
  }

  async run(flow: DataFlowType): Promise<void> {
    return await this.script.run(flow)
  }

  constructor(order: string, script: IWebTestScript) {
    this.order = order
    this.script = script
  }
}
