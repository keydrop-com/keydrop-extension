import { checkUrl } from './checkUrl'

global.window = Object.create(window)
const url = 'http://localhost'
Object.defineProperty(window, 'location', {
  value: {
    href: url,
  },
  writable: true,
})

describe('checkUrl function', () => {
  it('checks if current URL meets certain criteria', async () => {
    const setURL = (hostname: string, pathname: string, search: string): void => {
      window.location.hostname = hostname
      window.location.pathname = pathname
      window.location.search = search
    }

    setURL('steamcommunity.com', '/profiles/user/tradeoffers', '?provider=extension')
    const result = await checkUrl()
    expect(result).toBe(true)

    setURL('notsteamcommunity.com', '/profiles/user/tradeoffers', '?provider=extension')
    expect(await checkUrl()).toBe(false)

    setURL('steamcommunity.com', '/nopage/user/tradeoffers', '?provider=extension')
    expect(await checkUrl()).toBe(false)

    setURL('steamcommunity.com', '/profiles/user/tradeoffers', '?provider=not-extension')
    expect(await checkUrl()).toBe(false)
  })
})
