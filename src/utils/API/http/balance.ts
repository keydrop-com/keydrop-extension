import { BalanceParams } from '@/types/API/http/balance'
import { getApiUrl, URLWithParams } from '@/utils/API/http/helpers'

export const BALANCE_API = {
  balance: (baseUrl: string, params: BalanceParams): string =>
    URLWithParams(baseUrl, getApiUrl(baseUrl, 'balance'), params),
}
