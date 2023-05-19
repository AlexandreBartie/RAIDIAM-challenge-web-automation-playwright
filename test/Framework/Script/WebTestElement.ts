import { Locator } from 'playwright-core'
import { WebTestPage } from './WebTestPage'

export type roleType =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'blockquote'
  | 'button'
  | 'caption'
  | 'cell'
  | 'checkbox'
  | 'code'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'deletion'
  | 'dialog'
  | 'directory'
  | 'document'
  | 'emphasis'
  | 'feed'
  | 'figure'
  | 'form'
  | 'generic'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'insertion'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'marquee'
  | 'math'
  | 'meter'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'none'
  | 'note'
  | 'option'
  | 'paragraph'
  | 'presentation'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'strong'
  | 'subscript'
  | 'superscript'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'time'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem'

export enum findElementBy {
  findByID = 'id',
  findByRole = 'role',
  findByTitle = 'title',
}

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
  public setLocator(): void {
    switch (this.findby) {
      case findElementBy.findByTitle:
        this._locator = this.web.findByPlaceholder(this.key)
        break

      case findElementBy.findByRole:
        this._locator = this.web.findByRole(this.role, this.key)
        break

      default:
        throw new Error('Invalid operation')
    }

    if (this.failLocator)
      throw new Error(`findLocator fail! The element ${this.key} dont find!`)
  }
}

export class WebTestElement extends WebTestLocator {}

export class WebTextBox extends WebTestElement {
  setup(title: string, findby: findElementBy): WebTextBox {
    this.setKey(title)
    this.setFindby(findby)
    return this
  }

  async fill(text: string): Promise<void> {
    await this.locator.fill(text)
  }
}

export class WebButton extends WebTestElement {
  setup(title: string, role: roleType): WebButton {
    this.setKey(title)
    this.setRole(role)
    return this
  }
  async click(): Promise<void> {
    await this.locator.click()
  }
}

export class WebLink extends WebTestElement {
  setup(role: roleType): WebButton {
    this.setRole(role)
    return this
  }
  async click(): Promise<void> {
    await this.locator.click()
  }
}

export class WebList extends WebTestElement {
  setup(role: roleType): WebList {
    this.setRole(role)
    return this
  }
  async AssertItem(title: string): Promise<void> {
    await this.setLocator().click()
  }

  async Assert(success = true) {
    await expect(success).toBeTruthy()
  }
}
