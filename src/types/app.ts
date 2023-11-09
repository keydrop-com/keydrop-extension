import { UserProfile } from '@/types/API/profile'
import { AppStorage } from '@/types/storage'
import { ActiveView } from '@/types/views'

export type AppData = {
  refreshToken: string
  token: string
  tokenExp: string
  deviceId: string
}

export type AppState = {
  userProfile: UserProfile
  appData: AppData
  loggedIn: boolean
  activeView: ActiveView
  appStorage: AppStorage
  isAnyNotificationToRead: boolean
}

export type Action =
  | { type: 'setUser'; value: UserProfile }
  | { type: 'setAppData'; value: AppData }
  | { type: 'setActiveView'; value: ActiveView }
  | { type: 'syncStorage'; value: AppStorage }
  | { type: 'setIsAnyNotificationToRead'; value: boolean }

export type Dispatch = (action: Action) => void
