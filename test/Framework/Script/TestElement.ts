import { ElementHandle, Locator } from 'playwright-core'
import { TestPage } from './TestPage'
import { findElementBy, roleType } from './TestTypes'

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
  public setTitle(title: string): void {
    this._tag = title
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

    const x = await this.locator.isVisible()

    return x
  }

  hasText(text: string): boolean {
    this.setLocator(text)
    return this.hasLocator
  }
}

export class TestAsserts extends TestAtributes {
  AssertOk(success: boolean, msg?: string): boolean {
    return this.web.Assert(success, msg)
  }

  async AssertIsVisible(text?: string): Promise<boolean> {
    return this.AssertOk(await this.isVisible(text), `${this.key} not visible!`)
  }

  async AssertHasText(text: string): Promise<boolean> {
    await this.AssertIsVisible(text)
    return this.AssertOk(
      this.hasText(text),
      `${this.key} not have ${text} text!`,
    )
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
    if (title) this.setTitle(title)
    return this as unknown as T
  }

  async pause(seconds?: number): Promise<void> {
    await this.web.pause(seconds)
  }
}
