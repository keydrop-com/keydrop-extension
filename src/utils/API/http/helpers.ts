import { KD_API_BASE_URL } from '@/constants/API/common'
import { Params } from '@/types/API/http/helpers'

export const getApiUrl = (url: string): string => {
  const apiBasePathname =
    new URL(KD_API_BASE_URL).pathname === '/' ? '' : new URL(KD_API_BASE_URL).pathname
  return new URL(`${apiBasePathname}/${url}`, KD_API_BASE_URL).toString()
}

export const URLWithParams = (pathname: string, params: Params): string => {
  const url = new URL(pathname, KD_API_BASE_URL)

  Object.entries(params).forEach(([key, val]) => {
    if (!val) return
    if (Array.isArray(val)) {
      val.forEach((_val) => url.searchParams.append(key, String(_val)))
    } else {
      url.searchParams.append(key, String(val))
    }
  })

  return url.toString()
}

export const getAbsoluteApiUrl = (url: string): string => new URL(url, KD_API_BASE_URL).toString()
