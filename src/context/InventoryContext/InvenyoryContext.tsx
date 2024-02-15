import { useMachine } from '@xstate/react'
import { createContext, FC, ReactNode, useContext } from 'react'
import { Sender, StateFrom } from 'xstate'

import { useAppContext } from '@/context/AppContext'
import { InventoryMachine } from '@/machines/InventoryMachine/Inventory.machine'
import { InventoryMachineEvent } from '@/machines/InventoryMachine/Inventory.types'

interface InventoryContextProvider {
  children: ReactNode
}

interface InventoryContextInterface {
  inventoryState: StateFrom<typeof InventoryMachine>
  inventorySend: Sender<InventoryMachineEvent>
}

export const InventoryContext = createContext<InventoryContextInterface>({
  inventoryState: InventoryMachine.initialState,
  inventorySend: () => null,
})

export const InventoryContextProvider: FC<InventoryContextProvider> = ({ children }) => {
  const { appState } = useAppContext()
  const [state, send] = useMachine(InventoryMachine, {
    context: { mirrorUrl: appState.context.mirrorUrl },
  })

  return (
    <InventoryContext.Provider value={{ inventoryState: state, inventorySend: send }}>
      {children}
    </InventoryContext.Provider>
  )
}

export const useInventoryContext = (): InventoryContextInterface => {
  const context = useContext(InventoryContext)

  if (!context) {
    throw new Error('useInventoryContext must be used inside the InventoryContextProvider')
  }

  return context
}
