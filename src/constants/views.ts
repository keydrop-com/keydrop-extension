import { ActiveView } from '@/types/views'

export const DEFAULT_VIEW_OPTIONS: { value: ActiveView; label: string }[] = [
  { value: ActiveView.userProfile, label: 'userProfile.title' },
  { value: ActiveView.pendingTrades, label: 'pendingTrades.title' },
  { value: ActiveView.notifications, label: 'notifications.title' },
]
