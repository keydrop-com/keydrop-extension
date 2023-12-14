import { cookies } from 'webextension-polyfill'

import { NormalizedCookies } from '@/types/API/browser/cookies'
import { normalizeCookie, normalizeCookies } from '@/utils/API/browser/helpers'

class AbstractBrowserService {
  static async getCookies(domain: string): Promise<NormalizedCookies | null> {
    const allCookies = await cookies.getAll({ url: domain })
    if (!allCookies.length) return null
    return normalizeCookies(allCookies)
  }

  static async getCookie(domain: string, name: string): Promise<string | null> {
    const cookie = await cookies.get({ url: domain, name })
    if (!cookie) return null
    return normalizeCookie(cookie)
  }

  static async removeCookie(domain: string, name: string): Promise<void> {
    await cookies.remove({ url: domain, name })
    return
  }

  static async setCookie(
    domain: string,
    name: string,
    value: string,
    expirationDate: number,
  ): Promise<void> {
    await cookies.set({ url: domain, name, value, expirationDate })
    return
  }
}

export default AbstractBrowserService
