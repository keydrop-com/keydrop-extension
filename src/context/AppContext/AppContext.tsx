import { useMachine } from '@xstate/react'
import { createContext, FC, ReactNode, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
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
  const { t } = useTranslation('main', { keyPrefix: 'common' })
  const [state, send] = useMachine(AppMachine, {
    services: {
      userProfileErrorToast: () => {
        toast.error(t('error.userProfile'))
        return Promise.resolve()
      },
    },
  })

  useEffect(() => {
    window.__refetchBalance = () => send('REFETCH_BALANCE')
  }, [send])

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
