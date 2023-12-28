export const KEYDROP_BASE_URL = 'https://key-drop.com/'
export const STEAM_BASE_URL = 'https://steamcommunity.com/'

export const KEYDROP = {
  main: new URL(KEYDROP_BASE_URL).toString(),
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
  main: new URL(STEAM_BASE_URL).toString(),
  tradeOffers: (steamId: string) =>
    new URL(`/profiles/${steamId}/tradeoffers/?provider=extension`, STEAM_BASE_URL).toString(),
}
