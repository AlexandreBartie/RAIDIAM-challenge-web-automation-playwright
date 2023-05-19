import { SystemPage } from '../SystemPage'
import { DataFlowType, TestData } from '../../Framework/Design/TestData'
import { WebTestScript } from '../../Framework/Script/WebTestScript'

export class UserRegistrationData extends TestData {
  email = 'alexandre_bartie@hotmail.com'
  password = '1234567890'
  actions = 'SignIn'
  success = true
  msgs = ''
}

export class UserRegistrationMapping extends SystemPage {
  public Email = this.map.SetTextBox('Email')
  public Password = this.map.SetTextBox('Password')
  public Submit = this.map.SetButton('Sign in')
}

export class UserRegistrationPage extends UserRegistrationMapping {
  async run(flow: UserRegistrationData): Promise<void> {
    await this.SigninPage.click()
    await this.Email.fill(flow.email)
    await this.Password.fill(flow.password)
    await this.Submit.click()
  }
}

export class UserRegistrationScript extends WebTestScript<
  UserRegistrationPage,
  UserRegistrationData
> {
  name = 'Login Account'
  constructor() {
    super()
    this.local = new UserRegistrationPage()
    this.data = new UserRegistrationData()

    this.createTestCases()
  }

  private createTestCases(): void {
    this.addTestCaseOk('Should login using valid input data', {})
  }

  async run(flow: DataFlowType): Promise<void> {
    await this.local.run(this.getMerge(flow))
  }
}
