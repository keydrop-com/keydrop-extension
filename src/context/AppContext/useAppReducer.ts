import { Action, AppState } from '@/types/app'

export function userAppReducer(appState: AppState, action: Action): AppState {
  switch (action.type) {
    case 'setUser': {
      return { ...appState, userProfile: action.value }
    }
    case 'setAppData': {
      const loggedIn = Boolean(action.value.sessionId && action.value.steamId)
      return { ...appState, appData: action.value, loggedIn }
    }
    case 'setActiveView': {
      return { ...appState, activeView: action.value }
    }
    case 'syncStorage': {
      return { ...appState, appStorage: action.value }
    }
    case 'setIsAnyNotificationToRead': {
      return { ...appState, isAnyNotificationToRead: action.value }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}
