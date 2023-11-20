import { useActor } from '@xstate/react'
import { JSX, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { CircleLoader } from '@/components/CircleLoader'
import { SvgIcon } from '@/components/SvgIcon'
import {
  CAN_BE_COLLECTED_STATES,
  CAN_BE_UPGRADED_OR_SOLD_STATES,
  IS_LOADING_STATES,
} from '@/constants/inventory'
import { KEYDROP, STEAM } from '@/constants/urls'
import { useAppContext } from '@/context/AppContext'
import CommonClient from '@/services/browser/CommonClient'
import { ItemService } from '@/types/inventory'
import { formatCurrency } from '@/utils/numbers'
import { cn } from '@/utils/styles'

export const ActionsCellRender = (service: ItemService): JSX.Element => {
  const { t } = useTranslation('inventoryView', { keyPrefix: 'action' })
  const { appState } = useAppContext()
  const [state, send] = useActor(service)

  const { context, matches } = state
  const { id, price, name } = context.data

  const [canBeCollectedState] = useState(CAN_BE_COLLECTED_STATES.some(matches))

  const isVoucher = name.startsWith('VOUCHER')
  const canBeCollected = CAN_BE_COLLECTED_STATES.some(matches)
  const canBeUpgradedOrSold = CAN_BE_UPGRADED_OR_SOLD_STATES.some(matches)
  const isLoading = IS_LOADING_STATES.some(matches)

  const handleOnSellClick = (): void => {
    if (!canBeUpgradedOrSold) return
    send('SELL')
  }

  const handleOnCollectClick = (): void => {
    if (!canBeCollected) return
    send('COLLECT')
  }

  useEffect(() => {
    if (canBeCollectedState && matches('private.skin.status.pending')) {
      CommonClient.openInNewTab(STEAM.tradeOffers(appState.context.appData.steamId))
    }
  }, [state])

  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center gap-3.5',
        isLoading && 'opacity-25',
      )}
    >
      <Button
        href={KEYDROP.upgradeItem(id)}
        disabled={!canBeUpgradedOrSold || isLoading}
        className="button--upgrade h-[35px] w-[35px] rounded-[5px] p-0"
      >
        {isLoading ? (
          <CircleLoader className="h-4 w-4 text-blue-550" />
        ) : (
          <>
            <SvgIcon iconName="upgrades-fill" className="h-4 w-4" />
            <span className="sr-only">{t('upgrade')}</span>
          </>
        )}
      </Button>

      <Button
        onClick={handleOnSellClick}
        disabled={!canBeUpgradedOrSold || isLoading}
        className={cn(
          'button--primary h-[35px] rounded-[5px] px-4 py-0',
          isVoucher ? 'min-w-[194px]' : 'min-w-[90px]',
        )}
      >
        {isLoading ? (
          <CircleLoader className="h-4 w-4" />
        ) : (
          <span>{`${t('sell')} ${formatCurrency(price)}`}</span>
        )}
      </Button>

      {!isVoucher && (
        <Button
          onClick={handleOnCollectClick}
          disabled={!canBeCollected || isLoading}
          className="button--primary h-[35px] min-w-[90px] rounded-[5px] bg-gold px-4 py-0 text-navy-900 hover:bg-gold-400"
        >
          {isLoading ? (
            <CircleLoader className="h-4 w-4 text-white" />
          ) : (
            <span>{t('collect')}</span>
          )}
        </Button>
      )}
    </div>
  )
}
