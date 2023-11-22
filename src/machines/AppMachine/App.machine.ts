import { assign } from '@xstate/immer'
import { createMachine } from 'xstate'

import {
  INIT_APP_DATA,
  INIT_APP_STORAGE,
  INIT_COUNTER_ANIMATIONS,
  INIT_USER_BALANCE,
  INIT_USER_DATA,
  INIT_USER_PROFILE,
} from '@/constants/app'
import { KEYDROP } from '@/constants/urls'
import { changeLang } from '@/i18n'
import CommonClient from '@/services/browser/CommonClient'
import KeydropClient from '@/services/browser/KeydropClient'
import SteamClient from '@/services/browser/SteamClient'
import BalanceClient from '@/services/http/BalanceClient'
import ProfileClient from '@/services/http/ProfileClient'
import { BalanceResponse } from '@/types/API/http/balance'
import { InitUserDataResponse, ProfilePageResponse } from '@/types/API/http/profile'
import { ActiveView, AppData, AppStorage, CountersAnimations } from '@/types/app'

export type AppMachineServices = {
  getAppData: {
    data: AppData
  }
  getUserProfile: {
    data: ProfilePageResponse
  }
  getUserBalance: {
    data: BalanceResponse
  }
  authUser: {
    data: void
  }
  getAppStorage: {
    data: AppStorage
  }
  getInitUserData: {
    data: InitUserDataResponse
  }
  userProfileErrorToast: {
    data: void
  }
}

export type AppMachineEvent =
  | { type: 'ACTIVE_VIEW_CHANGE'; value: ActiveView }
  | { type: 'LOGIN' }
  | { type: 'REFETCH_BALANCE' }

export interface AppMachineContext {
  appData: AppData
  activeView: ActiveView
  userProfile: ProfilePageResponse
  initUserData: InitUserDataResponse
  userBalance: BalanceResponse
  countersAnimations: CountersAnimations
  appStorage: AppStorage
  userBalanceValue: null | number
}

export const INIT_APP_CONTEXT: AppMachineContext = {
  userProfile: INIT_USER_PROFILE,
  initUserData: INIT_USER_DATA,
  userBalance: INIT_USER_BALANCE,
  appData: INIT_APP_DATA,
  countersAnimations: INIT_COUNTER_ANIMATIONS,
  activeView: ActiveView.MAIN,
  appStorage: INIT_APP_STORAGE,
  userBalanceValue: null,
}

export const AppMachine = createMachine(
  {
    id: 'AppMachine',
    predictableActionArguments: true,
    tsTypes: {} as import('./App.machine.typegen').Typegen0,
    schema: {
      context: {} as AppMachineContext,
      events: {} as AppMachineEvent,
      services: {} as AppMachineServices,
    },
    context: INIT_APP_CONTEXT,
    initial: 'gettingData',
    states: {
      gettingData: {
        initial: 'gettingAppStorage',
        states: {
          gettingAppStorage: {
            invoke: {
              src: 'getAppStorage',
              onDone: {
                actions: 'assignAppStorage',
                target: 'gettingAppData',
              },
            },
          },
          gettingAppData: {
            invoke: {
              src: 'getAppData',
              onDone: {
                actions: 'assignAppData',
                target: 'gettingInitUserData',
              },
              onError: {
                target: '#AppMachine.loggedOut',
              },
            },
          },
          gettingInitUserData: {
            invoke: {
              src: 'getInitUserData',
              onDone: {
                actions: [
                  'assignInitUserData',
                  'assignBalanceValueFromInitData',
                  'assignLangFromWebsite',
                ],
                target: '#AppMachine.loggedIn',
              },
              onError: {
                target: '#AppMachine.loggedOut',
              },
            },
          },
        },
      },
      loggedOut: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              LOGIN: 'auth',
            },
          },
          auth: {
            invoke: {
              src: 'authUser',
            },
          },
        },
      },
      loggedIn: {
        initial: 'gettingUserProfile',
        on: {
          ACTIVE_VIEW_CHANGE: {
            actions: ['assignActiveView', 'assignCountersAnimations'],
          },
        },
        states: {
          idle: {
            on: {
              REFETCH_BALANCE: 'gettingUserBalance',
            },
          },
          gettingUserProfile: {
            invoke: {
              src: 'getUserProfile',
              onDone: {
                actions: 'assignUserProfile',
                target: 'idle',
              },
              onError: 'userProfileError',
            },
          },
          userProfileError: {
            invoke: {
              src: 'userProfileErrorToast',
              onDone: 'idle',
            },
          },
          gettingUserBalance: {
            invoke: {
              src: 'getUserBalance',
              onDone: {
                actions: ['assignUserBalance', 'assignBalanceValueBalanceData'],
                target: 'idle',
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      assignBalanceValueFromInitData: assign((ctx, e) => {
        ctx.userBalanceValue = e.data.balance
      }),
      assignBalanceValueBalanceData: assign((ctx, e) => {
        ctx.userBalanceValue = e.data.pkt
      }),
      assignInitUserData: assign((ctx, e) => {
        ctx.initUserData = e.data
      }),
      assignAppStorage: assign((ctx, e) => {
        ctx.appStorage = e.data
      }),
      assignAppData: assign((ctx, e) => {
        ctx.appData = e.data
      }),
      assignUserProfile: assign((ctx, e) => {
        ctx.userProfile = e.data
      }),
      assignActiveView: assign((ctx, e) => {
        ctx.activeView = e.value
      }),
      assignCountersAnimations: assign((ctx, e) => {
        ctx.countersAnimations = { ...ctx.countersAnimations, [e.value]: false }
      }),
      assignUserBalance: assign((ctx, e) => {
        ctx.userBalance = e.data
      }),
      assignLangFromWebsite: async (_, e) => {
        const lang = e.data.lang.toLowerCase()
        await changeLang(lang)
        window.localStorage.setItem('i18nextLng', lang)
      },
    },
    services: {
      authUser: async () => {
        await KeydropClient.removeSessionCookie()
        await CommonClient.openInNewTab(KEYDROP.main)
      },
      getAppData: async () => {
        const sessionId = await KeydropClient.getSessionId()
        const steamId = await SteamClient.getSteamId()

        if (!sessionId || !steamId) {
          throw new Error('No session id or steam id')
        } else {
          return { sessionId, steamId }
        }
      },
      getUserProfile: async ({ appData: { steamId } }) => {
        return await ProfileClient.getUserProfile({ steamId })
      },
      getUserBalance: async () => {
        return await BalanceClient.getUserBalance({ skinsValue: false })
      },
      getAppStorage: async () => {
        const storage = await CommonClient.getFromStorage<AppStorage>('storage')

        if (storage.version === INIT_APP_STORAGE.version) {
          return storage
        } else {
          await CommonClient.setInStorage(INIT_APP_STORAGE)
        }

        return INIT_APP_STORAGE
      },
      getInitUserData: async () => {
        return await ProfileClient.getInitUserData()
      },
    },
  },
)
