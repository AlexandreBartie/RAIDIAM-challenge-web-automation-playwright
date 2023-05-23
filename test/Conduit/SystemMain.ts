import { WebTestBrowser } from '../Framework/Perform/WebTestBrowser'
import { SystemPage } from './SystemPage'

export class SystemMain extends WebTestBrowser {
  public readonly page = new SystemPage()

  // link to start the Conduit Web Application
  url = 'http://localhost:8080/#/'

  // browser size settings
  width = 1920
  height = 1080
}
