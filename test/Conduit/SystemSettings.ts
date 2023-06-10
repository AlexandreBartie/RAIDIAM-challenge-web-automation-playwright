import { TestBrowser } from '../Framework/Script/TestBrowser'

export class SystemSettings extends TestBrowser {
  // link to start the Conduit Web Application
  url = 'http://localhost:8080/#/'

  // browser size settings
  width = 1920 // 700
  height = 1080 // 700
}
