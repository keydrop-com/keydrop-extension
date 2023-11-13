import { BalanceParams, ProfilePageParams } from '@/types/API/http/profile'
import { getApiUrl, URLWithParams } from '@/utils/API/http/helpers'

export const PROFILE_API = {
  profileData: ({ steamId }: ProfilePageParams): string =>
    getApiUrl(`apiData/UserStats/index/${steamId}`),
  balance: (params: BalanceParams): string => URLWithParams(getApiUrl('balance'), params),
}
