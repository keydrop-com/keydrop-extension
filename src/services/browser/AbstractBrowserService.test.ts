import { cookies } from 'webextension-polyfill'

import AbstractBrowserService from '@/services/browser/AbstractBrowserService'
import { NormalizedCookies } from '@/types/API/browser/cookies'

jest.mock('webextension-polyfill', () => ({
  cookies: {
    getAll: jest.fn(),
    get: jest.fn(),
    remove: jest.fn(),
    set: jest.fn(),
  },
}))

describe('AbstractBrowserService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('getCookies should call the getAll method of the cookies object', async () => {
    const domain = 'http://example.com'
    const fakeCookies: NormalizedCookies = { key: 'value' }
    ;(cookies.getAll as jest.Mock).mockResolvedValue(fakeCookies)

    await AbstractBrowserService.getCookies(domain)

    expect(cookies.getAll).toHaveBeenCalledWith({ url: domain })
  })

  it('getCookie should return null if there is no cookie', async () => {
    const domain = 'http://example.com'
    const cookieName = 'name'

    ;(cookies.get as jest.Mock).mockResolvedValue(null)

    const cookie = await AbstractBrowserService.getCookie(domain, cookieName)

    expect(cookies.get).toHaveBeenCalledWith({ url: domain, name: cookieName })
    expect(cookie).toBe(null)
  })

  it('removeCookie should call the remove method of the cookies object', async () => {
    const domain = 'http://example.com'
    const cookieName = 'name'

    await AbstractBrowserService.removeCookie(domain, cookieName)

    expect(cookies.remove).toHaveBeenCalledWith({ url: domain, name: cookieName })
  })

  it('setCookie should call the set method of the cookies object', async () => {
    const domain = 'http://example.com'
    const cookieName = 'name'
    const cookieValue = 'value'
    const expirationDate = 1626585600

    await AbstractBrowserService.setCookie(domain, cookieName, cookieValue, expirationDate)

    expect(cookies.set).toHaveBeenCalledWith({
      url: domain,
      name: cookieName,
      value: cookieValue,
      expirationDate,
    })
  })
})
