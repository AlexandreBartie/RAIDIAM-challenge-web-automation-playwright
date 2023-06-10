import { TestPage } from './TestPage'
import { TestSuite } from '../Model/TestSuite'
import { IDataFlowType, TestData } from '../Model/TestData'
import { TestScenarios } from '../Model/TestScenario'
import { TestCases } from '../Model/TestCase'

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
  abstract run(flow: unknown, sucess: boolean): Promise<boolean>

  async runDefault(): Promise<boolean> {
    return await this.run(this.data.getData(), true)
  }
}
