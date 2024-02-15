import { LangCurrencyMachineContext } from '@/machines/LangCurrencyMachine/LangCurrency.types'

export const INIT_LANG_CURRENCY_CONTEXT: LangCurrencyMachineContext = {
  langList: {},
  draft: {
    language: 'en',
    currency: 'usd',
  },
  currency: 'usd',
  currencyList: [],
  language: 'en',
}
