import { ActiveView } from '@/types/views'

export enum OpenIn {
  new_tab = 'new_tab',
  popup = 'popup',
}

export enum SettingsEnum {
  auto_creating_trade = 'auto_creating_trade',
  default_view = 'default_view',
  disable_offer_edit = 'disable_offer_edit',
  offer_message = 'offer_message',
  open_in = 'open_in',
}

export type ExtensionSettings = {
  [SettingsEnum.default_view]: ActiveView
}

export type SteamSettings = {
  [SettingsEnum.auto_creating_trade]: boolean
  [SettingsEnum.disable_offer_edit]: boolean
  [SettingsEnum.offer_message]: string
  [SettingsEnum.open_in]: OpenIn
}

export type AppStorage = ExtensionSettings & SteamSettings

export type Storage = {
  appStorage: AppStorage
  version: string
}
