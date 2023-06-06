import { IDataFlowType, TestData } from '../Framework/Model/TestData'
import { TestScript } from '../../TestScript'
import { SystemHome } from './SystemHome'
import { SystemPage } from './SystemPage'

export abstract class SystemScript<
  P extends SystemPage,
  D extends TestData,
> extends TestScript<P, D> {
  constructor(home: SystemHome, page: new () => P, data: new () => D) {
    super(page, data)
    this.page.setHome(home)
  }

  // async run(flow: IDataFlowType, success = true): Promise<boolean> {
  //   this.page.context()
  //   return await this.page.run(this.getMerge(flow), success)
  // }

  async run(flow: IDataFlowType, success = true): Promise<void> {
    if (await this.page.context()) {
      const merge = this.getMerge(flow)
      await this.page.run(merge, success)
    } else this.AssertFail('Context steps failed!')
  }

  AssertFail(msg: string): void {
    this.page.Assert(false, msg)
  }
}
