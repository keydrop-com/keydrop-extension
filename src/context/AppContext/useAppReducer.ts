import { AppAction, AppState } from '@/types/app'

export function userAppReducer(appState: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_APP_DATA': {
      const appData = action.value
      const { steamId, sessionId } = appData
      const loggedIn = Boolean(sessionId && steamId)

      return { ...appState, appData, loggedIn, isLoading: loggedIn }
    }
    case 'SET_USER_PROFILE': {
      const userProfile = action.value

      return { ...appState, userProfile, isLoading: false }
    }
    case 'SET_ACTIVE_VIEW': {
      return {
        ...appState,
        activeView: action.value,
        countersAnimations: { ...appState.countersAnimations, [action.value]: false },
      }
    }
    case 'SYNC_STORAGE': {
      return { ...appState, appStorage: action.value }
    }
    case 'SET_USER_BALANCE': {
      return { ...appState, userBalance: action.value }
    }
    case 'SET_COUNTER_ANIMATIONS': {
      return {
        ...appState,
        countersAnimations: { ...appState.countersAnimations, [action.value]: false },
      }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}
