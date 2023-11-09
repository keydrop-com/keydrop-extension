import './content-script.css'

import { consoleLog } from '@/utils/common'

class ExtensionContentScript {
  async main(): Promise<void> {
    console.log('running content script')
  }

  async init(): Promise<void> {
    try {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', async () => {
          await this.main()
        })
      } else {
        await this.main()
      }
    } catch (e) {
      consoleLog('content-script error', e)
    }
  }
}

new ExtensionContentScript()
  .init()
  .then(() => consoleLog('content-script initialized'))
  .catch((e) => consoleLog('content-script error', e))
