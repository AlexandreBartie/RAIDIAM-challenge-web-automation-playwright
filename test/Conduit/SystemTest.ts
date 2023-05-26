import { WebTestScope } from '../Framework/Perform/WebTestScope'
import { SystemHome } from './SystemHome'
import { UserLoginScript } from './User/UserLogin'
import { UserLogoutScript } from './User/UserLogout'

export class SystemTest extends WebTestScope {
  public readonly home = new SystemHome()

  constructor() {
    super()
    this.Add('01', new UserLoginScript(this.home))
    this.Add('02', new UserLogoutScript(this.home))
  }
}
