import { ElementHandle, Locator } from 'playwright-core'
import { TestPage } from './TestPage'
import { findElementBy, roleType, stateType } from './TestTypes'
import { logger } from './TestLogger'

export class TestLocator {
  readonly web: TestPage

  private _tag: string
  private _findby: findElementBy = findElementBy.findByRole
  private _role: roleType
  private _locator: Locator

  private _key: string

  get hasLocator(): boolean {
    return this.locator != undefined
  }

  constructor(web: TestPage) {
    this.web = web
  }
  // Getter
  public get key(): string {
    return this._key
  }
  public get tag(): string {
    return this._tag
  }
  public get findby(): findElementBy {
    return this._findby
  }
  public get role(): roleType {
    return this._role
  }

  public get locator(): Locator {
    if (!this._locator) this.setLocator()

    return this._locator
  }

  // Setter
  public setKey(key: string): void {
    this._key = key
  }
  public setTitle(title?: string): void {
    if (title) this._tag = title
  }
  public setFilter(filter: string): void {
    this._tag = filter
  }
  public setFindby(findby: findElementBy): void {
    this._findby = findby
  }
  public setRole(role: roleType): void {
    this._role = role
  }
  public setLocator(text?: string): void {
    switch (this.findby) {
      case findElementBy.findByTitle:
        this.setKey(this.tag)
        this._locator = this.web.findByPlaceholder(this.tag)
        break

      case findElementBy.findByRole:
        if (text) {
          this.setKey(text)
          this._locator = this.web.findByRole(this.role, text)
        } else {
          this.setKey(this.tag)
          this._locator = this.web.findByRole(this.role, this.tag)
        }
        break

      case findElementBy.findByFilter:
        if (text) {
          this.setKey(text)
          this._locator = this.web.findByFilter(this.role, text)
        } else {
          this.setKey(this.tag)
          this._locator = this.web.findByFilter(this.role, this.tag)
        }
        break

      default:
        throw new Error('Invalid operation')
    }
  }

  async waitForVisible(text?: string): Promise<boolean> {
    return this.waitFor(text, 'visible')
  }

  private async waitFor(text?: string, type?: stateType): Promise<boolean> {
    this.setLocator(text)
    if (type) {
      try {
        await this.locator.waitFor({ state: type, timeout: 5000 })
      } catch (e) {
        return false
      }
    }
    return true
  }
}

export class TestAtributes extends TestLocator {
  async handle(): Promise<null | ElementHandle<SVGElement | HTMLElement>> {
    return await this.locator.elementHandle()
  }

  async attribute(name: string): Promise<string> {
    let ret = await this.locator.getAttribute(name)

    if (ret == null) return (ret = '')

    return ret
  }

  async inputValue(): Promise<string> {
    return await this.locator.inputValue()
  }

  async isWait(text?: string): Promise<void> {
    if (text) {
      this.setLocator(text)
    }
    await this.locator.waitFor()
  }

  async isExist(text?: string): Promise<boolean> {
    if (text) {
      this.setLocator(text)
    }

    try {
      const x = await this.locator.isVisible()
      if (this.tag == 'Message' && !x) {
        console.log(x)
      }

      return true
    } catch (error) {
      logger.warn(`Element [${this.tag}] not exist.`)
    }
    return false
  }

  async isVisible(text?: string): Promise<boolean> {
    let isVisible = false
    if (await this.isExist(text)) {
      isVisible = await this.locator.isVisible()
    }
    return isVisible
  }

  async hasText(text?: string): Promise<boolean> {
    const hasText = await this.isExist(text)
    return hasText
  }
}

export class TestAsserts extends TestAtributes {
  AssertOk(success: boolean, msg: string): boolean {
    return this.web.assert(success, msg)
  }

  async AssertIsVisible(text?: string): Promise<boolean> {
    const isVisible = await this.waitForVisible(text)
    if (!isVisible) {
      console.log('Stop')
    }
    // const isVisible = await this.isVisible()
    // if (!isVisible) {
    //   console.log('stop')
    //   const isVisible2 = await this.isVisible()
    //   console.log(isVisible2)
    // }
    return this.AssertOk(isVisible, `Element [${this.tag}] is visible!`)
  }

  async AssertHasText(text: string): Promise<boolean> {
    const hasText = await this.waitForVisible(text)
    if (!hasText) {
      console.log('Stop')
    }

    // await expect(locator).toHaveText()

    // const hasText = await this.hasText(text)
    // if (!hasText) {
    //   console.log('Ok')
    //   const x = await this.hasText(text)
    //   console.log(x)
    // }
    return this.AssertOk(hasText, `Element [${this.tag}] has "${text}"`)
  }
}
export class TestElement<T> extends TestAsserts {
  setupByTitle(title: string): T {
    this.setTitle(title)
    this.setFindby(findElementBy.findByTitle)
    return this as unknown as T
  }
  setupByRole(role: roleType, title?: string): T {
    this.setRole(role)
    this.setTitle(title)
    return this as unknown as T
  }

  setupByFilter(role: roleType, title?: string): T {
    this.setRole(role)
    this.setTitle(title)
    this.setFindby(findElementBy.findByFilter)
    return this as unknown as T
  }

  async pause(seconds?: number): Promise<void> {
    if (seconds != 0) await this.web.pause(seconds)
  }
}
