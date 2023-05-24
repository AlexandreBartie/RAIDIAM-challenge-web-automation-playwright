export type IDataFlowType = { [index: string]: string | number | boolean }

export class TestData {
  [index: string]: unknown
  getMerge(data?: IDataFlowType): unknown {
    if (data) {
      for (const key in data) this[key] = data[key]
    }
    return this
  }
}
