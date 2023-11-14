import { FC } from 'react'

import { SvgIcon } from '@/components/SvgIcon'
import { IconsNames } from '@/types/icons'
import { AnimatedCounter } from '@/views/MainView/components/AnimatedCounter'

export interface StatInterface {
  value: number
  label: string
  iconName: IconsNames
  isCounterAnimationEnabled: boolean
}

export const Stat: FC<StatInterface> = ({ label, value, iconName, isCounterAnimationEnabled }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <SvgIcon iconName={iconName} className="h-10 w-10 text-gold-400" />
        <p className="text-3xl font-semibold text-gold-400">
          <AnimatedCounter from={0} to={value} isEnabled={isCounterAnimationEnabled} />
        </p>
      </div>
      <p className="text-xs font-semibold uppercase text-[#B8BCD0]">{label}</p>
    </div>
  )
}
