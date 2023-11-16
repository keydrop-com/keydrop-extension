import { cookies } from 'webextension-polyfill'

import { NormalizedCookies } from '@/types/API/browser/cookies'
import { normalizeCookie, normalizeCookies } from '@/utils/API/browser/helpers'

class AbstractBrowserService {
  static async getCookies(domain: string): Promise<NormalizedCookies> {
    const allCookies = await cookies.getAll({ url: domain })
    return normalizeCookies(allCookies)
  }

  static async getCookie(domain: string, name: string): Promise<string | null> {
    const cookie = await cookies.get({ url: domain, name: name })
    if (!cookie) return null
    return normalizeCookie(cookie)
  }

  static async removeCookie(domain: string, name: string): Promise<void> {
    await cookies.remove({ url: domain, name: name })
    return
  }
}

export default AbstractBrowserService
