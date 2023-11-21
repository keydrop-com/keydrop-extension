import { storage, Tabs, tabs } from 'webextension-polyfill'

import { AppStorage } from '@/types/app'

class CommonClient {
  static async openInNewTab(url: string): Promise<Tabs.Tab> {
    return tabs.create({ url })
  }

  static async getFromStorage<T = Record<string, any>>(key: string): Promise<T> {
    return (await storage.sync.get(key)) as T
  }

  static async setInStorage(value: Record<string, any>): Promise<void> {
    return await storage.sync.set(value)
  }

  static async getAppStorage(): Promise<AppStorage> {
    return this.getFromStorage('appStorage')
  }
}

export default CommonClient
