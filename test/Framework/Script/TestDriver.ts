import { Page } from 'playwright-core'
import { expect } from '@playwright/test'
import { logger } from './TestLogger'

export class TestDriver {
  private _driver: Page

  get driver(): Page {
    return this._driver
  }

  get failDriver(): boolean {
    return !this._driver
  }

  get isClosed(): boolean {
    return this.driver.isClosed()
  }

  constructor(driver?: Page) {
    if (driver) this._driver = driver
  }

  async waitLoad(): Promise<void> {
    await this.driver.waitForLoadState('networkidle') // 'domcontentloaded')
  }

  setDriver(driver: Page): Page {
    if (!driver) logger.error('The page driver in null.')
    this._driver = driver
    if (this.isClosed) logger.error('The page driver is closed.')
    return driver
  }
  assert(success: boolean, msg: string): boolean {
    const msgError = `${msg} was FAILED!`
    if (success) logger.info(msg)
    else logger.error(msgError)

    expect(success, msgError).toBeTruthy()
    return success
  }

  async end(): Promise<void> {
    await this._driver.close()
    logger.info('The page driver was closed.')
  }
  async pause(seconds = 0.5): Promise<void> {
    logger.info(`Pause ${seconds} seconds.`)
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
  }
}
