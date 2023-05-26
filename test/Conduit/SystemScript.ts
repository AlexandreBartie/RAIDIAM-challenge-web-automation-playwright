import { TestData } from '../Framework/Model/TestData'
import { WebTestPage } from '../Framework/Script/WebTestPage'
import { WebTestScript } from '../Framework/Script/WebTestScript'
import { SystemHome } from './SystemHome'

export abstract class SystemScript<
  P extends WebTestPage,
  D extends TestData,
> extends WebTestScript<P, D> {
  public home: SystemHome
  constructor(home: SystemHome) {
    super()
    this.home = home
  }
}
