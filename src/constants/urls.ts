export const KEYDROP = {
  main: 'https://key-drop.com/',
  profile: 'https://key-drop.com/panel/profil',
  publicProfile: (steamId: string) => `https://key-drop.com/user/profile/${steamId}`,
  refillBalanceWithCode: (code: string) => `https://key-drop.com/pl/?code=${code}#payment`,
  provablyFair: (id?: string) => `https://key-drop.com/provably-fair/check-roll/${id}`,
  upgradeItem: (id?: string) => `https://key-drop.com/skins/upgrader?item=${id}`,
  kyc: 'https://key-drop.com/Kyc',
}

export const STEAM = {
  main: 'https://steamcommunity.com/',
  tradeOffers: (steamId: string) =>
    `https://steamcommunity.com/profiles/${steamId}/tradeoffers/?provider=extension`,
}
