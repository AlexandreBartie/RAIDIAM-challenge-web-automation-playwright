import { MainPage } from '../MainPage'
import { DataFlowType, TestData } from '../../Framework/Design/TestData'
import { WebTestScript } from '../../Framework/Script/WebTestScript'

export class LoginAccountData extends TestData {
  email = 'alexandre_bartie@hotmail.com'
  password = '1234567890'
  actions = 'SignIn'
  success = true
  msgs = ''
}

export class LoginAccountMapping extends MainPage {
  public Email = this.map.SetTextBox('Email')
  public Password = this.map.SetTextBox('Password')
  public Submit = this.map.SetButton('Sign in')
}

export class LoginAccountPage extends LoginAccountMapping {
  async run(flow: LoginAccountData): Promise<void> {
    await this.SigninPage.click()
    await this.Email.fill(flow.email)
    await this.Password.fill(flow.password)
    await this.Submit.click()
  }
}

export class LoginAccountScript extends WebTestScript<
  LoginAccountPage,
  LoginAccountData
> {
  name = 'Login Account'
  constructor() {
    super()
    this.local = new LoginAccountPage()
    this.data = new LoginAccountData()

    this.createTestCases()
  }

  private createTestCases(): void {
    this.addTestCase('Should login using valid input data', {})
  }

  async run(flow: DataFlowType): Promise<void> {
    await this.local.run(this.getMerge(flow))
  }
}
