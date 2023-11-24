import { tabs } from 'webextension-polyfill'

class CommonClient {
  static async openInNewTab(url: string): Promise<void> {
    return tabs.create({ url }).then(() => window.close())
  }
}

export default CommonClient
