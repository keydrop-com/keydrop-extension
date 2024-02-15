import { KEYDROP_BASE_URL } from '@/constants/urls'
import { ItemContext } from '@/machines/InventoryItemMachine/InventoryItem.types'
import { Item, ItemMarketDataResponse } from '@/types/API/http/inventory'

export const INIT_ITEM_MACHINE_CTX: ItemContext = {
  mirrorUrl: KEYDROP_BASE_URL,
  isPublic: true,
  data: {} as Item,
  marketData: {} as ItemMarketDataResponse,
}
