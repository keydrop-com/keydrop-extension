import {
  CATEGORY_FILTER,
  EqValueResponse,
  Item,
  ItemMarketDataResponse,
  MyWinnerListResponse,
  SellEqResponse,
  SORTING_VARIANT,
  STATE_FILTER,
} from '@/types/API/http/inventory'
import { ItemService, UserInventoryData, WeaponTypeOption } from '@/types/inventory'

export type InventoryContext = {
  mirrorUrl: string
  filters: {
    state: STATE_FILTER
    weaponType: string
    category: string[]
    perPage: number
    currentPage: number
  }
  weaponTypeOptions: WeaponTypeOption[]
  sortingVariant: SORTING_VARIANT
  sortingOptions: SORTING_VARIANT[]
  eqValue: EqValueResponse
  data: {
    data: Item
    ref: ItemService
  }[]
  marketData: ItemMarketDataResponse[]
  dataResponse: MyWinnerListResponse
}

export type InventoryMachineServices = {
  getUserItems: {
    data: MyWinnerListResponse
  }
  getMarketItemsData: {
    data: ItemMarketDataResponse[]
  }
  getMarketItemsDataInterval: {
    data: ItemMarketDataResponse[]
  }
  getUserEqValue: {
    data: EqValueResponse
  }
  getUserInventoryData: {
    data: UserInventoryData
  }
  sellEq: {
    data: SellEqResponse
  }
}

export type InventoryMachineEvent =
  | { type: 'TOGGLE_STATE_FILTER' }
  | { type: 'SET_ACTIVE_STATE_FILTER' }
  | { type: 'SET_ALL_STATE_FILTER' }
  | { type: 'SET_WEAPON_TYPE_FILTER'; payload: string }
  | { type: 'SET_CATEGORY_FILTERS'; payload: Array<string | CATEGORY_FILTER> }
  | { type: 'RESET_FILTERS' }
  | { type: 'LOAD_MORE' }
  | { type: 'RETRY' }
  | { type: 'SELL_EQ' }
  | { type: 'REFRESH_EQ' }
  | { type: 'SET_SORTING_VARIANT'; payload: SORTING_VARIANT }
  | { type: 'UPDATE_BALANCE' }
  | { type: 'REFRESH_MARKET_DATA'; data: ItemMarketDataResponse[] }
  | { type: 'HARD_INVENTORY_REFRESH' }
