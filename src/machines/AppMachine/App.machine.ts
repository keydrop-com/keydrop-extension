import { assign } from '@xstate/immer'
import { createMachine } from 'xstate'

import { changeLang } from '@/i18n'
import { INIT_APP_CONTEXT } from '@/machines/AppMachine/App.constants'
import {
  AppMachineContext,
  AppMachineEvent,
  AppMachineServices,
} from '@/machines/AppMachine/App.types'
import CommonClient from '@/services/browser/CommonClient'
import KeydropClient from '@/services/browser/KeydropClient'
import SteamClient from '@/services/browser/SteamClient'
import BalanceClient from '@/services/http/BalanceClient'
import MirrorClient from '@/services/http/MirrorClient'
import ProfileClient from '@/services/http/ProfileClient'

const APP_BASE_URL = process.env.REACT_APP_BASE_URL

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
        initial: 'gettingMirrorUrl',
        states: {
          gettingMirrorUrl: {
            invoke: {
              src: 'getMirrorUrl',
              onDone: {
                actions: 'assignMirrorUrl',
                target: 'gettingAppData',
              },
              onError: {
                target: '#AppMachine.loggedOut',
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
      assignMirrorUrl: assign((ctx, e) => {
        ctx.mirrorUrl = e.data
      }),
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
      getMirrorUrl: async () => {
        if (APP_BASE_URL) return APP_BASE_URL
        return await MirrorClient.getMirrorUrl()
      },
      authUser: async (ctx) => {
        await KeydropClient.removeSessionCookie(ctx.mirrorUrl)
        await CommonClient.openInNewTab(ctx.mirrorUrl)
      },
      getAppData: async (ctx) => {
        const sessionId = await KeydropClient.getSessionId(ctx.mirrorUrl)
        const steamId = await SteamClient.getSteamId()

        if (!sessionId || !steamId) {
          throw new Error('No session id or steam id')
        } else {
          return { sessionId, steamId }
        }
      },
      getUserProfile: async ({ mirrorUrl, appData: { steamId } }) => {
        return await ProfileClient.getUserProfile(mirrorUrl, { steamId })
      },
      getUserBalance: async (ctx) => {
        return await BalanceClient.getUserBalance(ctx.mirrorUrl, { skinsValue: false })
      },
      getInitUserData: async (ctx) => {
        return await ProfileClient.getInitUserData(ctx.mirrorUrl)
      },
    },
  },
)
