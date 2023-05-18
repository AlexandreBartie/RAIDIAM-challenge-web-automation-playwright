export type DataFlowType = { [index: string]: string | number | boolean }

export class TestData {
  [index: string]: unknown
  getMerge(data?: DataFlowType): unknown {
    if (data) {
      for (const key in data) this[key] = data[key]
    }
    return this
  }
}
