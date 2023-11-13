import { JSX } from 'react'

import { SvgIcon } from '@/components/SvgIcon'
import { openInNewTab } from '@/services/browser/tabs'
import { TwComponent } from '@/types/common'
import { IconsNames } from '@/types/icons'
import { cn } from '@/utils/styles'

interface ButtonProps {
  iconClassName?: string
  iconName?: IconsNames
  label?: string | JSX.Element
  title?: string
  onClick?: () => void
  disabled?: boolean
  href?: string
}

export const Button: TwComponent<ButtonProps> = ({
  iconName,
  iconClassName = 'w-4 h-4 flex-shrink-0',
  className,
  label = '',
  title,
  children,
  onClick,
  href,
  ...props
}) => {
  const handleOnClick = async (): Promise<void> => {
    onClick?.()

    if (href) {
      await openInNewTab(href)
    }
  }

  return (
    <button className={cn('button', className)} title={title} onClick={handleOnClick} {...props}>
      {children ?? (
        <>
          {iconName ? (
            <SvgIcon iconName={iconName} className={cn(iconClassName, label && 'mr-2')} />
          ) : null}
          {label ? <span>{label}</span> : null}
        </>
      )}
    </button>
  )
}
