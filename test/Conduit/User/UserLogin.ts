import { IDataFlowType, TestData } from '../../Framework/Model/TestData'
import { TestScript } from '../../Framework/Script/TestScript'
import { SystemHome } from '../SystemHome'
import { SystemPage } from '../SystemPage'

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
  public Message = this.SetList()

  async context(): Promise<boolean> {
    return await this.setLogout()
  }

  async run(flow: UserLoginData, success = true): Promise<boolean> {
    await this.home.SigninLink.click()
    await this.Email.fill(flow.email)
    await this.Password.fill(flow.password)
    await this.Submit.click()

    if (success) {
      return this.home.AssertLogin(flow.name)
    }
    return this.Message.AssertHasText(flow.msg)
  }
}

export class UserLoginScript extends TestScript<UserLoginPage, UserLoginData> {
  name = 'User Login'
  constructor(home: SystemHome) {
    super(UserLoginPage, UserLoginData)

    this.page.SetHome(home)
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
        msg: `'email can't be blank'`,
      })
      this.addTestCaseNo('password is blank', {
        password: '',
        msg: `'password can't be blank'`,
      })
    }
  }

  async run(flow: IDataFlowType, sucess = true): Promise<boolean> {
    this.page.context()
    return await this.page.run(this.getMerge(flow), sucess)
  }
}
