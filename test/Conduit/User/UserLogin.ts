import { IDataFlowType, TestData } from '../../Framework/Model/TestData'
import { WebTestScript } from '../../Framework/Script/WebTestScript'
import { SystemPage } from '../SystemPage'

export class UserLoginData extends TestData {
  name = 'Alexandre Silva'
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
  async run(flow: UserLoginData, success = true): Promise<void> {
    await this.home.SigninPage.click()
    await this.Email.fill(flow.email)
    await this.Password.fill(flow.password)
    await this.Submit.click()

    if (success) {
      this.home.ProfilePage.AssertHasText(flow.name)
    } else {
      this.Message.AssertHasText(flow.msg)
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
    this.page = new UserLoginPage()
    this.data = new UserLoginData()

    this.createTestCases()
  }

  private createTestCases(): void {
    this.addTestDefault('Should login using valid data')
    this.addScenario('Should check input incorret data')
    {
      this.addTestCaseNo('email is invalid', {
        email: 'alexandre_bartie',
        msg: 'email or password is invalid',
      })
      this.addTestCaseNo('email not exist', {
        email: 'bartie_bartie@hotmail.com',
        msg: 'email or password is invalid',
      })
      this.addTestCaseNo('password not match', {
        password: '0987654321',
        msg: 'email or password is invalid',
      })
    }

    // this.addTestCaseNo('Should check email is blank', {
    //   email: '',
    //   msg: `'email can't be blank'`,
    // })
    // this.addTestCaseNo('Should check password is blank', {
    //   password: '',
    //   msg: `'password can't be blank'`,
    // })
  }

  async run(flow: IDataFlowType, sucess: boolean): Promise<void> {
    await this.page.run(this.getMerge(flow), sucess)
  }
}
