import { TestData } from '../Framework/Model/TestData'
import { TestScript } from '../Framework/Script/TestScript'
import { SystemPage } from './SystemPage'

export abstract class SystemScript<
  P extends SystemPage,
  D extends TestData,
> extends TestScript<P, D> {
  constructor(page: new () => P, data: new () => D) {
    super(page, data)
  }
}
