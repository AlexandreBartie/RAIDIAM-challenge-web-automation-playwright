import { LoggerActions } from '../Logger/LoggerActions'
import { LoggerSettings } from '../Logger/LoggerSettings'

class TestLogger extends LoggerActions {
  private settings = new LoggerSettings()

  constructor() {
    super()
    this.logger = this.settings.newLogger('debug')
  }
}

const logger = new TestLogger()

export { logger }
