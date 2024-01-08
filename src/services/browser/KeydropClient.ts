import { KEYDROP_COOKIES } from '@/constants/cookies'
import { KEYDROP_URLS } from '@/constants/urls'
import AbstractBrowserService from '@/services/browser/AbstractBrowserService'

class KeydropClient extends AbstractBrowserService {
  static async getSessionId(): Promise<string | null> {
    return super.getCookie(KEYDROP_URLS.cookies, KEYDROP_COOKIES.session)
  }

  static async removeSessionCookie(): Promise<void> {
    for (const url of [KEYDROP_URLS.cookies, KEYDROP_URLS.main]) {
      await super.removeCookie(url, KEYDROP_COOKIES.session)
    }

    return Promise.resolve()
  }

  static async setLangCookie(value: string): Promise<void> {
    const now = new Date()
    const time = now.getTime()
    const expireTime = time + 3600 * 24

    for (const url of [KEYDROP_URLS.cookies, KEYDROP_URLS.main]) {
      await super.setCookie(url, KEYDROP_COOKIES.lang, value.toUpperCase(), expireTime)
      await super.setCookie(url, KEYDROP_COOKIES.keyLang, value.toUpperCase(), expireTime)
    }

    return Promise.resolve()
  }
}

export default KeydropClient
