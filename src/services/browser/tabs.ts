import { Tabs, tabs } from 'webextension-polyfill'

export const openInNewTab = async (url: string): Promise<Tabs.Tab> => tabs.create({ url })
