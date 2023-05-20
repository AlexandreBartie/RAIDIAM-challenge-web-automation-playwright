import { WebTestBrowser } from '../Framework/Perform/WebTestBrowser'
import { WebLink } from './SystemElement'
import { SystemMapping } from './SystemMapping'

export class SystemPage extends WebTestBrowser {
  private _home: HomePage

  public readonly map = new SystemMapping(this)

  // access HomePage
  get home(): HomePage {
    if (!this._home) this._home = new HomePage(this)

    return this._home
  }

  // link to start the Conduit Web Application
  url = 'http://localhost:8080/#/'

  // browser size settings
  width = 1920
  height = 1080
}

export class HomePage {
  private main: SystemPage

  public HomePage: WebLink
  public SigninPage: WebLink
  public SignupPage: WebLink
  public ProfilePage: WebLink

  constructor(main: SystemPage) {
    this.main = main

    this.HomePage = this.main.map.SetLink('Home')
    this.SigninPage = this.main.map.SetLink(' Sign in')
    this.SignupPage = this.main.map.SetLink(' Sign up')
    this.ProfilePage = this.main.map.SetLink()
  }
}
