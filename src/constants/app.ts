import { DEFAULT_APP_STORAGE } from '@/constants/storage'
import { AppData, AppState } from '@/types/app'
import { ActiveView } from '@/types/views'

export const INIT_APP_DATA: AppData = { refreshToken: '', token: '', deviceId: '', tokenExp: '' }

export const INIT_STATE: AppState = {
  userProfile: { userName: '', id: '' },
  appData: INIT_APP_DATA,
  loggedIn: false,
  activeView: ActiveView.userProfile,
  appStorage: DEFAULT_APP_STORAGE,
  isAnyNotificationToRead: false,
}
