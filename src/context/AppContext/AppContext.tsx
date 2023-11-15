import { createContext, FC, ReactNode, useContext, useEffect, useReducer } from 'react'

import { INIT_APP_STATE } from '@/constants/app'
import { setAppData, setStorage, setUserProfile } from '@/context/AppContext/appReducers'
import { userAppReducer } from '@/context/AppContext/useAppReducer'
import { AppDispatch, AppState } from '@/types/app'
import { consoleLog } from '@/utils/common'

export type AppProviderProps = { children: ReactNode }

export type AppContextType = { appState: AppState; dispatch: AppDispatch }

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [appState, dispatch] = useReducer(userAppReducer, INIT_APP_STATE)
  const steamId = appState.appData.steamId

  useEffect(() => {
    setAppData(dispatch).catch((e) => consoleLog('setAppData', e))
  }, [])

  useEffect(() => {
    setUserProfile(dispatch, steamId).catch((e) => consoleLog('setUserProfile', e))
  }, [appState.appData.steamId])

  useEffect(() => {
    setStorage(dispatch).catch((e) => consoleLog('setStorage', e))
  }, [])

  return <AppContext.Provider value={{ appState, dispatch }}>{children}</AppContext.Provider>
}

export const useApp = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider')
  }
  return context
}
