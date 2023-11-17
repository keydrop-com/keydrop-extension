import {
  CollectSkinParams,
  MyWinnerListParams,
  SellGameParams,
  SellItemParams,
} from '@/types/API/http/inventory'
import { getAbsoluteApiUrl, getApiUrl, URLWithParams } from '@/utils/API/http/helpers'

export const INVENTORY_API = {
  yourItemsData: (params: MyWinnerListParams) =>
    URLWithParams(getApiUrl('panel/profil/my_winner_list'), params),
  yourItemsMarketData: getAbsoluteApiUrl('market_info.php'),
  yourItemsEqValue: getApiUrl('panel/profil/eq_value'),
  yourItemsSellSkin: (params: SellItemParams) =>
    getApiUrl(`skins/Control/sell/${encodeURIComponent(params.id)}`),
  yourItemsSellGame: (params: SellGameParams) =>
    getApiUrl(`game/Winner/sell/${encodeURIComponent(params.id)}`),
  yourItemsCollectSkin: (params: CollectSkinParams) =>
    getApiUrl(`skins/Control/withdraw/${encodeURIComponent(params.id)}`),
  yourItemsCollectGame: getApiUrl('game/winner'), // POST
  yourItemsSellEq: getApiUrl('skins/Control/sell_eq'),
}
