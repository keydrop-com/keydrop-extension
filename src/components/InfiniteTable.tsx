import { FC } from 'react'

import { cn } from '@/utils/styles'

export interface InfiniteTableInterface {
  className: string
}

export const InfiniteTable: FC<InfiniteTableInterface> = ({ className }) => {
  return <table className={cn(className)} />
}
