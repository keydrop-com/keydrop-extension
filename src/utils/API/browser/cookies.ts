import { cookies } from 'webextension-polyfill'

import { NormalizedCookies } from '@/types/API/browser/cookies'
import { normalizeCookies } from '@/utils/API/browser/helpers'

export const getCookies = async (domain: string): Promise<NormalizedCookies> => {
  const allCookies = await cookies.getAll({ url: domain })
  return normalizeCookies(allCookies)
}

export const getCookie = async (
  domain: string,
  name: string,
): Promise<NormalizedCookies | null> => {
  const allCookies = await cookies.get({ url: domain, name: name })
  if (!allCookies) return null
  return normalizeCookies([allCookies])
}
