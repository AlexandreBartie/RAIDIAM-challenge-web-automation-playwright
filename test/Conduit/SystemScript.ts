import { TestData } from '../Framework/Model/TestData'
import { TestPage } from '../Framework/Script/TestPage'
import { TestScript } from '../Framework/Script/TestScript'
// import { SystemHome } from './SystemHome'

export abstract class SystemScript<
  P extends TestPage,
  D extends TestData,
> extends TestScript<P, D> {
  // private home: SystemHome
  // constructor(home: SystemHome) {
  //   super()
  //   this.home = home
  // }
}
