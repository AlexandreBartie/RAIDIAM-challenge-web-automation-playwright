import { DataFlowType } from '../Design/TestData'

export interface ITestCase {
  title: string
  data: DataFlowType
  success: boolean
}

export class TestCase implements ITestCase {
  title: string
  success: boolean
  data: DataFlowType

  constructor(title: string, data: DataFlowType, success = true) {
    this.title = title
    this.data = data
    this.success = success
  }
}
export class TestCases extends Array<TestCase> {
  Add(title: string, data: DataFlowType): void {
    this.push(new TestCase(title, data))
  }
}
