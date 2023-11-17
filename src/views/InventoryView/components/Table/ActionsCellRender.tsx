import { useActor } from '@xstate/react'
import { JSX, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { SvgIcon } from '@/components/SvgIcon'
import { KEYDROP } from '@/constants/urls'
import { ITEM_STATUS } from '@/types/API/http/inventory'
import { ItemService } from '@/types/inventory'
import { formatCurrency } from '@/utils/numbers'
import { cn } from '@/utils/styles'

export const ActionsCellRender = (service: ItemService): JSX.Element => {
  const { t } = useTranslation('inventoryView', { keyPrefix: 'action' })
  const [state, send] = useActor(service)
  const { id, status, price } = state.context.data

  const isActive = useMemo(
    () => [ITEM_STATUS.FOR_EXCHANGE, ITEM_STATUS.NEW].some((_status) => status === _status),
    [status],
  )

  const handleOnSellClick = (): void => {
    send('SELL')
  }

  const handleOnCollectClick = (): void => {
    send('COLLECT')
  }

  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center gap-3.5',
        !isActive && 'opacity-25',
      )}
    >
      <Button
        href={KEYDROP.upgradeItem(id)}
        disabled={!isActive}
        className="button--upgrade h-[35px] w-[35px] rounded-[5px] p-0"
      >
        <SvgIcon iconName="upgrades-fill" className="h-4 w-4" />
        <span className="sr-only">{t('upgrade')}</span>
      </Button>
      <Button
        label={`${t('sell')} ${formatCurrency(price)}`}
        onClick={handleOnSellClick}
        disabled={!isActive}
        className="button--primary h-[35px] min-w-[90px] rounded-[5px] px-4 py-0"
      />
      <Button
        label={t('collect')}
        onClick={handleOnCollectClick}
        disabled={!isActive}
        className="button--primary h-[35px] min-w-[90px] rounded-[5px] bg-gold px-4 py-0 text-navy-900 hover:bg-gold-400"
      />
    </div>
  )
}
