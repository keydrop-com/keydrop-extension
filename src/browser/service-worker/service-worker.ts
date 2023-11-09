import { consoleLog } from '@/utils/common'

class ExtensionServiceWorker {
  async main(): Promise<void> {
    console.log('running service worker')
  }

  async init(): Promise<void> {
    try {
      await this.main()
    } catch (e) {
      consoleLog('service-worker error', e)
    }
  }
}

new ExtensionServiceWorker()
  .init()
  .then(() => consoleLog('service-worker initialized'))
  .catch(() => consoleLog('service-worker error'))
