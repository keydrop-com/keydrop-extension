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

export type AppProviderProps = { children: ReactNode }

export type AppContextType = { appState: AppState; dispatch: Dispatch } | undefined

export const AppContext = createContext<AppContextType>(undefined)

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [appState, dispatch] = useReducer(userAppReducer, INIT_STATE)

  const value = { appState, dispatch }

  useEffect(() => {
    setAppData(dispatch).catch(() => console.log('problem with sync user'))
  }, [])

  useEffect(() => {
    setUserProfile(dispatch, appState).catch(() => console.log('problem with get user profile'))
  }, [appState.appData])

  useEffect(() => {
    setStorage(dispatch).catch(() => console.log('problem with get and sync storage'))
  }, [])

  useEffect(() => {
    setIsAnyNotificationToRead(dispatch, appState).catch(() =>
      console.log('problem with getting notifications'),
    )
  }, [appState.userProfile])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

const useApp = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider')
  }
  return context
}

export { AppProvider, useApp }
