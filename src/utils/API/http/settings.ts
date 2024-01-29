import { getApiUrl } from '@/utils/API/http/helpers'

export const SETTINGS_API = {
  changeLangAndCurrency: (baseUrl: string) =>
    getApiUrl(baseUrl, 'apiData/Settings/changeLangAndCurrency'), // POST
}
