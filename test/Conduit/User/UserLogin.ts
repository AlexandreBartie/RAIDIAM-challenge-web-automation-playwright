import { TestData } from '../../Framework/Model/TestData'
import { SystemHome } from '../SystemHome'
import { SystemPage } from '../SystemPage'
import { SystemScript } from '../SystemScript'

export class UserLoginData extends TestData {
  name = 'Alexandre Silva'
  email = 'alexandre_bartie@hotmail.com'
  password = '1234567890'
  actions = 'SignIn'
  msg = ''
}

export class UserLoginPage extends SystemPage {
  public Email = this.SetTextBox('Email')
  public Password = this.SetTextBox('Password')
  public Submit = this.SetButton('Sign in')
  public Message = this.SetList('Message')

  async context(): Promise<boolean> {
    const isContext = await this.setContextLogout()
    return isContext
  }

  async run(flow: UserLoginData, success = true): Promise<boolean> {
    await this.Home.SigninLink.click()
    await this.Email.fill(flow.email)
    await this.Password.fill(flow.password)
    await this.Submit.click()

    if (success) {
      return await this.Home.AssertLogin(flow.name)
    }
    return await this.Message.AssertHasText(flow.msg)
  }
}

export class UserLoginScript extends SystemScript<
  UserLoginPage,
  UserLoginData
> {
  name = 'User Login'
  constructor(home: SystemHome) {
    super(home, UserLoginPage, UserLoginData)
  }

  setup(): void {
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
    this.addScenario('Should check input blank data')
    {
      this.addTestCaseNo('email is blank', {
        email: '',
        msg: "email can't be blank",
      })
      this.addTestCaseNo('password is blank', {
        password: '',
        msg: "password can't be blank",
      })
    }
  }

  // async run(flow: IDataFlowType, success = true): Promise<void> {
  //   await this.run(this.getMerge(flow), success)
  // }
}
