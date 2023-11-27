import { useActor } from '@xstate/react'
import { JSX, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('main', { keyPrefix: 'inventoryView.action' })
  const { appState } = useAppContext()
  const [state, send] = useActor(service)

  const { context, matches } = state
  const { id, price, name } = context.data

  const { steamId, currency } = appState.context.initUserData

  const [canBeCollectedState] = useState(CAN_BE_COLLECTED_STATES.some(matches))

  const isVoucher = name.startsWith('VOUCHER')
  const canBeCollected = CAN_BE_COLLECTED_STATES.some(matches)
  const canBeUpgradedOrSold = CAN_BE_UPGRADED_OR_SOLD_STATES.some(matches)
  const isLoading = IS_LOADING_STATES.some(matches)
  const isPending = matches('private.skin.status.pending')
  const isSold = matches('private.skin.status.sold')

  const handleOnSellClick = (): void => {
    if (!canBeUpgradedOrSold) return
    send('SELL')
  }

  const handleOnCollectClick = (): void => {
    if (!canBeCollected) return
    send('COLLECT')
  }

  useEffect(() => {
    if (canBeCollectedState && isPending) {
      CommonClient.openInNewTab(STEAM.tradeOffers(steamId))
    }
  }, [state])

  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm font-semibold uppercase text-gold-400">
          <Trans i18nKey="inventoryView.offerSent" ns="main" />
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div
        className={cn(
          'grid h-full w-full grid-rows-[27px,27px] gap-2 px-2',
          isVoucher ? 'grid-cols-1' : 'grid-cols-[27px,1fr]',
        )}
      >
        <Button
          href={KEYDROP.upgradeItem(id)}
          disabled={!canBeUpgradedOrSold || isLoading || isSold}
          className="button--upgrade col-span-1 h-[27px] min-w-[27px] rounded-[5px] p-0 text-2xs"
        >
          {isLoading ? (
            <CircleLoader className="h-3 w-3 text-blue-550" />
          ) : (
            <>
              <SvgIcon iconName="upgrades-fill" className="h-4 w-4" />
              <span className="sr-only">{t('upgrade')}</span>
            </>
          )}
        </Button>

        {!isVoucher && (
          <Button
            onClick={handleOnCollectClick}
            disabled={!canBeCollected || isLoading || isSold}
            className="button--primary col-span-1 h-[27px] min-w-[90px] rounded-[5px] bg-gold px-4 py-0 text-2xs text-navy-900 hover:bg-gold-400"
          >
            {isLoading ? (
              <CircleLoader className="h-3 w-3 text-navy-900" />
            ) : (
              <span>{t('collect')}</span>
            )}
          </Button>
        )}

        <Button
          onClick={handleOnSellClick}
          disabled={!canBeUpgradedOrSold || isLoading || isSold}
          className={cn(
            'button--primary h-[27px] min-w-[90px] rounded-[5px] px-4 py-0 text-2xs',
            isVoucher ? 'col-span-1' : 'col-span-2',
          )}
        >
          {isLoading ? (
            <CircleLoader className="h-3 w-3 text-gold-400" />
          ) : (
            <span>
              {isSold ? <Trans i18nKey="inventoryView.status.sold" ns="main" /> : t('sell')}{' '}
              {formatCurrency(price, currency)}
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
