import { TestCase, TestCases } from './TestCase'
import { IDataFlowType } from './TestData'
import { TestSuite } from './TestSuite'

const TestCaseDefault = 'default'

export interface ITestScenario {
  suite: TestSuite

  title: string
  tests: TestCases
}

export class TestScenario implements ITestScenario {
  readonly suite: TestSuite

  public title: string

  readonly tests = new TestCases()

  constructor(suite: TestSuite, title = TestCaseDefault) {
    this.title = title
  }

  addTestDefault(title: string): void {
    this.title = title
    this.tests.Add(new TestCase(this, TestCaseDefault, {}, true))
  }

  addTestCaseOk(title: string, data: IDataFlowType): void {
    this.tests.Add(new TestCase(this, title, data, true))
  }

  addTestCaseNo(title: string, data: IDataFlowType): void {
    this.tests.Add(new TestCase(this, title, data, false))
  }
}

export class TestScenarios extends Array<TestScenario> {
  Add(scenario: TestScenario): void {
    this.push(scenario)
  }

  getScenario(suite: TestSuite): TestScenario {
    if (this.length == 0) this.Add(new TestScenario(suite))
    return this[this.length - 1]
  }

  getTests(): TestCases {
    const list = new TestCases()
    for (const scenario of this) {
      list.AddList(scenario.tests)
    }
    return list
  }
}
