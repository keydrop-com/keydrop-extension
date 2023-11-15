import { KD_API_BASE_URL } from '@/constants/API/common'

class AbstractHttpService {
  static async fetchWithoutAuth<T>(
    url: string,
    options: RequestInit = {},
    resolveResponse = true,
  ): Promise<T> {
    return fetch(url, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    })
      .then(async (res) => {
        if (!res.ok) {
          return Promise.reject(res)
        }
        if (resolveResponse) {
          const parsedResponse = await res.json()
          if (parsedResponse.hasOwnProperty('status') && parsedResponse.status === false) {
            throw new Error(url)
          }
          return parsedResponse
        }
        return res
      })
      .catch((e) => {
        return Promise.reject(e)
      })
  }

  static async getToken(): Promise<string | null> {
    const token = window.__token__
    if (token) return token

    const url = new URL('token', KD_API_BASE_URL)
    url.searchParams.set('t', Date.now().toString())

    return fetch(url).then(async (r) => {
      const token = await r.text()

      if (token.includes('<!DOCTYPE html>')) return null

      window.__token__ = token
      return token
    })
  }

  static async fetchWithAuth<T>(
    url: string,
    options: RequestInit = {},
    resolveResponse = true,
  ): Promise<T> {
    const token = await this.getToken()

    if (!token) throw new Error(url)

    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

    return fetch(url, {
      credentials: 'include',
      ...options,
      headers: { ...headers, ...options.headers },
    })
      .then(async (res) => {
        if (resolveResponse) {
          const parsedResponse = await res.json()
          if (parsedResponse.hasOwnProperty('status') && parsedResponse.status === false) {
            throw new Error(url)
          }
          return parsedResponse
        }
        return res
      })
      .catch((e) => {
        return Promise.reject(e)
      })
  }
}

export default AbstractHttpService