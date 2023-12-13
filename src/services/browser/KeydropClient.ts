import { KEYDROP } from '@/constants/urls'
import AbstractBrowserService from '@/services/browser/AbstractBrowserService'
import { NormalizedCookies } from '@/types/API/browser/cookies'

class KeydropClient extends AbstractBrowserService {
  static async getAllCookies(): Promise<NormalizedCookies | null> {
    return super.getCookies(KEYDROP.main)
  }

  static async getSessionId(): Promise<string | null> {
    return super.getCookie(KEYDROP.main, 'session_id')
  }

  static async removeSessionCookie(): Promise<void> {
    return super.removeCookie(KEYDROP.main, 'session_id')
  }

  static async setLangCookie(value: string): Promise<void> {
    const now = new Date()
    const time = now.getTime()
    const expireTime = time + 3600 * 24
    await super.setCookie(KEYDROP.main, 'lang', value.toUpperCase(), expireTime)
    await super.setCookie(KEYDROP.main, 'key-lang', value.toUpperCase(), expireTime)
    return Promise.resolve()
  }
}

export default KeydropClient
