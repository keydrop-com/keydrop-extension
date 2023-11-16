import { useMachine } from '@xstate/react'
import { createContext, FC, ReactNode, useContext } from 'react'
import { Sender, StateFrom } from 'xstate'

import { AppMachine, AppMachineEvent } from '@/machines/AppMachine/App.machine'

interface AppContextProvider {
  children: ReactNode
}

interface AppContextInterface {
  appState: StateFrom<typeof AppMachine>
  appSend: Sender<AppMachineEvent>
}

export const AppContext = createContext<AppContextInterface>({
  appState: AppMachine.initialState,
  appSend: () => null,
})

export const AppContextProvider: FC<AppContextProvider> = ({ children }) => {
  const [state, send] = useMachine(AppMachine)

  return (
    <AppContext.Provider value={{ appState: state, appSend: send }}>{children}</AppContext.Provider>
  )
}

export const useAppContext = (): AppContextInterface => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used inside the AppContextProvider')
  }

  return context
}
