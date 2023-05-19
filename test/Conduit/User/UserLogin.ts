import { SystemPage } from '../SystemPage'
import { DataFlowType, TestData } from '../../Framework/Design/TestData'
import { WebTestScript } from '../../Framework/Script/WebTestScript'

export class UserLoginData extends TestData {
  email = 'alexandre_bartie@hotmail.com'
  password = '1234567890'
  actions = 'SignIn'
  msg = ''
}

export class UserLoginMapping extends SystemPage {
  public Email = this.map.SetTextBox('Email')
  public Password = this.map.SetTextBox('Password')
  public Submit = this.map.SetButton('Sign in')
  public Message = this.map.SetList()
}

export class UserLoginPage extends UserLoginMapping {
  async run(flow: UserLoginData, success: boolean): Promise<void> {
    await this.SigninPage.click()
    await this.pause(1)
    await this.Email.fill(flow.email)
    await this.Password.fill(flow.password)
    await this.Submit.click()
    await this.pause(1)

    if (success) {
      await this.AssertItem(flow.msg)
    } else {
      await this.Message.AssertItem(flow.msg)
    }
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
    this.addTestCaseOk('Should login using valid input data', {})
    this.addTestCaseNo('Should check email not found', {
      email: 'bartie_bartie@hotmail.com',
      msg: 'email or password is invalid',
    })
    this.addTestCaseNo('Should check password not match', {
      password: '0987654321',
      msg: 'email or password is invalid',
    })
    this.addTestCaseNo('Should check email is blank', {
      email: '',
      msg: `'email can't be blank'`,
    })
    this.addTestCaseNo('Should check password is blank', {
      password: '',
      msg: `'password can't be blank'`,
    })
  }

  async run(flow: DataFlowType, sucess: boolean): Promise<void> {
    await this.local.run(this.getMerge(flow), sucess)
  }
}
