import { KEYDROP_COOKIES } from '@/constants/cookies'
import AbstractBrowserService from '@/services/browser/AbstractBrowserService'

class KeydropClient extends AbstractBrowserService {
  static async getSessionId(baseUrl: string): Promise<string | null> {
    return super.getCookie(baseUrl, KEYDROP_COOKIES.session)
  }

  static async removeSessionCookie(baseUrl: string): Promise<void> {
    return super.removeCookie(baseUrl, KEYDROP_COOKIES.session)
  }

  static async setLangCookie(baseUrl: string, value: string): Promise<void> {
    const now = new Date()
    const time = now.getTime()
    const expireTime = time + 3600 * 24

    await super.setCookie(baseUrl, KEYDROP_COOKIES.lang, value.toUpperCase(), expireTime)
    await super.setCookie(baseUrl, KEYDROP_COOKIES.keyLang, value.toUpperCase(), expireTime)

    return Promise.resolve()
  }
}

export default KeydropClient
