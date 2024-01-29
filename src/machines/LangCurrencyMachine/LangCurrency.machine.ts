import { assign } from '@xstate/immer'
import { createMachine } from 'xstate'

import { INIT_LANG_CURRENCY_CONTEXT } from '@/machines/LangCurrencyMachine/LangCurrency.constants'
import {
  LangCurrencyMachineContext,
  LangCurrencyMachineEvent,
  LangCurrencyMachineServices,
} from '@/machines/LangCurrencyMachine/LangCurrency.types'

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
          onError: 'fail',
        },
      },
      fail: {
        invoke: {
          src: 'failToast',
          onDone: 'idle',
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
    },
  },
)
