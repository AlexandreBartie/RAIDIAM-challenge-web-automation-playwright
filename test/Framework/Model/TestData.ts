export type IDataFlowType = { [index: string]: string | number | boolean }

export class TestData {
  [index: string]: unknown
  getData(): IDataFlowType {
    return this as IDataFlowType
  }

  getMerge(data: IDataFlowType): IDataFlowType {
    if (data) {
      for (const key in data) this[key] = data[key]
    }
    return this as IDataFlowType
  }
}
