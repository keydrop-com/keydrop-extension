import { useActor } from '@xstate/react'
import { JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { KEYDROP_URLS } from '@/constants/urls'
import { useAppContext } from '@/context/AppContext'
import { ItemService } from '@/types/inventory'
import { getFormattedDate, getFormattedTime } from '@/utils/strings'

export const DateCellRender = (service: ItemService): JSX.Element => {
  const { t } = useTranslation('main', { keyPrefix: 'inventoryView' })
  const { appState } = useAppContext()
  const [state] = useActor(service)

  const { mirrorUrl } = appState.context
  const { createdAt, id, pfId } = state.context.data

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-r border-[#2E3244] px-2">
      <p className="flex gap-2 text-xs font-semibold text-[#B8BCD0]">
        <span>{getFormattedTime(createdAt)}</span>
        <span>{getFormattedDate(createdAt)}</span>
      </p>
      {pfId && (
        <Button
          title={t('checkRoll')}
          href={KEYDROP_URLS.provablyFair(mirrorUrl, id)}
          className="h-fit w-fit truncate rounded-none p-0 underline"
        >
          <span className="max-w-[120px] truncate">{t('checkRoll')}</span>
        </Button>
      )}
    </div>
  )
}
