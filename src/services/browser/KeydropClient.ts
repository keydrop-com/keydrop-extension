import { KEYDROP_COOKIES } from '@/constants/cookies'
import { KEYDROP_URLS } from '@/constants/urls'
import AbstractBrowserService from '@/services/browser/AbstractBrowserService'

class KeydropClient extends AbstractBrowserService {
  static async getSessionId(): Promise<string | null> {
    return super.getCookie(KEYDROP_URLS.main, KEYDROP_COOKIES.session)
  }

  static async removeSessionCookie(): Promise<void> {
    return super.removeCookie(KEYDROP_URLS.main, KEYDROP_COOKIES.session)
  }

  static async setLangCookie(value: string): Promise<void> {
    const now = new Date()
    const time = now.getTime()
    const expireTime = time + 3600 * 24

    await super.setCookie(KEYDROP_URLS.main, KEYDROP_COOKIES.lang, value.toUpperCase(), expireTime)
    await super.setCookie(
      KEYDROP_URLS.main,
      KEYDROP_COOKIES.keyLang,
      value.toUpperCase(),
      expireTime,
    )

    return Promise.resolve()
  }
}

export default KeydropClient
