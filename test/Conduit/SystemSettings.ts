import { WebTestBrowser } from '../Framework/Perform/WebTestBrowser'

export class SystemSettings extends WebTestBrowser {
  // link to start the Conduit Web Application
  url = 'http://localhost:8080/#/'

  // browser size settings
  width = 1920
  height = 1080
}
