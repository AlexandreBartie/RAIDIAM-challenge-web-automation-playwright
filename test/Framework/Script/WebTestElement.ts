import { Locator } from 'playwright-core'
import { WebTestPage } from './WebTestPage'
import { findElementBy, roleType } from './WebTestTypes'

export class WebTestLocator {
  readonly web: WebTestPage

  private _tag: string
  private _findby: findElementBy = findElementBy.findByRole
  private _role: roleType
  private _locator: Locator

  private _key: string

  get hasLocator(): boolean {
    return this.locator != undefined
  }

  constructor(web: WebTestPage) {
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
          this._locator = this.web.findByRoleHasText(this.role, text)
        } else {
          this.setKey(this.tag)
          this._locator = this.web.findByRoleMatchName(this.role, this.tag)
        }
        break

      default:
        throw new Error('Invalid operation')
    }
  }
}

export class WebTestAtributes extends WebTestLocator {
  async isVisible(text?: string): Promise<boolean> {
    if (text) this.setLocator(text)
    return await this.locator.isVisible()
  }

  hasText(text: string): boolean {
    this.setLocator(text)
    return this.hasLocator
  }
}

export class WebTestElement<T> extends WebTestAtributes {
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
