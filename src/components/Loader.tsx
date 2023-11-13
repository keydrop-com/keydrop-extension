import React, { FC } from 'react'

import { SvgIcon } from '@/components/SvgIcon'

interface LoaderProps {
  className?: string
}

const Loader: FC<LoaderProps> = () => {
  return (
    <div className="absolute left-1/2 top-1/2 h-[110px] w-[90px] -translate-x-1/2 -translate-y-1/2">
      <SvgIcon
        iconName="keydrop-signet"
        className="h-[110px] w-[90px] animate-bounce text-white opacity-5"
      />
    </div>
  )
}

export default Loader
