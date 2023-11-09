import { AppState, Dispatch } from '@/types/app'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setAppData = async (dispatch: Dispatch): Promise<void> => {
  return
  // const cookies = await getCookies(PUBLIC_URL)
  // if (cookies) {
  //   const normalizedCookies = normalizeCookies(cookies.filter(filterCredentialsCookies))
  //   return await checkTokenExpiryServer(
  //     normalizedCookies.token,
  //     normalizedCookies.tokenExp,
  //     normalizedCookies.refreshToken,
  //     normalizedCookies.deviceId,
  //   )
  //     .then((appData) => {
  //       if (appData) {
  //         dispatch({
  //           type: 'setAppData',
  //           value: {
  //             deviceId: normalizedCookies.deviceId,
  //             refreshToken: appData.refreshToken,
  //             token: appData.token,
  //             tokenExp: appData.tokenExp,
  //           },
  //         })
  //       } else {
  //         dispatch({ type: 'setAppData', value: INIT_APP_DATA })
  //       }
  //     })
  //     .catch(() => dispatch({ type: 'setAppData', value: INIT_APP_DATA }))
  // }
  // return dispatch({ type: 'setAppData', value: INIT_APP_DATA })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setUserProfile = async (dispatch: Dispatch, appState: AppState): Promise<void> => {
  return
  // return await getAuthUser(state.appData.token).then(async ({ success, userProfile }) => {
  //   if (success && userProfile) {
  //     dispatch({ type: 'setUser', value: userProfile })
  //   } else {
  //     dispatch({ type: 'setAppData', value: INIT_APP_DATA })
  //   }
  // })
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
  const token = appState.appData.token
  if (!token) return
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
