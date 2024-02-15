import {
  CollectGameResponse,
  CollectSkinResponse,
  Item,
  ItemMarketDataResponse,
  SellGameResponse,
  SellItemResponse,
} from '@/types/API/http/inventory'

export type ItemContext = {
  mirrorUrl: string
  isPublic: boolean
  data: Item
  marketData?: ItemMarketDataResponse
}

export type ItemEvent =
  | { type: 'UPGRADE' }
  | { type: 'SELL' }
  | { type: 'COLLECT' }
  | { type: 'EXCHANGE' }
  | { type: 'SHOW_ACTIVATION_GUIDE' }
  | { type: 'REFRESH_MARKET_STATUS'; data: ItemMarketDataResponse }
  | { type: 'INIT_MARKET_STATUS' }
  | { type: 'YES' }
  | { type: 'NO' }
  | { type: 'SET_SOLD' }

export type ItemServices = {
  collectGame: {
    data: CollectGameResponse
  }
  sellSkin: {
    data: SellItemResponse
  }
  collectSkin: {
    data: CollectSkinResponse
  }
  sellGame: {
    data: SellGameResponse
  }
}
