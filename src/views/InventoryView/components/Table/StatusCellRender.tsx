import { JSX } from 'react'

import { ItemService } from '@/types/inventory'
import { StatusBadge } from '@/views/InventoryView/components/StatusBadge'

export const StatusCellRender = (service: ItemService): JSX.Element => {
  return (
    <div className="flex h-full w-full items-center justify-center border-r border-[#2E3244]">
      <StatusBadge service={service} />
    </div>
  )
}
