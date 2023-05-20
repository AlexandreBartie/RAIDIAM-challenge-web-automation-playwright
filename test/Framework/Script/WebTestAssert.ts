import { Page } from 'playwright-core'
import { expect } from '@playwright/test'

export class WebTestAssert {
  public page: Page

  SetPage(page: Page): void {
    this.page = page
  }

  Assert(success: boolean): void {
    if (success) console.log('Test Ok')
    else console.log('Test not Ok')
    expect(success).toBeTruthy()
  }
}
