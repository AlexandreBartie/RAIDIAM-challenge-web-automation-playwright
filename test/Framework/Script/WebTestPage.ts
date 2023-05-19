import { Locator } from 'playwright-core'
import { SystemMapping } from '../../Conduit/SystemMapping'
import { roleType } from './WebTestTypes'
import { WebTestAssert } from './WebTestAssert'

export class WebTestPage extends WebTestAssert {
  public map = new SystemMapping(this)

  findByPlaceholder(title: string): Locator {
    return this.page.getByPlaceholder(title)
  }

  findByRoleMatchName(role: roleType, name: string): Locator {
    return this.page.getByRole(role, { name: name })
  }

  findByRoleHasText(role: roleType, text: string): Locator {
    return this.page.getByRole(role).filter({ hasText: text })
  }

  async pause(seconds = 1): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
  }
}
