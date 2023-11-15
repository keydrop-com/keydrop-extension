import AbstractHttpService from '@/services/http/AbstractHttpService'
import {
  EqValueResponse,
  ItemMarketDataResponse,
  MyWinnerListParams,
  MyWinnerListResponse,
} from '@/types/API/http/inventory'
import { INVENTORY_API } from '@/utils/API/http/inventory'

class InventoryClient extends AbstractHttpService {
  static async getUserItems(params: MyWinnerListParams): Promise<MyWinnerListResponse> {
    return super.fetchWithAuth(INVENTORY_API.yourItemsData(params))
  }

  static async getUserItemsMarketData(): Promise<ItemMarketDataResponse> {
    return super.fetchWithAuth(INVENTORY_API.yourItemsMarketData)
  }

  static async getUserItemsEqValue(): Promise<EqValueResponse> {
    return super.fetchWithAuth(INVENTORY_API.yourItemsEqValue)
  }
}

export default InventoryClient
