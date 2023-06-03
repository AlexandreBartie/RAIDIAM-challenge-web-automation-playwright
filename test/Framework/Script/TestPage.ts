import { Locator } from 'playwright-core'
import { roleType } from './TestTypes'
import { TestDriver } from './TestDriver'

export class TestPage extends TestDriver {
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

  findByFilter(role: roleType, filter: string): Locator {
    const locator = this.driver.getByRole(role).filter({ hasText: filter })
    return locator
  }
}
