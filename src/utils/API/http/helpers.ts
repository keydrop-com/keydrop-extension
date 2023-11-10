import { KD_API_BASE_URL } from '@/constants/API/common'

export const getApiUrl = (url: string): string => {
  const apiBasePathname =
    new URL(KD_API_BASE_URL).pathname === '/' ? '' : new URL(KD_API_BASE_URL).pathname
  return new URL(`${apiBasePathname}/${url}`, KD_API_BASE_URL).toString()
}
