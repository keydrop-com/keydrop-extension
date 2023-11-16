import { BalanceResponse } from '@/types/API/http/balance'
import { ProfilePageResponse } from '@/types/API/http/profile'

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

export interface AppMachineContext {
  appData: AppData
  activeView: ActiveView
  userProfile: ProfilePageResponse
  userBalance: BalanceResponse
  countersAnimations: CountersAnimations
}
