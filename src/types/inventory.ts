import { ActorRefFrom } from 'xstate'

import ItemMachine from '@/machines/InventoryItemMachine/InventoryItem.machine'

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

export enum INVENTORY_EVENT {
  toggleStateFilter = 'toggleStateFilter',
  setActiveStateFilter = 'setActiveStateFilter',
  setAllStateFilter = 'setAllStateFilter',
  setWeaponTypeFilter = 'setWeaponTypeFilter',
  setCategoryFilter = 'setCategoryFilter',
  resetFilters = 'resetFilters',
  loadMore = 'loadMore',
  retry = 'retry',
  sellEq = 'sellEq',
  refreshEq = 'refreshEq',
  setSortingVariant = 'setSortingVariant',
}
