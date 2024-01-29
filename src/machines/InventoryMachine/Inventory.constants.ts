import { SORTING_OPTIONS, WEAPON_TYPE_OPTIONS } from '@/constants/inventory'
import { InventoryContext } from '@/machines/InventoryMachine/Inventory.types'
import { CATEGORY_FILTER, SORTING_VARIANT, STATE_FILTER } from '@/types/API/http/inventory'

export const INIT_INVENTORY_CONTEXT: InventoryContext = {
  mirrorUrl: 'https://key-drop.com/',
  filters: {
    state: STATE_FILTER.ACTIVE,
    weaponType: '',
    category: [],
    perPage: 18,
    currentPage: 1,
  },
  weaponTypeOptions: WEAPON_TYPE_OPTIONS,
  sortingVariant: SORTING_VARIANT.NEWEST,
  sortingOptions: SORTING_OPTIONS,
  eqValue: {
    currency: '',
    fullPrice: '',
  },
  data: [],
  marketData: [],
  dataResponse: {
    status: true,
    message: '',
    total: 0,
    perPage: 0,
    currentPage: 1,
    state: STATE_FILTER.ALL,
    type: CATEGORY_FILTER.ALL,
    data: [],
  },
}
