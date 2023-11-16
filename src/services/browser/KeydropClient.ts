import { KEYDROP } from '@/constants/urls'
import AbstractBrowserService from '@/services/browser/AbstractBrowserService'
import { NormalizedCookies } from '@/types/API/browser/cookies'

class KeydropClient extends AbstractBrowserService {
  static async getAllCookies(): Promise<NormalizedCookies> {
    return super.getCookies(KEYDROP.main)
  }

  static async getSessionId(): Promise<string | null> {
    return super.getCookie(KEYDROP.main, 'session_id')
  }

  static async removeSessionCookie(): Promise<void> {
    return super.removeCookie(KEYDROP.main, 'session_id')
  }
}

export default KeydropClient
