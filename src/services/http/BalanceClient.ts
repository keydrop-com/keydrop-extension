import AbstractHttpService from '@/services/http/AbstractHttpService'
import { BalanceParams, BalanceResponse } from '@/types/API/http/balance'
import { BALANCE_API } from '@/utils/API/http/balance'

class BalanceClient extends AbstractHttpService {
  static async getUserBalance(baseUrl: string, params: BalanceParams): Promise<BalanceResponse> {
    return super.fetchWithAuth(baseUrl, BALANCE_API.balance(baseUrl, params), {}, true, true)
  }
}

export default BalanceClient
