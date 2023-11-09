import React, { CSSProperties, FC } from 'react'

import { IconsNames } from '@/types/icons'
import { cn } from '@/utils/styles'

export type SvgIconProps = { className?: string; iconName: IconsNames; style?: CSSProperties }

export const SvgIcon: FC<SvgIconProps> = ({ className, iconName, style = {} }) => {
  return (
    <svg className={cn('h-6 w-6', className)} style={style}>
      <use xlinkHref={`icons.svg#${iconName}`} />
    </svg>
  )
}
