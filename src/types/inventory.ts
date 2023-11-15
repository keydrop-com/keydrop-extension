import { Item } from '@/types/API/http/inventory'

export type InventoryState = {
  data: Item[]
}

export type InventoryAction = { type: 'SET_DATA'; value: Item[] }

export type InventoryDispatch = (action: InventoryAction) => void
