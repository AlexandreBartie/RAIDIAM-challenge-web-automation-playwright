import { Page } from 'playwright-core'
import { expect } from '@playwright/test'

export class WebTestAssert {
  private _pageControl: Page

  get pageControl(): Page {
    if (!this._pageControl) {
      console.log('PageControl is Null')
    }
    return this._pageControl
  }

  SetPage(pageControl: Page): Page {
    this._pageControl = pageControl
    return pageControl
  }

  Assert(success: boolean): void {
    if (success) console.log('Test Ok')
    else console.log('Test not Ok')
    expect(success).toBeTruthy()
  }
}
