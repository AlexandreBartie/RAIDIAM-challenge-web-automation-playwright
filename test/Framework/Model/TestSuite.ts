import { TestCases } from './TestCase'
import { IDataFlowType } from './TestData'
import { TestScenario, TestScenarios } from './TestScenario'

export interface ITestSuite {
  title: string
  scenarios: TestScenarios
}

export class TestSuite implements ITestSuite {
  readonly title: string

  readonly scenarios = new TestScenarios()

  get tests(): TestCases {
    return this.scenarios.getTests()
  }

  private get scenario(): TestScenario {
    return this.scenarios.getScenario(this)
  }

  constructor(title = '') {
    this.title = title
  }

  AddScenario(title: string): void {
    this.scenarios.push(new TestScenario(this, title))
  }

  addTestDefault(title: string): void {
    this.scenario.addTestDefault(title)
  }

  addTestCaseOk(title: string, data: IDataFlowType): void {
    this.scenario.addTestCaseOk(title, data)
  }

  addTestCaseNo(title: string, data: IDataFlowType): void {
    this.scenario.addTestCaseNo(title, data)
  }
}
