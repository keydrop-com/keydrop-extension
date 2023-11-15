import { MyWinnerListParams } from '@/types/API/http/inventory'
import { getAbsoluteApiUrl, getApiUrl, URLWithParams } from '@/utils/API/http/helpers'

export const INVENTORY_API = {
  yourItemsData: (params: MyWinnerListParams) =>
    URLWithParams(getApiUrl('panel/profil/my_winner_list'), params),
  yourItemsMarketData: getAbsoluteApiUrl('market_info.php'),
  yourItemsEqValue: getApiUrl('panel/profil/eq_value'),
}
