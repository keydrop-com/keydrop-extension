import { DEFAULT_MOTION } from '@/constants/common'
import { BalanceResponse } from '@/types/API/http/balance'
import { ProfilePageResponse } from '@/types/API/http/profile'
import { ActiveView, AppData, AppStorage, CountersAnimations } from '@/types/app'

export const DEFAULT_APP_MOTION = {
  ...DEFAULT_MOTION,
  className: 'h-full w-full',
}

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

export const INIT_APP_STORAGE: AppStorage = {
  lang: 'en',
  version: '1.0.0',
}
