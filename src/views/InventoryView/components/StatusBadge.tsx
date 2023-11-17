import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { SvgIcon } from '@/components/SvgIcon'
import { ITEM_STATUS } from '@/types/API/http/inventory'
import { IconsNames } from '@/types/icons'
import { cn } from '@/utils/styles'

interface StatusBadgeInterface {
  status: ITEM_STATUS
}

const getStatusBadgeData = (status: ITEM_STATUS): { color: string; iconName: IconsNames } => {
  switch (status) {
    case ITEM_STATUS.NEW:
      return { color: 'text-gold-400', iconName: 'new-fill' }
    case ITEM_STATUS.COLLECTED:
      return { color: 'text-lightgreen', iconName: 'success-fill' }
    case ITEM_STATUS.SOLD:
      return { color: 'text-red-550', iconName: 'hand-with-coins-fill' }
    case ITEM_STATUS.FOR_EXCHANGE:
      return { color: 'text-gold-400', iconName: 'new-fill' }
    case ITEM_STATUS.EXCHANGED_OR_BLOCKED:
      return { color: 'text-pink-400', iconName: 'exchange-fill' }
    case ITEM_STATUS.PENDING:
      return { color: 'text-gold-400', iconName: 'pending-fill' }
    case ITEM_STATUS.UPGRADED:
      return { color: 'text-lightgreen', iconName: 'upgrades-fill' }
    case ITEM_STATUS.EXCHANGED:
      return { color: 'text-pink-400', iconName: 'exchange-fill' }
    default:
      return { color: 'text-gold-400', iconName: 'question-fill' }
  }
}

export const StatusBadge: FC<StatusBadgeInterface> = ({ status }) => {
  const { t } = useTranslation('inventoryView', { keyPrefix: 'status' })
  const { color, iconName } = getStatusBadgeData(status)

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="h-[18px] w-[18px] overflow-hidden rounded-full">
        <SvgIcon iconName={iconName} className={cn('h-[18px] w-[18px]', color)} />
      </div>
      <p className={cn('text-xs font-semibold uppercase', color)}>{t(status)}</p>
    </div>
  )
}
