import { useActor } from '@xstate/react'
import { JSX } from 'react'

import { ItemService } from '@/types/inventory'
import { isStatTrak, skinNameWithoutStatTrak, splitHashName } from '@/utils/strings'

export const ItemsDetailsCellRender = (service: ItemService): JSX.Element => {
  const [state] = useActor(service)
  const { image, name } = state.context.data
  const [title, subtitle, _condition] = splitHashName(name)
  const condition = _condition ? _condition?.replaceAll('(', '')?.replaceAll(')', '') : ''

  return (
    <div className="grid h-full w-full grid-cols-[90px,1fr] gap-[22px] border-r border-[#2E3244] px-4">
      <div className="flex h-full w-full items-center justify-center">
        <img src={image} alt={name} height={65} width={90} />
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
