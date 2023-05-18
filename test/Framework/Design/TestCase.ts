import { DataFlowType } from '../Design/TestData'

export interface ITestCase {
  title: string
  data: DataFlowType
}

export class TestCase implements ITestCase {
  title: string
  data: DataFlowType

  constructor(title: string, data: DataFlowType) {
    this.title = title
    this.data = data
  }
}
export class TestCases extends Array<TestCase> {
  Add(title: string, data: DataFlowType): void {
    this.push(new TestCase(title, data))
  }
}
