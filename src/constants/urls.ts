export const KEYDROP_BASE_URL = 'https://key-drop.com/'
export const STEAM_BASE_URL = 'https://steamcommunity.com/'

export const KEYDROP_URLS = {
  profile: (baseUrl: string) => new URL('/panel/profil', baseUrl).toString(),
  publicProfile: (baseUrl: string, steamId: string) =>
    new URL(`/user/profile/${steamId}`, baseUrl).toString(),
  refillBalanceWithCode: (baseUrl: string, code: string) =>
    new URL(`/?code=${code}#payment`, baseUrl).toString(),
  provablyFair: (baseUrl: string, id?: string) =>
    new URL(`/provably-fair/check-roll/${id}`, baseUrl).toString(),
  upgradeItem: (baseUrl: string, id?: string) =>
    new URL(`/skins/upgrader?item=${id}`, baseUrl).toString(),
  kyc: (baseUrl: string) => new URL('/Kyc', baseUrl).toString(),
}

export const STEAM_URLS = {
  tradeOffers: (steamId: string) =>
    new URL(`/profiles/${steamId}/tradeoffers/?provider=extension`, STEAM_BASE_URL).toString(),
}
