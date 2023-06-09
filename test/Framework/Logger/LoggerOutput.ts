import fs from 'fs'
import path from 'path'

export class LoggerOutput {
  private folder: string

  constructor(folder: string) {
    this.folder = folder
  }

  logFile(): string {
    return path.join(this.logFolder(), this.logFileName())
  }

  logFileName(): string {
    return `log_${new Date().toISOString().replace(/:/g, '-')}.log`
  }

  logFolder(): string {
    if (!fs.existsSync(this.folder)) {
      fs.mkdirSync(this.folder)
    }
    return this.folder
  }
}
