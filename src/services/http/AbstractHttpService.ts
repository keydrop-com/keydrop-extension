import { KEYDROP } from '@/constants/urls'

class AbstractHttpService {
  static async fetchWithoutAuth<T>(
    url: string,
    options: RequestInit = {},
    resolveResponse = true,
    throwError = false,
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
          if (
            throwError &&
            parsedResponse.hasOwnProperty('status') &&
            parsedResponse.status === false
          ) {
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

  static async getToken(): Promise<string> {
    const token = window.__token
    if (token) return token

    const url = new URL('token', KEYDROP.main)
    url.searchParams.set('t', Date.now().toString())

    return fetch(url).then(async (r) => {
      const token = await r.text()

      if (token.includes('<!DOCTYPE html>')) {
        return Promise.reject()
      }

      window.__token = token
      return token
    })
  }

  static async fetchWithAuth<T>(
    url: string,
    options: RequestInit = {},
    resolveResponse = true,
    throwError = true,
  ): Promise<T> {
    const token = await this.getToken()

    if (!token) return Promise.reject()

    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

    return fetch(url, {
      credentials: 'include',
      ...options,
      headers: options.headers || headers,
    })
      .then(async (res) => {
        if (resolveResponse) {
          const parsedResponse = await res.json()
          if (
            throwError &&
            parsedResponse.hasOwnProperty('status') &&
            parsedResponse.status === false
          ) {
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
