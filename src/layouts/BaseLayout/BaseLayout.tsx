import { FC, ReactNode } from 'react'

import { Navbar } from '@/components/Navbar'

interface BaseLayoutInterface {
  children: ReactNode
}

export const BaseLayout: FC<BaseLayoutInterface> = ({ children }) => {
  return (
    <div className="grid grid-rows-[80px,1fr] gap-[30px] bg-navy-750 p-5">
      <Navbar />
      <div>{children}</div>
    </div>
  )
}
