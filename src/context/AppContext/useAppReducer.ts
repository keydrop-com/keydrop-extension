import { Action, AppState } from '@/types/app'

export function userAppReducer(appState: AppState, action: Action): AppState {
  switch (action.type) {
    case 'setAppData': {
      const appData = action.value
      const { steamId, sessionId } = appData
      const loggedIn = Boolean(sessionId && steamId)

      return { ...appState, appData, loggedIn, isLoading: loggedIn }
    }
    case 'setUserProfile': {
      const userProfile = action.value

      return { ...appState, userProfile, isLoading: false }
    }
    case 'setActiveView': {
      return { ...appState, activeView: action.value }
    }
    case 'syncStorage': {
      return { ...appState, appStorage: action.value }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}
