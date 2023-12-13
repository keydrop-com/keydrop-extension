import { Cookies } from 'webextension-polyfill'

import { normalizeCookie, normalizeCookies } from './helpers'

describe('normalizeCookie', () => {
  it('should return the value of the cookie', () => {
    const testCookie: Cookies.Cookie = {
      name: 'Test Cookie',
      value: 'Test Value',
      domain: 'test.com',
      hostOnly: true,
      path: '/',
      secure: false,
      httpOnly: false,
      sameSite: 'lax',
      session: false,
      expirationDate: 1672447600,
      storeId: '1',
      firstPartyDomain: 'test.com',
      partitionKey: { topLevelSite: 'test.com' },
    }
    const result = normalizeCookie(testCookie)
    expect(result).toBe('Test Value')
  })
})

describe('normalizeCookies', () => {
  it('returns an empty object when given an empty array', () => {
    expect(normalizeCookies([])).toEqual({})
  })

  it('transforms cookie array to an object with cookie name as the key and value as the value', () => {
    const cookies: Cookies.Cookie[] = [
      {
        name: 'cookie1',
        value: 'value1',
        domain: '',
        hostOnly: true,
        path: '',
        secure: true,
        httpOnly: true,
        sameSite: 'no_restriction',
        session: true,
        storeId: '0',
        firstPartyDomain: '',
        partitionKey: { topLevelSite: '' },
      },
      {
        name: 'cookie2',
        value: 'value2',
        domain: '',
        hostOnly: true,
        path: '',
        secure: true,
        httpOnly: true,
        sameSite: 'no_restriction',
        session: true,
        storeId: '0',
        firstPartyDomain: '',
        partitionKey: { topLevelSite: '' },
      },
    ]
    expect(normalizeCookies(cookies)).toEqual({ cookie1: 'value1', cookie2: 'value2' })
  })
})
