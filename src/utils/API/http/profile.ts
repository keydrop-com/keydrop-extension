import { ProfilePageParams } from '@/types/API/http/profile'
import { getApiUrl } from '@/utils/API/http/helpers'

export const PROFILE_API = {
  profileData: (baseUrl: string, { steamId }: ProfilePageParams): string =>
    getApiUrl(baseUrl, `apiData/UserStats/index/${steamId}`),
  initData: (baseUrl: string) => getApiUrl(baseUrl, 'apiData/Init/index'),
}
