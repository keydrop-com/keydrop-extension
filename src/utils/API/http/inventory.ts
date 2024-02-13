import {
  CollectSkinParams,
  MyWinnerListParams,
  SellGameParams,
  SellItemParams,
} from '@/types/API/http/inventory'
import { getAbsoluteApiUrl, getApiUrl, URLWithParams } from '@/utils/API/http/helpers'

export const INVENTORY_API = {
  yourItemsData: (baseUrl: string, params: MyWinnerListParams) =>
    URLWithParams(baseUrl, getApiUrl(baseUrl, 'panel/profil/my_winner_list'), params),
  yourItemsMarketData: (baseUrl: string) => getAbsoluteApiUrl(baseUrl, 'market_info.php'),
  yourItemsEqValue: (baseUrl: string) => getApiUrl(baseUrl, 'panel/profil/eq_value'),
  yourItemsSellSkin: (baseUrl: string, params: SellItemParams) =>
    getApiUrl(baseUrl, `skins/Control/sell/${encodeURIComponent(params.id)}`),
  yourItemsSellGame: (baseUrl: string, params: SellGameParams) =>
    getApiUrl(baseUrl, `game/Winner/sell/${encodeURIComponent(params.id)}`),
  yourItemsCollectSkin: (baseUrl: string, params: CollectSkinParams) =>
    getApiUrl(baseUrl, `skins/Control/withdraw/${encodeURIComponent(params.id)}`),
  yourItemsCollectGame: (baseUrl: string) => getApiUrl(baseUrl, 'game/winner'), // POST
  yourItemsSellEq: (baseUrl: string) => getApiUrl(baseUrl, 'skins/Control/sell_eq'),
}
