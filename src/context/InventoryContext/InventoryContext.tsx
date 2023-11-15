import { createContext, FC, ReactNode, useContext, useReducer } from 'react'

import { INIT_INVENTORY_STATE } from '@/constants/inventory'
import { useInventoryReducer } from '@/context/InventoryContext/useAppReducer'
import { InventoryDispatch, InventoryState } from '@/types/inventory'

export type InventoryProviderProps = { children: ReactNode }

export type InventoryContextType = { inventoryState: InventoryState; dispatch: InventoryDispatch }

export const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

export const InventoryProvider: FC<InventoryProviderProps> = ({ children }) => {
  const [inventoryState, dispatch] = useReducer(useInventoryReducer, INIT_INVENTORY_STATE)

  return (
    <InventoryContext.Provider value={{ inventoryState, dispatch }}>
      {children}
    </InventoryContext.Provider>
  )
}

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext)
  if (context === undefined) {
    throw new Error('useInventory must be used within a InventoryProvider')
  }
  return context
}
