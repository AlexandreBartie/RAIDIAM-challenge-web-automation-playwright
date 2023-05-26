import { Locator } from 'playwright-core'
import { roleType } from './WebTestTypes'
import { WebTestAssert } from './WebTestAssert'

export class WebTestPage extends WebTestAssert {
  findByPlaceholder(title: string): Locator {
    const locator = this.driver.getByPlaceholder(title)
    return locator
  }

  findByRoleMatchName(role: roleType, name: string): Locator {
    const locator = this.driver.getByRole(role, { name: name })
    return locator
  }

  findByRoleHasText(role: roleType, text: string): Locator {
    const locator = this.driver.getByRole(role).filter({ hasText: text })
    return locator
  }

  async pause(seconds = 0.5): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
  }
}
