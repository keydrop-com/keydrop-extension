import React, { FC } from 'react'

import { SvgIcon } from '@/components/SvgIcon'
import { cn } from '@/utils/styles'

interface LoaderProps {
  height?: number
  width?: number
  iconClassName?: string
}

const Loader: FC<LoaderProps> = ({
  height = 110,
  width = 90,
  iconClassName = 'text-white opacity-5',
}) => {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ height, width }}
    >
      <SvgIcon
        iconName="keydrop-signet"
        className={cn('animate-bounce', iconClassName)}
        style={{ height, width }}
      />
    </div>
  )
}

export default Loader
