import { KEYDROP } from '@/constants/urls'
import AbstractBrowserService from '@/services/browser/AbstractBrowserService'

class KeydropClient extends AbstractBrowserService {
  static async getSessionId(): Promise<string | null> {
    return super.getCookie(KEYDROP.cookies, 'session_id')
  }

  static async removeSessionCookie(): Promise<void> {
    return super.removeCookie(KEYDROP.cookies, 'session_id')
  }

  static async setLangCookie(value: string): Promise<void> {
    const now = new Date()
    const time = now.getTime()
    const expireTime = time + 3600 * 24
    await super.setCookie(KEYDROP.cookies, 'lang', value.toUpperCase(), expireTime)
    await super.setCookie(KEYDROP.main, 'lang', value.toUpperCase(), expireTime)
    await super.setCookie(KEYDROP.cookies, 'key-lang', value.toUpperCase(), expireTime)
    await super.setCookie(KEYDROP.main, 'key-lang', value.toUpperCase(), expireTime)
    return Promise.resolve()
  }
}

export default KeydropClient
