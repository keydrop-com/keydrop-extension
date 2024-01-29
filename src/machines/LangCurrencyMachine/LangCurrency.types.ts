import { InitUserDataResponse } from '@/types/API/http/profile'

export type LangCurrencyMachineContext = {
  langList: InitUserDataResponse['langList']
  currencyList: InitUserDataResponse['currencyList']
  language: InitUserDataResponse['lang']
  currency: InitUserDataResponse['currency']
  draft: {
    language: InitUserDataResponse['lang']
    currency: InitUserDataResponse['currency']
  }
}

export type LangCurrencyMachineEvent =
  | { type: 'CHANGE_LANGUAGE'; value: string }
  | { type: 'CHANGE_CURRENCY'; value: string }
  | { type: 'SAVE' }
  | { type: 'CANCEL' }

export type LangCurrencyMachineServices = {
  saveData: {
    data: void
  }
  failToast: {
    data: void
  }
}
