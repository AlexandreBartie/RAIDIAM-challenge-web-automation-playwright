import { Page } from 'playwright-core'
import { WebTestPage } from './WebTestPage'
import { TestSuite } from '../Model/TestSuite'
import { IDataFlowType, TestData } from '../Model/TestData'
import { TestScenarios } from '../Model/TestScenario'
import { TestCases } from '../Model/TestCase'

export type IWebTestScript = WebTestScript<WebTestPage, TestData>
export abstract class WebTestScript<P extends WebTestPage, D extends TestData> {
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

  setup(page: Page): void {
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

  abstract run(flow: IDataFlowType, sucess: boolean): Promise<void>
}
