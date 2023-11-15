export enum CATEGORY_FILTER {
  ALL = 'all',
  SKINS = 'skin',
  GAMES = 'game',
}

export enum SORTING_VARIANT {
  NEWEST = 'newest',
  OLDEST = 'oldest',
  PRICE_ASC = 'priceAscending',
  PRICE_DESC = 'priceDescending',
}

export enum STATE_FILTER {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ITEM_TYPE {
  skin = 'skin',
  game = 'game',
}

enum ITEM_STATUS {
  NEW = '0', // Nowe (dostępne do sprzedaży, upgradera, odbioru)
  COLLECTED = '1', // Odebrane (niż już z tym się nie zrobi, po prostu istnieje wpis)
  SOLD = '2', // Sprzedane (niż już z tym się nie zrobi, po prostu istnieje wpis)
  FOR_EXCHANGE = '3', // Do wymiany (dostępne do sprzedaży, upgradera, odbioru)
  EXCHANGED_OR_BLOCKED = '4', // Zablokowany / Wymieniony (nic już z tym się nie zrobi, po prostu istnieje wpis)
  PENDING = '5', // Czeka na odpowiedź od Steama
  UPGRADED = '6', // Wymienione w Upgraderze
  EXCHANGED = '7', // Wymienione w SkinChanger
}

export enum ITEM_SOURCE_TYPE {
  loser = 'loser',
  upgrader = 'upgrader',
  giveaway = 'giveaway',
  contract = 'contract',
  contest = 'contest',
  scratchCard = 'scratchCard',
  skinchanger = 'skinchanger',
  caseBattle = 'caseBattle',
  eventBattle = 'eventBattle',
  eventHitAHole = 'eventHitAHole',
  freeCaseBattle = 'freeCaseBattle',
  skinback = 'skinback',
  pairtopair = 'pairtopair',
}

export type Item = {
  id?: string
  pfId?: number
  name: string
  createdAt: string
  type: ITEM_TYPE
  status: ITEM_STATUS
  platform: string
  currency: string
  price: number
  color: string
  image: string
  upgrade: boolean
  sourceType: ITEM_SOURCE_TYPE
  sourceName: string | null
  sourceLink?: string
  // FOR GAMES
  code?: string
  banner?: string
  sell?: boolean // can game be sold?
  weaponType?: string
}

export type MyWinnerListParams = {
  type: CATEGORY_FILTER
  sort: SORTING_VARIANT
  weaponType: string
  state: STATE_FILTER
  per_page: string
  current_page: string
}

export type MyWinnerListResponse = {
  status: boolean
  message: string
  total: number
  perPage: number
  currentPage: number
  state: STATE_FILTER
  type: CATEGORY_FILTER
  data: Item[]
}

export type ItemMarketDataResponse = {
  ID_loser: string
  Stage: string
  Error: string | boolean
  Trade_status: string
  Exchange: boolean
}

export type EqValueResponse = {
  fullPrice: string
  currency: string
}
