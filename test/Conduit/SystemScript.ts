import { TestData } from '../Framework/Model/TestData'
import { TestPage } from '../Framework/Script/TestPage'
import { TestScript } from '../Framework/Script/TestScript'

export abstract class SystemScript<
  P extends TestPage,
  D extends TestData,
> extends TestScript<P, D> {
  constructor(page: new () => P, data: new () => D) {
    super(page, data)
  }
}
