import { BalanceResponse, ProfilePageResponse } from '@/types/API/http/profile'

export type AppData = {
  sessionId: string
  steamId: string
}

export enum ActiveView {
  MAIN = 'main-view',
  INVENTORY = 'your-inventory-view',
  NOTIFICATIONS = 'notifications-view',
  SETTINGS = 'settings-view',
}

export type CountersAnimations = {
  [key in ActiveView]: boolean
}

export type AppState = {
  userProfile: ProfilePageResponse
  userBalance: BalanceResponse
  appData: AppData
  loggedIn: boolean
  isLoading: boolean
  activeView: ActiveView
  appStorage: AppStorage
  countersAnimations: CountersAnimations
}

export type Action =
  | { type: 'SET_USER_PROFILE'; value: ProfilePageResponse }
  | { type: 'SET_USER_BALANCE'; value: BalanceResponse }
  | { type: 'SET_COUNTER_ANIMATIONS'; value: ActiveView }
  | { type: 'SET_APP_DATA'; value: AppData }
  | { type: 'SET_ACTIVE_VIEW'; value: ActiveView }
  | { type: 'SYNC_STORAGE'; value: AppStorage }

export type Dispatch = (action: Action) => void

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
