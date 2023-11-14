export const KEYDROP = {
  main: 'https://key-drop.com/',
  profile: 'https://key-drop.com/panel/profil',
  publicProfile: (steamId: string) => `https://key-drop.com/user/profile/${steamId}`,
  refillBalanceWithCode: (code: string) => `https://key-drop.com/?code=${code}`,
}

export const STEAM = {
  main: 'https://steamcommunity.com/',
}
