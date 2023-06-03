export type IDataFlowType = { [index: string]: string | number | boolean }

function clone<T>(obj: T): T {
  return Object.assign({}, obj)
}

export class TestData {
  [index: string]: unknown
  getData(): IDataFlowType {
    return this as IDataFlowType
  }

  getMerge(data: IDataFlowType): IDataFlowType {
    const merge = clone(this)

    if (data) {
      for (const key in data) merge[key] = data[key]
    }
    return merge as IDataFlowType
  }
}
