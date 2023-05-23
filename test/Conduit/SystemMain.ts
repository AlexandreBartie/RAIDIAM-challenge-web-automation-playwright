import { WebTestBrowser } from '../Framework/Perform/WebTestBrowser'
import { SystemPage } from './SystemPage'

export class SystemMain extends WebTestBrowser {
  private _home = new SystemPage()

  // public readonly home = new SystemPage()

  // access HomePage
  get home(): SystemPage {
    if (!this._home) this._home = new SystemPage()
    return this._home
  }

  // link to start the Conduit Web Application
  url = 'http://localhost:8080/#/'

  // browser size settings
  width = 1920
  height = 1080
}
