import { createContext, FC, ReactNode, useContext, useEffect, useReducer } from 'react'

import { INIT_STATE } from '@/constants/app'
import {
  setAppData,
  setIsAnyNotificationToRead,
  setStorage,
  setUserProfile,
} from '@/context/AppContext/appReducers'
import { userAppReducer } from '@/context/AppContext/useAppReducer'
import { AppState, Dispatch } from '@/types/app'
import { consoleLog } from '@/utils/common'

export type AppProviderProps = { children: ReactNode }

export type AppContextType = { appState: AppState; dispatch: Dispatch }

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [appState, dispatch] = useReducer(userAppReducer, INIT_STATE)

  const value = { appState, dispatch }

  useEffect(() => {
    setAppData(dispatch).catch((e) => consoleLog('setAppData', e))
  }, [])

  useEffect(() => {
    setUserProfile(dispatch, appState.appData.steamId).catch((e) => consoleLog('setUserProfile', e))
  }, [appState.appData.steamId])

  useEffect(() => {
    setStorage(dispatch).catch((e) => consoleLog('setStorage', e))
  }, [])

  useEffect(() => {
    setIsAnyNotificationToRead(dispatch, appState).catch((e) =>
      consoleLog('setIsAnyNotificationToRead', e),
    )
  }, [appState.userProfile])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider')
  }
  return context
}
