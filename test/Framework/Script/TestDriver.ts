import { Page } from 'playwright-core'
import { expect } from '@playwright/test'
import { logger } from './TestLogger'

export type loadType = 'load' | 'domcontentloaded' | 'networkidle'

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
  private get label(): string {
    return 'The PAGE driver'
  }

  constructor(driver?: Page) {
    if (driver) this._driver = driver
  }

  async waitLoad(type: loadType): Promise<void> {
    await this.driver.waitForLoadState(type)
  }

  setDriver(driver: Page): Page {
    if (!driver) logger.error(`${this.label} is null.`)
    this._driver = driver
    if (this.isClosed) logger.error(`${this.label} is closed.`)
    return driver
  }
  assert(success: boolean, msg: string): boolean {
    const msgError = `${msg} was FAILED!`
    if (success) logger.info(msg)
    else logger.error(msgError)

    expect(success, msgError).toBeTruthy()
    return success
  }

  assertFail(msg: string): boolean {
    return this.assert(false, msg)
  }

  async end(): Promise<void> {
    await this._driver.close()
    logger.info(`${this.label} was closed.`)
  }
  async pause(seconds = 0.5): Promise<void> {
    logger.info(`Pause ${seconds} seconds.`)
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
  }
}
