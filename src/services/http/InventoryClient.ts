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
  static async getUserItems(
    baseUrl: string,
    params: MyWinnerListParams,
  ): Promise<MyWinnerListResponse> {
    return super.fetchWithAuth(baseUrl, INVENTORY_API.yourItemsData(baseUrl, params))
  }

  static async getUserItemsMarketData(baseUrl: string): Promise<ItemMarketDataResponse[]> {
    return super.fetchWithAuth(baseUrl, INVENTORY_API.yourItemsMarketData(baseUrl))
  }

  static async getUserItemsEqValue(baseUrl: string): Promise<EqValueResponse> {
    return super.fetchWithAuth(baseUrl, INVENTORY_API.yourItemsEqValue(baseUrl))
  }

  static async sellSkin(baseUrl: string, params: SellItemParams): Promise<SellItemResponse> {
    return super.fetchWithAuth(baseUrl, INVENTORY_API.yourItemsSellSkin(baseUrl, params))
  }

  static async sellGame(baseUrl: string, params: SellGameParams): Promise<SellGameResponse> {
    return super.fetchWithAuth(baseUrl, INVENTORY_API.yourItemsSellGame(baseUrl, params))
  }

  static async collectSkin(
    baseUrl: string,
    params: CollectSkinParams,
  ): Promise<CollectSkinResponse> {
    return super.fetchWithAuth(baseUrl, INVENTORY_API.yourItemsCollectSkin(baseUrl, params))
  }

  static async collectGame(
    baseUrl: string,
    params: CollectGameParams,
  ): Promise<CollectGameResponse> {
    return super.fetchWithAuth(baseUrl, INVENTORY_API.yourItemsCollectGame(baseUrl), {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  static async sellEq(baseUrl: string): Promise<SellEqResponse> {
    return super.fetchWithAuth(baseUrl, INVENTORY_API.yourItemsSellEq(baseUrl))
  }
}

export default InventoryClient
