import { expect } from '@playwright/test'
import { WebTestDriver } from './WebTestDriver'

export class WebTestAssert extends WebTestDriver {
  Assert(success: boolean): void {
    if (success) console.log('Test Ok')
    else console.log('Test not Ok')
    expect(success).toBeTruthy()
  }

  // AssertEqual(success: boolean): void {
  //   if (success) console.log('Test Ok')
  //   else console.log('Test not Ok')
  //   expect(success).toBeTruthy()
  // }

  // AssertExist(text?: string): void {
  //   this.setLocator(text)
  //   this.web.Assert(this.hasLocator)
  // }
}
