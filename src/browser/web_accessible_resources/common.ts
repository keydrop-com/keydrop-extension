import { consoleLog } from '@/utils/common'

class Common {
  async main(): Promise<void> {
    console.log('running service worker')
  }

  async init(): Promise<void> {
    try {
      await this.main()
    } catch (e) {
      consoleLog('web_accessible_resources error', e)
    }
  }
}

new Common()
  .init()
  .then(() => consoleLog('web_accessible_resources initialized'))
  .catch((e) => consoleLog('web_accessible_resources error', e))
