import { assign } from '@xstate/immer'
import { createMachine } from 'xstate'

import {
  INIT_APP_DATA,
  INIT_COUNTER_ANIMATIONS,
  INIT_USER_BALANCE,
  INIT_USER_DATA,
  INIT_USER_PROFILE,
} from '@/constants/app'
import { KEYDROP_URLS } from '@/constants/urls'
import { changeLang } from '@/i18n'
import CommonClient from '@/services/browser/CommonClient'
import KeydropClient from '@/services/browser/KeydropClient'
import SteamClient from '@/services/browser/SteamClient'
import BalanceClient from '@/services/http/BalanceClient'
import ProfileClient from '@/services/http/ProfileClient'
import { BalanceResponse } from '@/types/API/http/balance'
import { InitUserDataResponse, ProfilePageResponse } from '@/types/API/http/profile'
import { ActiveView, AppData, CountersAnimations } from '@/types/app'

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
  | { type: 'HARD_USER_REFRESH' }

export interface AppMachineContext {
  appData: AppData
  activeView: ActiveView
  userProfile: ProfilePageResponse
  initUserData: InitUserDataResponse
  userBalance: BalanceResponse
  countersAnimations: CountersAnimations
  userBalanceValue: null | number
}

export const INIT_APP_CONTEXT: AppMachineContext = {
  userProfile: INIT_USER_PROFILE,
  initUserData: INIT_USER_DATA,
  userBalance: INIT_USER_BALANCE,
  appData: INIT_APP_DATA,
  countersAnimations: INIT_COUNTER_ANIMATIONS,
  activeView: ActiveView.MAIN,
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
        initial: 'gettingAppData',
        states: {
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
                actions: ['assignInitUserData', 'assignBalanceValueFromInitData', 'assignLang'],
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
          HARD_USER_REFRESH: '#AppMachine.loggedIn.gettingInitUserData',
        },
        states: {
          idle: {
            on: {
              REFETCH_BALANCE: 'gettingUserBalance',
            },
          },
          gettingInitUserData: {
            invoke: {
              src: 'getInitUserData',
              onDone: {
                actions: ['assignInitUserData', 'assignBalanceValueFromInitData', 'assignLang'],
                target: 'gettingUserProfile',
              },
              onError: {
                target: 'userProfileError',
              },
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
      assignLang: async (_, e) => {
        const lang = e.data.lang.toLowerCase()
        await changeLang(e.data.lang.toLowerCase())
        localStorage.setItem('i18nextLng', lang)
      },
    },
    services: {
      authUser: async () => {
        await KeydropClient.removeSessionCookie()
        await CommonClient.openInNewTab(KEYDROP_URLS.main)
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
      getInitUserData: async () => {
        return await ProfileClient.getInitUserData()
      },
    },
  },
)
