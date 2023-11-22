import './content-script.css'

import { checkUrl } from '@/browser/content-script/scripts/checkUrl'
import { insertFonts } from '@/browser/content-script/scripts/insertFonts'
import { insertKeydropBanner } from '@/browser/content-script/scripts/insertKeydropBanner'

class ExtensionContentScript {
  async main(): Promise<void> {
    const ok = await checkUrl()
    if (!ok) return
    await insertFonts()
    await insertKeydropBanner()
  }

  async init(): Promise<void> {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', async () => {
        await this.main()
      })
    } else {
      await this.main()
    }
  }
}

new ExtensionContentScript().init().catch((e) => console.log('content-script error', e))
