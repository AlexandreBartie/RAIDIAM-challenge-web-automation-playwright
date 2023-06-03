import { TestBrowser } from '../Framework/Script/TestBrowser'

export class SystemSettings extends TestBrowser {
  // link to start the Conduit Web Application
  url = 'http://localhost:8080/#/'

  // browser size settings
  width = 700 // 1920
  height = 700 // 1080
}
