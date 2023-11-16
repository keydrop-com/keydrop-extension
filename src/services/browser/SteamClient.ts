import { STEAM_API_BASE_URL } from '@/constants/API/common'
import AbstractBrowserService from '@/services/browser/AbstractBrowserService'

class SteamClient extends AbstractBrowserService {
  static async getSteamId(): Promise<string | null> {
    return (
      (await super.getCookie(STEAM_API_BASE_URL, 'steamLoginSecure'))?.split('%7C%7C')[0] || null
    )
  }
}

export default SteamClient
