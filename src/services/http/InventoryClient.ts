import AbstractHttpService from '@/services/http/AbstractHttpService'
import {
  CollectGameParams,
  CollectGameResponse,
  CollectSkinParams,
  CollectSkinResponse,
  EqValueResponse,
  ItemMarketDataResponse,
  MyWinnerListParams,
  MyWinnerListResponse,
  SellEqResponse,
  SellGameParams,
  SellGameResponse,
  SellItemParams,
  SellItemResponse,
} from '@/types/API/http/inventory'
import { INVENTORY_API } from '@/utils/API/http/inventory'

class InventoryClient extends AbstractHttpService {
  static async getUserItems(params: MyWinnerListParams): Promise<MyWinnerListResponse> {
    return super.fetchWithAuth(INVENTORY_API.yourItemsData(params))
  }

  static async getUserItemsMarketData(): Promise<ItemMarketDataResponse[]> {
    return super.fetchWithAuth(INVENTORY_API.yourItemsMarketData)
  }

  static async getUserItemsEqValue(): Promise<EqValueResponse> {
    return super.fetchWithAuth(INVENTORY_API.yourItemsEqValue)
  }

  static async sellSkin(params: SellItemParams): Promise<SellItemResponse> {
    return super.fetchWithAuth(INVENTORY_API.yourItemsSellSkin(params))
  }

  static async sellGame(params: SellGameParams): Promise<SellGameResponse> {
    return super.fetchWithAuth(INVENTORY_API.yourItemsSellGame(params))
  }

  static async collectSkin(params: CollectSkinParams): Promise<CollectSkinResponse> {
    return super.fetchWithAuth(INVENTORY_API.yourItemsCollectSkin(params))
  }

  static async collectGame(params: CollectGameParams): Promise<CollectGameResponse> {
    return super.fetchWithAuth(INVENTORY_API.yourItemsCollectGame, {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  static async sellEq(): Promise<SellEqResponse> {
    return super.fetchWithAuth(INVENTORY_API.yourItemsSellEq)
  }
}

export default InventoryClient
