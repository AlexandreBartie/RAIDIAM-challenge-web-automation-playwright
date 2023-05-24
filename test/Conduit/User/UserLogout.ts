// import { TestData } from '../../Framework/Model/TestData'
// import { SystemPage } from '../SystemPage'

// export class UserLogoutData extends TestData {
//   name = 'Alexandre Silva'
// }

// export class UserLogoutMapping extends SystemPage {
//   public Submit = this.map.SetButton('Or click here to logout.')
// }

// export class UserLogoutPage extends UserLogoutMapping {
//   async run(flow: UserLogoutData): Promise<void> {
//     await this.home.UserPage.click(flow.name)
//     await this.home.ProfilePage.click()
//     await this.Submit.click()
//   }
// }

// export class UserLogoutScript extends WebTestScript<
//   UserLogoutPage,
//   UserLogoutData
// > {
//   name = 'User Logout'
//   constructor() {
//     super()
//     this.page = new UserLogoutPage()
//     this.data = new UserLogoutData()

//     this.createTestCases()
//   }

//   private createTestCases(): void {
//     this.addTestDefault('Should login using valid data')
//     this.addScenario('Should check input incorret data')
//     {
//       this.addTestCaseNo('email is invalid', {
//         email: 'alexandre_bartie',
//         msg: 'email or password is invalid',
//       })
//       this.addTestCaseNo('email not exist', {
//         email: 'bartie_bartie@hotmail.com',
//         msg: 'email or password is invalid',
//       })
//       this.addTestCaseNo('password not match', {
//         password: '0987654321',
//         msg: 'email or password is invalid',
//       })
//     }

//     // this.addTestCaseNo('Should check email is blank', {
//     //   email: '',
//     //   msg: `'email can't be blank'`,
//     // })
//     // this.addTestCaseNo('Should check password is blank', {
//     //   password: '',
//     //   msg: `'password can't be blank'`,
//     // })
//   }

//   async run(flow: IDataFlowType, sucess: boolean): Promise<void> {
//     await this.page.run(this.getMerge(flow), sucess)
//   }
// }
