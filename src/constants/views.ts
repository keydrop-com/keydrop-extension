import { ActiveView } from '@/types/views'

export const DEFAULT_VIEW_OPTIONS: { value: ActiveView; label: string }[] = [
  { value: ActiveView.MAIN, label: 'userProfile.title' },
  { value: ActiveView.INVENTORY, label: 'pendingTrades.title' },
  { value: ActiveView.NOTIFICATIONS, label: 'notifications.title' },
]
