import { FC } from 'react'

import { SvgIcon } from '@/components/SvgIcon'

export const Navbar: FC = () => {
  return (
    <div className="flex h-[80px] items-center justify-between overflow-hidden rounded-[15px] bg-[#23232D]">
      <div className="px-[22px]">
        <SvgIcon iconName="keydrop-logo" className="h-[35px] w-[153px]" />
      </div>
      <div className="h-full w-[255px] rounded-[15px] bg-[#1F1F27]"></div>
    </div>
  )
}
