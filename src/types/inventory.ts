import { ActorRefFrom } from 'xstate'

import ItemMachine from '@/machines/InventoryItemMachine/InventoryItem.machine'
import {
  EqValueResponse,
  ItemMarketDataResponse,
  MyWinnerListResponse,
} from '@/types/API/http/inventory'

export type WeaponTypeOption = {
  name: string
  value: string
}

export type ItemService = ActorRefFrom<typeof ItemMachine>

export type InventoryItemRow = {
  itemDetails: ItemService
  status: ItemService
  date: ItemService
  actions: ItemService
}

export type UserInventoryData = {
  dataRes: MyWinnerListResponse
  marketDataRes: ItemMarketDataResponse[]
  eqValue: EqValueResponse
}
