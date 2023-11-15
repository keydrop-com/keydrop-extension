import { InventoryAction, InventoryState } from '@/types/inventory'

export function useInventoryReducer(
  inventoryState: InventoryState,
  action: InventoryAction,
): InventoryState {
  switch (action.type) {
    case 'SET_DATA': {
      const data = action.value

      return { ...inventoryState, data }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}
