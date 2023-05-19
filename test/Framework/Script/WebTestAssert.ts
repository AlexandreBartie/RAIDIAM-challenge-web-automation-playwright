import { Page } from 'playwright-core'

export class WebTestAssert {
  public page: Page

  SetPage(page: Page): void {
    this.page = page
  }

  Assert(success: boolean): void {
    expect(success).toBeTruthy()
  }
}
