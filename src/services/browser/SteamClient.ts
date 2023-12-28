import { STEAM_BASE_URL } from '@/constants/urls'
import AbstractBrowserService from '@/services/browser/AbstractBrowserService'

class SteamClient extends AbstractBrowserService {
  static async getSteamId(): Promise<string | null> {
    return (await super.getCookie(STEAM_BASE_URL, 'steamLoginSecure'))?.split('%7C%7C')[0] || null
  }
}

export default SteamClient
