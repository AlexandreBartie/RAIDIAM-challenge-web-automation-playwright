import { Page } from 'playwright-core'
import { expect } from '@playwright/test'

export class WebTestDriver {
  private _driver: Page

  get driver(): Page {
    return this._driver
  }

  get failDriver(): boolean {
    return !this._driver
  }

  constructor(driver?: Page) {
    if (driver) this._driver = driver
  }

  SetDriver(driver: Page): Page {
    this._driver = driver
    return driver
  }
  Assert(success: boolean, msg?: string): boolean {
    expect(success, `${msg}`).toBeTruthy()
    return success
  }
}
