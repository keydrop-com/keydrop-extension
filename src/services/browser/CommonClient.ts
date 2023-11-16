import { Tabs, tabs } from 'webextension-polyfill'

class CommonClient {
  static async openInNewTab(url: string): Promise<Tabs.Tab> {
    return tabs.create({ url })
  }
}

export default CommonClient
