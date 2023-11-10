import { ProfilePageResponse } from '@/types/API/http/profile'
import { ActiveView, AppData, AppState, AppStorage, OpenIn } from '@/types/app'

export const STORAGE_VERSION = '1.0'

export const INIT_USER_PROFILE: ProfilePageResponse = {
  bot: false,
  creator: false,
  steamId: '',
  skinBg: '',
  stats: {
    cases: 0,
    upgrades: 0,
    freeCases: 0,
    battle: 0,
    contract: 0,
    bestDrop: {
      id: '',
      title: '',
      color: '',
      subtitle: '',
      hashName: '',
      icon: '',
      price: 0,
      currency: '',
      condition: '',
      winPercent: 0,
    },
    favoriteCase: {
      currency: '',
      casePrice: 0,
      caseName: '',
      caseImg: '',
      caseLink: '',
    },
  },
  user: {
    username: '',
    avatar: '',
    link: '',
  },
  lang: undefined,
}

export const INIT_APP_DATA: AppData = { sessionId: '', steamId: '' }

export const DEFAULT_APP_STORAGE: AppStorage = {
  auto_creating_trade: false,
  default_view: ActiveView.MAIN,
  disable_offer_edit: true,
  offer_message: '',
  open_in: OpenIn.new_tab,
}

export const INIT_STATE: AppState = {
  userProfile: INIT_USER_PROFILE,
  appData: INIT_APP_DATA,
  loggedIn: false,
  activeView: ActiveView.MAIN,
  appStorage: DEFAULT_APP_STORAGE,
  isAnyNotificationToRead: false,
}

export const DEFAULT_VIEW_OPTIONS: { value: ActiveView; label: string }[] = [
  { value: ActiveView.MAIN, label: 'userProfile.title' },
  { value: ActiveView.INVENTORY, label: 'pendingTrades.title' },
  { value: ActiveView.NOTIFICATIONS, label: 'notifications.title' },
]
