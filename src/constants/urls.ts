export const KEYDROP = {
  main: 'https://key-drop.com/',
  profile: 'https://key-drop.com/panel/profil',
  publicProfile: (steamId: string) => `https://key-drop.com/user/profile/${steamId}`,
  refillBalanceWithCode: (code: string) => `https://key-drop.com/?code=${code}`,
  provablyFair: (id?: string) => `https://key-drop.com/provably-fair/check-roll/${id}`,
  upgradeItem: (id?: string) => `https://key-drop.com/skins/upgrader?item=${id}`,
}

export const STEAM = {
  main: 'https://steamcommunity.com/',
}
