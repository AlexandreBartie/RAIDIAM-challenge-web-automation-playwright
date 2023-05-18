import { MainPage } from '../MainPage'
import { DataFlowType, TestData } from '../../Framework/Design/TestData'
import { WebTestScript } from '../../Framework/Script/WebTestScript'

export class UserLoginData extends TestData {
  email = 'alexandre_bartie@hotmail.com'
  password = '1234567890'
  actions = 'SignIn'
  success = true
  msgs = ''
}

export class UserLoginMapping extends MainPage {
  public Email = this.map.SetTextBox('Email')
  public Password = this.map.SetTextBox('Password')
  public Submit = this.map.SetButton('Sign in')
}

export class UserLoginPage extends UserLoginMapping {
  async run(flow: UserLoginData): Promise<void> {
    await this.SigninPage.click()
    await this.Email.fill(flow.email)
    await this.Password.fill(flow.password)
    await this.Submit.click()
  }
}

export class UserLoginScript extends WebTestScript<
  UserLoginPage,
  UserLoginData
> {
  name = 'User Login'
  constructor() {
    super()
    this.local = new UserLoginPage()
    this.data = new UserLoginData()

    this.createTestCases()
  }

  private createTestCases(): void {
    this.addTestCase('Should login using valid input data', {})
    this.addTestCase('Should validate not exist email', {
      email: 'bartie_bartie@hotmail.com', 
    })
    this.addTestCase('Should validate blank fields data', {})
  }

  async run(flow: DataFlowType): Promise<void> {
    await this.local.run(this.getMerge(flow))
  }
}
