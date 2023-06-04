import { ElementHandle, Locator } from 'playwright-core'
import { TestPage } from './TestPage'
import { findElementBy, roleType } from './TestTypes'
import { logger } from '../Script/TestLogger'

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

    return this._locator // this._locator
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

  async isVisible(text?: string): Promise<boolean> {
    if (text) {
      this.setLocator(text)
    }

    try {
      const isVisible = await this.locator.isVisible()
      return isVisible
    } catch (e) {
      logger.warn(`Element [${this.tag}] not exist.`)
    }
    return false
  }

  async hasText(text: string): Promise<boolean> {
    this.setLocator(text)
    return await this.isVisible()
  }
}

export class TestAsserts extends TestAtributes {
  AssertOk(success: boolean, msg?: string): boolean {
    if (!success && msg) logger.error(msg)
    return this.web.Assert(success, msg)
  }

  async AssertIsVisible(text?: string): Promise<boolean> {
    const isVisible = await this.isVisible(text)
    return this.AssertOk(isVisible, `${this.tag} not visible!`)
  }

  async AssertHasText(text: string): Promise<boolean> {
    const hasText = await this.hasText(text)
    return this.AssertOk(hasText, `${this.tag} not have "${text}" text!`)
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
    await this.web.pause(seconds)
  }
}
