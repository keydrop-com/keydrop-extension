import { INIT_APP_DATA } from '@/constants/app'
import { getKeydropCookies, getSteamId } from '@/services/browser/cookies'
import ProfileClient from '@/services/http/ProfileClient'
import { AppState, Dispatch } from '@/types/app'

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
  if (!steamId) return

  const userProfile = await ProfileClient.getUserProfile({ steamId })

  if (!userProfile) {
    dispatch({ type: 'setAppData', value: INIT_APP_DATA })
    return
  }

  dispatch({ type: 'setUser', value: userProfile })
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setIsAnyNotificationToRead = async (
  dispatch: Dispatch,
  appState: AppState,
): Promise<void> => {
  const sessionId = appState.appData.sessionId

  if (!sessionId) return
  // return await getNotifications(
  //   API.getMyNotifications({
  //     pageSize: 1,
  //     pageNumber: 0,
  //     userId: state.userProfile.id,
  //   }),
  //   state.appData.token,
  // ).then((notification) => {
  //   if (notification) {
  //     const value = !notification.items[0].isAcknowledged
  //     dispatch({ type: 'setIsAnyNotificationToRead', value })
  //   }
  // })
}
