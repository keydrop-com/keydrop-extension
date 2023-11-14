import { FC } from 'react'

import { Button } from '@/components/Button'
import { SvgIcon } from '@/components/SvgIcon'
import { ActiveView } from '@/types/app'
import { IconsNames } from '@/types/icons'
import { cn } from '@/utils/styles'

export interface NavbarButtonInterface {
  label: string
  view: ActiveView
  icon: IconsNames
  onClick: (view: ActiveView) => void
  isActive: boolean
}

export const NavigationButton: FC<NavbarButtonInterface> = ({
  view,
  label,
  icon,
  onClick,
  isActive,
}) => {
  return (
    <Button
      title={label}
      onClick={() => onClick(view)}
      className="button--primary h-[35px] w-[35px] rounded-[5px] bg-transparent p-0"
    >
      <SvgIcon iconName={icon} className={cn('h-4 w-4', isActive && '!text-gold-400')} />
    </Button>
  )
}
