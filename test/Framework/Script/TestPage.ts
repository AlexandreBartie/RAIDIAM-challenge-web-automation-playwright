import { Locator } from 'playwright-core'
import { roleType } from './TestTypes'
import { WebTestDriver } from './TestDriver'

export class TestPage extends WebTestDriver {
  findByPlaceholder(title: string): Locator {
    const rule = new RegExp(title)
    const locator = this.driver.getByPlaceholder(rule)
    return locator
  }

  findByRole(role: roleType, name: string): Locator {
    const rule = new RegExp(name)
    const locator = this.driver.getByRole(role, { name: rule })
    return locator
  }

  async pause(seconds = 0.5): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
  }
}
