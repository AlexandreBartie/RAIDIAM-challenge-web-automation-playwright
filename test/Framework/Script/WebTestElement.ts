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

  private key: string

  private findby: findElementBy

  private role: roleType

  private _locator: Locator

  constructor(
    web: WebTestPage,
    key: string,
    findby: findElementBy,
    role: roleType = 'none',
  ) {
    this.web = web
    this.key = key
    this.findby = findby
    this.role = role
  }

  // Getter
  public get locator(): Locator {
    if (!this._locator) this._locator = this.findLocator()

    return this._locator
  }

  private findLocator(): Locator {
    let locator: Locator

    switch (this.findby) {
      case findElementBy.findByTitle:
        locator = this.web.findByPlaceholder(this.key)
        break

      case findElementBy.findByRole:
        locator = this.web.findByRole(this.role, this.key)
        break

      default:
        throw new Error('Invalid operation')
    }

    if (!locator)
      throw new Error(`findLocator fail! The element ${this.key} dont find!`)

    return locator
  }
}

export class WebTestElement extends WebTestLocator {}

export class WebTextBox extends WebTestElement {
  async fill(text: string): Promise<void> {
    await this.locator.fill(text)
  }
}

export class WebButton extends WebTestElement {
  async click(): Promise<void> {
    await this.locator.click()
  }
}

export class WebLink extends WebTestElement {
  async click(): Promise<void> {
    await this.locator.click()
  }
}
