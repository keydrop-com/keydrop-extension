const KEYDROP_BASE_URL = 'https://key-drop.com/'
const KEYDROP_COOKIES_BASE_URL = 'https://key-drop.com/'
const STEAM_BASE_URL = 'https://steamcommunity.com/'
const STEAM_COOKIES_BASE_URL = 'https://steamcommunity.com/'

export const KEYDROP = {
  main: KEYDROP_BASE_URL,
  cookies: KEYDROP_COOKIES_BASE_URL,
  profile: new URL('/panel/profil', KEYDROP_BASE_URL).toString(),
  publicProfile: (steamId: string) =>
    new URL(`/user/profile/${steamId}`, KEYDROP_BASE_URL).toString(),
  refillBalanceWithCode: (code: string) =>
    new URL(`/?code=${code}#payment`, KEYDROP_BASE_URL).toString(),
  provablyFair: (id?: string) =>
    new URL(`/provably-fair/check-roll/${id}`, KEYDROP_BASE_URL).toString(),
  upgradeItem: (id?: string) => new URL(`/skins/upgrader?item=${id}`, KEYDROP_BASE_URL).toString(),
  kyc: new URL('/Kyc', KEYDROP_BASE_URL).toString(),
}

export const STEAM = {
  main: STEAM_BASE_URL,
  cookies: STEAM_COOKIES_BASE_URL,
  tradeOffers: (steamId: string) =>
    new URL(`/profiles/${steamId}/tradeoffers/?provider=extension`, STEAM_BASE_URL).toString(),
}
