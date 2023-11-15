import { INIT_APP_DATA } from '@/constants/app'
import { getKeydropCookies, getSteamId } from '@/services/browser/cookies'
import ProfileClient from '@/services/http/ProfileClient'
import { AppDispatch } from '@/types/app'

export const setAppData = async (dispatch: AppDispatch): Promise<void> => {
  const sessionId = (await getKeydropCookies())?.session_id
  const steamId = await getSteamId()

  console.log({ sessionId, steamId })

  if (!sessionId || !steamId) {
    dispatch({ type: 'SET_APP_DATA', value: INIT_APP_DATA })
    return
  }

  dispatch({ type: 'SET_APP_DATA', value: { sessionId, steamId } })
  return
}

export const setUserProfile = async (dispatch: AppDispatch, steamId: string): Promise<void> => {
  if (!steamId) {
    dispatch({ type: 'SET_APP_DATA', value: INIT_APP_DATA })
    return
  }

  const userProfile = await ProfileClient.getUserProfile({ steamId }).catch(() => {
    dispatch({ type: 'SET_APP_DATA', value: INIT_APP_DATA })
    return null
  })

  if (!userProfile) return

  dispatch({ type: 'SET_USER_PROFILE', value: userProfile })
  return
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setStorage = async (dispatch: AppDispatch): Promise<void> => {
  return
  // return await getAppStorage()
  //   .then((appStorage) => {
  //     if (appStorage) {
  //       dispatch({ type: 'SYNC_STORAGE', value: appStorage })
  //       dispatch({ type: 'SET_ACTIVE_VIEW', value: appStorage.default_view })
  //       return true
  //     } else {
  //       saveAppStorage(DEFAULT_APP_STORAGE).catch(() => consoleLog('saving default storage failed'))
  //       dispatch({ type: 'SYNC_STORAGE', value: DEFAULT_APP_STORAGE })
  //       return true
  //     }
  //   })
  //   .catch(() => {
  //     saveAppStorage(DEFAULT_APP_STORAGE).catch(() => consoleLog('saving default storage failed'))
  //     dispatch({ type: 'SYNC_STORAGE', value: DEFAULT_APP_STORAGE })
  //     return true
  //   })
}
