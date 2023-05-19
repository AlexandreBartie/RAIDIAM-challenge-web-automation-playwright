import { WebTestBrowser } from '../Framework/Perform/WebTestBrowser'

export class SystemPage extends WebTestBrowser {
  // link to start the Conduit Web Application
  url = 'http://localhost:8080/#/'

  // browser size settings
  width = 1920
  height = 1080

  // links avalaible in the HomePage
  public HomePage = this.map.SetLink('Home')
  public SigninPage = this.map.SetLink(' Sign in')
  public SignupPage = this.map.SetLink(' Sign up')
}
