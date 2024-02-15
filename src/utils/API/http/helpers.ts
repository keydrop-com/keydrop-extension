import { Params } from '@/types/API/http/helpers'

export const getApiUrl = (baseUrl: string, url: string): string => {
  const apiBasePathname = new URL(baseUrl).pathname === '/' ? '' : new URL(baseUrl).pathname
  return new URL(`${apiBasePathname}/${url}`, baseUrl).toString()
}

export const URLWithParams = (baseUrl: string, pathname: string, params: Params): string => {
  const url = new URL(pathname, baseUrl)

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

export const getAbsoluteApiUrl = (baseUrl: string, url: string): string =>
  new URL(url, baseUrl).toString()
