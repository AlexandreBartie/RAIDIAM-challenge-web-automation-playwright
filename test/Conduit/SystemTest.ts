import { TestScope } from '../Framework/Perform/TestScope'
import { SystemHome } from './SystemHome'
import { UserLoginScript } from './User/UserLogin'
import { UserLogoutScript } from './User/UserLogout'

export class SystemTest extends TestScope {
  public readonly home = new SystemHome()

  constructor() {
    super()
    this.Add('01', new UserLoginScript(this.home))
    this.Add('02', new UserLogoutScript(this.home))
  }
}
