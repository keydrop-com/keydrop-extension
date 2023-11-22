import { useActor } from '@xstate/react'
import { JSX, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { SvgIcon } from '@/components/SvgIcon'
import { ITEM_STATUS } from '@/types/API/http/inventory'
import { ItemService, StatusBadgeData } from '@/types/inventory'
import { cn } from '@/utils/styles'

export const StatusCellRender = (service: ItemService): JSX.Element => {
  const { t } = useTranslation('inventoryView', { keyPrefix: 'status' })
  const [state] = useActor(service)

  const { context, matches } = state
  const { status } = context.data

  const data: StatusBadgeData | undefined = useMemo(() => {
    return (
      [
        {
          isActive: matches('private.skin.status.new'),
          color: 'text-gold-400',
          iconName: 'new-fill',
          label: t('new'),
        },
        {
          isActive: matches('private.skin.status.collected'),
          color: 'text-lightgreen',
          iconName: 'success-fill',
          label: t('collected'),
        },
        {
          isActive: matches('private.skin.status.sold'),
          color: 'text-red-550',
          iconName: 'hand-with-coins-fill',
          label: t('sold'),
        },
        {
          isActive:
            matches('private.skin.status.forExchange') ||
            matches('private.skin.status.newFromSkinChanger'),
          color: 'text-gold-400',
          iconName: 'new-fill',
          label: t('forExchange'),
        },
        {
          isActive: matches('private.skin.status.exchangedOrBlocked'),
          color: 'text-pink-400',
          iconName: 'exchange-fill',
          label: t('exchanged'),
        },
        {
          isActive: matches('private.skin.status.pending'),
          color: 'text-gold-400',
          iconName: 'pending-fill',
          label: t('pending'),
        },
        {
          isActive: matches('private.skin.status.selling'),
          color: 'text-gold-400',
          iconName: 'pending-fill',
          label: t('selling'),
        },
        {
          isActive: status === ITEM_STATUS.UPGRADED,
          color: 'text-lightgreen',
          iconName: 'upgrades-fill',
          label: t('upgraded'),
        },
        {
          isActive: matches('private.skin.status.exchanged'),
          color: 'text-pink-400',
          iconName: 'exchange-fill',
          label: t('exchanged'),
        },
      ] as StatusBadgeData[]
    ).find(({ isActive }) => isActive)
  }, [state])

  return (
    <div className="flex h-full w-full items-center justify-center border-r border-[#2E3244]">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="h-[18px] w-[18px] overflow-hidden rounded-full">
          <SvgIcon
            iconName={data?.iconName || 'question-fill'}
            className={cn('h-[18px] w-[18px]', data?.color || 'text-gold-400')}
          />
        </div>
        <p className={cn('text-xs font-semibold uppercase', data?.color || 'text-gold-400')}>
          {data?.label || 'N/A'}
        </p>
      </div>
    </div>
  )
}
