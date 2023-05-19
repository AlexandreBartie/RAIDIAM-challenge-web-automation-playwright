import { Locator } from 'playwright-core'
import { WebTestPage } from './WebTestPage'
import { findElementBy, roleType } from './WebTestTypes'

export class WebTestLocator {
  readonly web: WebTestPage

  private _key: string
  private _findby: findElementBy = findElementBy.findByRole
  private _role: roleType
  private _locator: Locator

  get failLocator(): boolean {
    return !this._locator
  }

  constructor(web: WebTestPage) {
    this.web = web
  }
  // Getter
  public get key(): string {
    return this._key
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
  public setFindby(findby: findElementBy): void {
    this._findby = findby
  }
  public setRole(role: roleType): void {
    this._role = role
  }
  public setLocator(text?: string): void {
    switch (this.findby) {
      case findElementBy.findByTitle:
        this._locator = this.web.findByPlaceholder(this.key)
        break

      case findElementBy.findByRole:
        if (text) this._locator = this.web.findByRoleHasText(this.role, text)
        else this._locator = this.web.findByRoleMatchName(this.role, this.key)
        break

      default:
        throw new Error('Invalid operation')
    }

    if (this.failLocator)
      throw new Error(`findLocator fail! The element ${this.key} dont find!`)
  }
}

export class WebTestElement<T> extends WebTestLocator {
  setupByTitle(title: string): T {
    this.setKey(title)
    this.setFindby(findElementBy.findByTitle)
    return this as unknown as T
  }
  setupByRole(role: roleType, title?: string): T {
    this.setRole(role)
    if (title) this.setKey(title)
    return this as unknown as T
  }

  AssertHasText(text: string): void {
    this.setLocator(text)
    this.web.Assert(this.failLocator)
  }
}
