import { twMerge } from 'tailwind-merge'

import theme from '@/styles/theme'

export const cn = twMerge

export const getRarityColor = (color: string): string => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return theme.colors[color] ? theme.colors[color]?.DEFAULT || 'gray' : 'gray'
}
