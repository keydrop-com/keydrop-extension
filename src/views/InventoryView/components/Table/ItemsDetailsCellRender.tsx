import { useActor } from '@xstate/react'
import React, { JSX } from 'react'

import { SvgIcon } from '@/components/SvgIcon'
import { ItemService } from '@/types/inventory'
import { isStatTrak, skinNameWithoutStatTrak, splitHashName } from '@/utils/strings'
import { getRarityColor } from '@/utils/styles'

export const ItemsDetailsCellRender = (service: ItemService): JSX.Element => {
  const [state] = useActor(service)
  const { image, name, color } = state.context.data
  const [title, subtitle, _condition] = splitHashName(name)
  const condition = _condition ? _condition?.replaceAll('(', '')?.replaceAll(')', '') : ''

  return (
    <div className="grid h-full w-full grid-cols-[90px,1fr] gap-[22px] border-r border-[#2E3244] px-4">
      <div className="relative z-0 flex h-full w-full items-center justify-center">
        <img src={image} alt={name} height={65} width={90} className="relative z-[2]" />
        <SvgIcon
          iconName="keydrop-signet"
          className="absolute left-1/2 top-1/2 z-[1] h-[50px] w-[44px] -translate-x-1/2 -translate-y-1/2 text-[#23232D]"
        />
        <div
          style={{ backgroundColor: getRarityColor(color) }}
          className="absolute inset-x-0 bottom-0 z-[2] h-[1px] w-[90px]"
        />
      </div>
      <div className="flex h-full max-w-[139px] flex-col justify-center">
        <p className="w-full truncate text-sm">
          <span className="text-[#B8BCD0]">{skinNameWithoutStatTrak(title)}</span>{' '}
          <span className="font-semibold">{subtitle}</span>
        </p>
        <p className="text-sm">
          {isStatTrak(title) ? <span className="font-semibold text-[#FF9633]">ST™ </span> : ''}
          <span className="text-[#B8BCD0]">{condition}</span>
        </p>
      </div>
    </div>
  )
}
