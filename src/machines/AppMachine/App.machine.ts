import { assign } from '@xstate/immer'
import { createMachine } from 'xstate'

import { INIT_APP_CONTEXT } from '@/constants/app'
import { KEYDROP } from '@/constants/urls'
import {
  getKeydropCookies,
  getSteamId,
  removeKeydropSessionCookie,
} from '@/services/browser/cookies'
import { openInNewTab } from '@/services/browser/tabs'
import ProfileClient from '@/services/http/ProfileClient'
import { ProfilePageResponse } from '@/types/API/http/profile'
import { ActiveView, AppData, AppMachineContext } from '@/types/app'

export type AppMachineServices = {
  getAppData: {
    data: AppData
  }
  getUserProfile: {
    data: ProfilePageResponse
  }
  authUser: {
    data: void
  }
}

export type AppMachineEvent = { type: 'ACTIVE_VIEW_CHANGE'; value: ActiveView } | { type: 'LOGIN' }

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
                target: 'gettingUserProfile',
              },
              onError: {
                target: '#AppMachine.loggedOut',
              },
            },
          },
          gettingUserProfile: {
            invoke: {
              src: 'getUserProfile',
              onDone: {
                target: '#AppMachine.loggedIn',
                actions: 'assignUserProfile',
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
        on: {
          ACTIVE_VIEW_CHANGE: {
            actions: ['assignActiveView', 'assignCountersAnimations'],
          },
        },
      },
    },
  },
  {
    actions: {
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
    },
    services: {
      authUser: async () => {
        await removeKeydropSessionCookie()
        await openInNewTab(KEYDROP.main)
      },
      getAppData: () => {
        return new Promise(async (resolve, reject) => {
          const sessionId = (await getKeydropCookies())?.session_id
          const steamId = await getSteamId()

          if (!sessionId || !steamId) reject()

          resolve({ sessionId, steamId })
        })
      },
      getUserProfile: async ({ appData: { steamId } }) => {
        return await ProfileClient.getUserProfile({ steamId })
      },
    },
  },
)
