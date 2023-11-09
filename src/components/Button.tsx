import { JSX } from 'react'

import { SvgIcon } from '@/components/SvgIcon'
import { TwComponent } from '@/types/common'
import { IconsNames } from '@/types/icons'
import { cn } from '@/utils/styles'

interface ButtonProps {
  iconClassName?: string
  iconName?: IconsNames
  label?: string | JSX.Element
  onClick?: () => void
  disabled?: boolean
}

export const Button: TwComponent<ButtonProps> = ({
  as: As = 'button',
  iconName,
  iconClassName = 'w-4 h-4 flex-shrink-0',
  className,
  label = '',
  children,
  ...props
}) => {
  return (
    <As className={cn('button', className)} {...props}>
      {children ?? (
        <>
          {iconName ? (
            <SvgIcon iconName={iconName} className={cn(iconClassName, label && 'mr-2')} />
          ) : null}
          {label ? <span>{label}</span> : null}
        </>
      )}
    </As>
  )
}
