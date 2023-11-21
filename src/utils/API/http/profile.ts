import { ProfilePageParams } from '@/types/API/http/profile'
import { getApiUrl } from '@/utils/API/http/helpers'

export const PROFILE_API = {
  profileData: ({ steamId }: ProfilePageParams): string =>
    getApiUrl(`apiData/UserStats/index/${steamId}`),
  initData: getApiUrl('apiData/Init/index'),
}
