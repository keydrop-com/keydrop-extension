import AbstractHttpService from '@/services/http/AbstractHttpService'
import { BalanceParams, BalanceResponse } from '@/types/API/http/balance'
import { BALANCE_API } from '@/utils/API/http/balance'

class BalanceClient extends AbstractHttpService {
  static async getUserBalance(params: BalanceParams): Promise<BalanceResponse> {
    return super.fetchWithAuth(BALANCE_API.balance(params))
  }
}

export default BalanceClient
