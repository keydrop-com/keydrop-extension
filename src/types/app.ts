export type AppData = {
  sessionId: string
  steamId: string
}

export enum ActiveView {
  MAIN = 'main-view',
  INVENTORY = 'your-inventory-view',
  NOTIFICATIONS = 'notifications-view',
  SETTINGS = 'settings-view',
}

export type CountersAnimations = {
  [key in ActiveView]: boolean
}
