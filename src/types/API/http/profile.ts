export type AffiliateType = 'basic' | 'creator'

export type InitUserDataResponse = {
  steamId: string
  accountPublic: boolean
  affiliateType: AffiliateType
  balance: number
  gold: string
  userKey: string
  eventCoin: number
  eventIsActive: boolean
  depositBonus: number
  currency: string
  currencyList: string[]
  rates: { id: string; rate: number }[]
  lang: string
  langList: Record<string, string>
  userName: string
  avatar: string
  email: string
  newsletter?: boolean
  tradeURL: string
  supportNotifications: number
  caseBattleTickets: number
}

export type ProfilePageParams = {
  steamId: string
}

export type ProfilePageResponse = {
  bot: boolean
  creator: boolean
  steamId: string
  skinBg: string
  stats: {
    cases: number
    upgrades: number
    freeCases: number
    battle: number
    contract: number
    bestDrop: {
      id: string
      title: string
      color: string
      subtitle: string
      hashName: string
      icon: string
      price: number
      currency: string
      condition: string
      winPercent: number
    }
    favoriteCase: {
      currency: string
      casePrice: number
      caseName: string
      caseImg: string
      caseLink: string
    }
  }
  user: {
    username: string
    avatar: string
    link: string
  }
  lang: any // eslint-disable-line
}
