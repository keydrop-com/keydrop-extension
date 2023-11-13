import { INIT_APP_DATA } from '@/constants/app'
import { getKeydropCookies, getSteamId } from '@/services/browser/cookies'
import ProfileClient from '@/services/http/ProfileClient'
import { Dispatch } from '@/types/app'

export const setAppData = async (dispatch: Dispatch): Promise<void> => {
  const sessionId = (await getKeydropCookies())?.session_id
  const steamId = await getSteamId()

  if (!sessionId || !steamId) {
    dispatch({ type: 'setAppData', value: INIT_APP_DATA })
    return
  }

  dispatch({ type: 'setAppData', value: { sessionId, steamId } })
  return
}

export const setUserProfile = async (dispatch: Dispatch, steamId: string): Promise<void> => {
  if (!steamId) {
    dispatch({ type: 'setAppData', value: INIT_APP_DATA })
    return
  }

  const userProfile = await ProfileClient.getUserProfile({ steamId })

  dispatch({ type: 'setUserProfile', value: userProfile })
  return
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setStorage = async (dispatch: Dispatch): Promise<void> => {
  return
  // return await getAppStorage()
  //   .then((appStorage) => {
  //     if (appStorage) {
  //       dispatch({ type: 'syncStorage', value: appStorage })
  //       dispatch({ type: 'setActiveView', value: appStorage.default_view })
  //       return true
  //     } else {
  //       saveAppStorage(DEFAULT_APP_STORAGE).catch(() => consoleLog('saving default storage failed'))
  //       dispatch({ type: 'syncStorage', value: DEFAULT_APP_STORAGE })
  //       return true
  //     }
  //   })
  //   .catch(() => {
  //     saveAppStorage(DEFAULT_APP_STORAGE).catch(() => consoleLog('saving default storage failed'))
  //     dispatch({ type: 'syncStorage', value: DEFAULT_APP_STORAGE })
  //     return true
  //   })
}
