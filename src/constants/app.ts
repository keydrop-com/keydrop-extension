import { BalanceResponse, ProfilePageResponse } from '@/types/API/http/profile'
import { ActiveView, AppData, AppState, AppStorage, CountersAnimations, OpenIn } from '@/types/app'

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

export const INIT_USER_BALANCE: BalanceResponse = {
  gold: 0,
  pkt: 0,
  status: true,
  vdolce: 0,
}

export const INIT_COUNTER_ANIMATIONS: CountersAnimations = {
  [ActiveView.MAIN]: true,
  [ActiveView.INVENTORY]: true,
  [ActiveView.NOTIFICATIONS]: true,
  [ActiveView.SETTINGS]: true,
}

export const INIT_STATE: AppState = {
  userProfile: INIT_USER_PROFILE,
  userBalance: INIT_USER_BALANCE,
  appData: INIT_APP_DATA,
  loggedIn: false,
  isLoading: true,
  countersAnimations: INIT_COUNTER_ANIMATIONS,
  activeView: ActiveView.MAIN,
  appStorage: DEFAULT_APP_STORAGE,
}

export const DEFAULT_MOTION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.1 },
}

export const DEFAULT_APP_MOTION = {
  ...DEFAULT_MOTION,
  className: 'h-full w-full',
}
