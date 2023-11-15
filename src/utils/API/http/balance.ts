import { BalanceParams } from '@/types/API/http/balance'
import { getApiUrl, URLWithParams } from '@/utils/API/http/helpers'

export const BALANCE_API = {
  balance: (params: BalanceParams): string => URLWithParams(getApiUrl('balance'), params),
}
