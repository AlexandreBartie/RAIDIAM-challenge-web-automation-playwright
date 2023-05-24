import { IDataFlowType } from './TestData'
import { TestScenario } from './TestScenario'

export interface ITestCase {
  scenario: TestScenario
  name: string
  data: IDataFlowType
  success: boolean
}

export class TestCase implements ITestCase {
  scenario: TestScenario
  name: string
  success: boolean
  data: IDataFlowType

  get title(): string {
    return `${this.name}: ${this.scenario.title}`
  }

  constructor(
    scenario: TestScenario,
    name: string,
    data: IDataFlowType,
    success = true,
  ) {
    this.scenario = scenario
    this.name = name
    this.data = data
    this.success = success
  }
}
export class TestCases extends Array<TestCase> {
  Add(test: TestCase): void {
    this.push(test)
  }
  AddList(list: TestCases): void {
    for (const testcase of list) this.Add(testcase)
  }
}
