import { WebTestBrowser } from '../Framework/Perform/WebTestBrowser'
import { SystemMapping } from './SystemMapping'
import { SystemHome } from './SystemHome'

export class SystemMain extends WebTestBrowser {
  private _home: SystemHome

  public readonly map = new SystemMapping(this)

  // access HomePage
  get home(): SystemHome {
    if (!this._home) this._home = new SystemHome(this)

    return this._home
  }

  // link to start the Conduit Web Application
  url = 'http://localhost:8080/#/'

  // browser size settings
  width = 1920
  height = 1080
}
