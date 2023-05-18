import { WebTestBrowser } from '../Framework/Script/WebTestBrowser'

export class MainPage extends WebTestBrowser {
  url = 'http://localhost:8080/#/'

  width = 1920
  height = 1080

  public HomePage = this.map.SetLink('Home')
  public SigninPage = this.map.SetLink(' Sign in')
  public SignupPage = this.map.SetLink(' Sign up')
}
