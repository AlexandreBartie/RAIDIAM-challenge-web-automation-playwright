import { Page } from 'playwright-core'
import { TestPage } from './test/Framework/Script/TestPage'
import { TestSuite } from './test/Framework/Model/TestSuite'
import { IDataFlowType, TestData } from './test/Framework/Model/TestData'
import { TestScenarios } from './test/Framework/Model/TestScenario'
import { TestCases } from './test/Framework/Model/TestCase'

export type ITestScript = TestScript<TestPage, TestData>
export abstract class TestScript<P extends TestPage, D extends TestData> {
  name: string
  page: P
  data: D

  private suite = new TestSuite()

  get scenarios(): TestScenarios {
    return this.suite.scenarios
  }

  get tests(): TestCases {
    return this.suite.tests
  }

  constructor(page: new () => P, data: new () => D) {
    this.page = new page()
    this.data = new data()
  }

  setDriver(page: Page): void {
    this.page.SetDriver(page)
  }

  getMerge(flow: IDataFlowType): D {
    return this.data.getMerge(flow) as D
  }

  addScenario(title: string): void {
    this.suite.AddScenario(title)
  }

  addTestDefault(title: string): void {
    this.suite.addTestDefault(title)
  }

  addTestCaseOk(title: string, data: IDataFlowType): void {
    this.suite.addTestCaseOk(title, data)
  }

  addTestCaseNo(title: string, data: IDataFlowType): void {
    this.suite.addTestCaseNo(title, data)
  }

  abstract setup(): void
  abstract run(flow: unknown, sucess: boolean): Promise<void>

  async runDefault(): Promise<void> {
    await this.run(this.data.getData(), true)
  }
}
