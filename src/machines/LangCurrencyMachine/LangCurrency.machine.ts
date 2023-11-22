import { assign } from '@xstate/immer'
import { createMachine } from 'xstate'

import KeydropClient from '@/services/browser/KeydropClient'
import SettingsClient from '@/services/http/SettingsClient'
import { InitUserDataResponse } from '@/types/API/http/profile'

type LangCurrencyMachineContext = {
  langList: InitUserDataResponse['langList']
  currencyList: InitUserDataResponse['currencyList']
  language: InitUserDataResponse['lang']
  currency: InitUserDataResponse['currency']
  draft: {
    language: InitUserDataResponse['lang']
    currency: InitUserDataResponse['currency']
  }
}

type LangCurrencyMachineEvent =
  | { type: 'CHANGE_LANGUAGE'; value: string }
  | { type: 'CHANGE_CURRENCY'; value: string }
  | { type: 'SAVE' }
  | { type: 'CANCEL' }

type LangCurrencyMachineServices = {
  saveData: {
    data: void
  }
}

const INIT_LANG_CURRENCY_CONTEXT: LangCurrencyMachineContext = {
  langList: {},
  draft: {
    language: 'en',
    currency: 'usd',
  },
  currency: 'usd',
  currencyList: [],
  language: 'en',
}

export const LangCurrencyMachine = createMachine(
  {
    id: 'LangCurrencyMachine',
    predictableActionArguments: true,
    tsTypes: {} as import('./LangCurrency.machine.typegen').Typegen0,
    schema: {
      context: {} as LangCurrencyMachineContext,
      events: {} as LangCurrencyMachineEvent,
      services: {} as LangCurrencyMachineServices,
    },
    context: INIT_LANG_CURRENCY_CONTEXT,
    initial: 'idle',
    states: {
      idle: {
        on: {
          CHANGE_LANGUAGE: {
            cond: 'isTouchedLang',
            actions: ['assignDraftLang'],
            target: '.touched',
          },
          CHANGE_CURRENCY: {
            cond: 'isTouchedCurrency',
            actions: ['assignDraftCurrency'],
            target: '.touched',
          },
          CANCEL: {
            actions: ['assignCancel'],
          },
          SAVE: 'saving',
        },
        initial: 'untouched',
        states: {
          untouched: {
            tags: ['untouched'],
          },
          touched: {
            tags: ['touched'],
          },
        },
      },
      saving: {
        invoke: {
          src: 'saveData',
          onDone: {
            actions: ['assignSavedData'],
            target: 'idle',
          },
        },
      },
    },
  },
  {
    guards: {
      isTouchedLang: (ctx, e) => ctx.draft.language !== e.value,
      isTouchedCurrency: (ctx, e) => ctx.draft.currency !== e.value,
    },
    actions: {
      assignDraftLang: assign(({ draft }, e) => void (draft.language = e.value)),
      assignDraftCurrency: assign(({ draft }, e) => void (draft.currency = e.value)),
      assignCancel: assign((ctx) => {
        ctx.draft.language = ctx.language
        ctx.draft.currency = ctx.currency
      }),
      assignSavedData: async (ctx) => {
        const lang = ctx.draft.language
        localStorage.setItem('i18nextLng', lang)
        await KeydropClient.setLangCookie(lang)
        location.reload()
      },
    },
    services: {
      saveData: async ({ draft }) => {
        return await SettingsClient.setLangCurrency({
          lang: draft.language.toUpperCase(),
          currency: draft.currency.toUpperCase(),
        })
      },
    },
  },
)
