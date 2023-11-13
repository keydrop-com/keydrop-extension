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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lang: any
}

export type BalanceParams = { skinsValue: boolean }

export type BalanceResponse = {
  status: boolean
  pkt: number
  vdolce: number
  gold: number
}
