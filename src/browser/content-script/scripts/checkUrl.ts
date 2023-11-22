import { STEAM } from '@/constants/urls'

export async function checkUrl(): Promise<boolean> {
  const { hostname, pathname, search } = window.location
  const isSteamHostname = hostname === new URL(STEAM.main).hostname
  const isTradeOffersPage = pathname.includes('profiles') && pathname.includes('tradeoffers')
  const isKeydropProvider = new URLSearchParams(search).get('provider') === 'keydrop'

  return isSteamHostname && isTradeOffersPage && isKeydropProvider
}
