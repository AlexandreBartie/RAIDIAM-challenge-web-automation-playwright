import { Locator, Page } from 'playwright-core'
import { SystemMapping } from '../../Conduit/SystemMapping'
import { roleType } from './WebTestElement'

export class WebTestAssert {
  public page: Page

  SetPage(page: Page): void {
    this.page = page
  }
}

export class WebTestPage extends WebTestAssert {
  public map = new SystemMapping(this)

  findByPlaceholder(title: string): Locator {
    return this.page.getByPlaceholder(title)
  }

  findByRole(role: roleType, name: string): Locator {
    return this.page.getByRole(role, { name: name })
  }

  findByRoleFilter(role: roleType, text: string): Locator {
    return this.page.getByRole(role).filter({ hasText: text })
  }

  async pause(seconds = 1): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
  }
}
