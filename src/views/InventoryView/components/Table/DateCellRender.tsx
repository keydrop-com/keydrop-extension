import { useActor } from '@xstate/react'
import { JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { KEYDROP } from '@/constants/urls'
import { ItemService } from '@/types/inventory'

export const DateCellRender = (service: ItemService): JSX.Element => {
  const { t } = useTranslation('main', { keyPrefix: 'inventoryView' })
  const [state] = useActor(service)
  const { createdAt, id } = state.context.data
  const formattedTime = new Date(createdAt).toLocaleTimeString()
  const formattedDate = new Date(createdAt).toLocaleDateString().split('.').reverse().join('-')

  return (
    <div className="flex h-full w-full flex-col justify-center gap-1 border-r border-[#2E3244] px-3.5">
      <p className="flex flex-col text-xs font-semibold text-[#B8BCD0]">
        <span>{formattedTime}</span>
        <span>{formattedDate}</span>
      </p>
      <Button
        title={t('checkRoll')}
        href={KEYDROP.provablyFair(id)}
        className="h-fit w-fit truncate rounded-none p-0 underline"
      >
        <span className="max-w-[82px] truncate">{t('checkRoll')}</span>
      </Button>
    </div>
  )
}
