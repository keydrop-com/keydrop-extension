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

export enum ITEM_STATUS {
  NEW = '0', // Nowe (dostępne do sprzedaży, upgradera, odbioru) OK
  COLLECTED = '1', // Odebrane (niż już z tym się nie zrobi, po prostu istnieje wpis) OK
  SOLD = '2', // Sprzedane (niż już z tym się nie zrobi, po prostu istnieje wpis) OK
  FOR_EXCHANGE = '3', // Do wymiany (dostępne do sprzedaży, upgradera, odbioru) OK
  EXCHANGED_OR_BLOCKED = '4', // Zablokowany / Wymieniony (nic już z tym się nie zrobi, po prostu istnieje wpis) OK
  PENDING = '5', // Czeka na odpowiedź od Steama OK
  UPGRADED = '6', // Wymienione w Upgraderze OK
  EXCHANGED = '7', // Wymienione w SkinChanger OK
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
  type: CATEGORY_FILTER | string
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

export type SellEqResponse = {
  status: boolean
}

export type SellItemParams = {
  id: string
}

export type SellItemResponse = {
  Info: string
  Status: number | boolean
  info_v2: string
}

export type SellGameParams = {
  id: string
}

export type SellGameResponse = {
  Info: string
  Status: number | boolean
  info_v2: string
}

export type CollectSkinParams = {
  id: string
}

export type CollectSkinResponse = {
  Info: string
  Status: number | boolean
  Kyc: boolean
  info_v2: string
}

export type CollectGameParams = {
  id: string
}

export type CollectGameResponse = {
  Info: string
  Status: number | boolean
  Kyc: boolean
  info_v2: string
  code: string
}

export enum ITEM_MARKET_STATUS {
  NEW = '0', // Nowe (oczekuje na operacje z bota)
  PROPOSED = '1', // Oferta w przygotowaniu (została wysłana do klienta)
  ACCEPTED = '2', // Oferta zaakceptowana (klient odebrał przedmiot)
  ERROR = '3', // Błąd (z różnych powodów, wypełnione pole error)
  CANCELLED = '5', // Oferta została odrzucona lub anulowana
}
