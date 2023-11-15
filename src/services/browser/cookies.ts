import { KD_API_BASE_URL, STEAM_API_BASE_URL } from '@/constants/API/common'
import { NormalizedCookies } from '@/types/API/browser/cookies'
import { getCookie, getCookies, removeCookie } from '@/utils/API/browser/cookies'

export const getKeydropCookies = async (): Promise<NormalizedCookies> => {
  return await getCookies(KD_API_BASE_URL)
}

export const getSteamId = async (): Promise<string> => {
  try {
    const steamLoginSecureData = await getCookie(STEAM_API_BASE_URL, 'steamLoginSecure')
    if (!steamLoginSecureData) return ''
    return steamLoginSecureData?.steamLoginSecure.split('%7C%7C')[0]
  } catch (e) {
    return ''
  }
}

export const removeKeydropSessionCookie = async (): Promise<void> => {
  await removeCookie(KD_API_BASE_URL, 'session_id')
}
