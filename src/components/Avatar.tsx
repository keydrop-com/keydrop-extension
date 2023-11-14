import { FC } from 'react'

import { Button } from '@/components/Button'
import { SvgIcon } from '@/components/SvgIcon'
import { cn } from '@/utils/styles'

interface AvatarInterface {
  src: string
  href: string
  alt: string
  variant: 'small' | 'large'
}

export const Avatar: FC<AvatarInterface> = ({ src, alt, href, variant }) => {
  return (
    <Button
      href={href}
      className={cn(
        'group relative z-0 overflow-hidden border-none p-0',
        variant === 'small' && 'h-[65px] w-[65px] rounded-[10px]',
        variant === 'large' && 'h-[150px] w-[150px] rounded-xl',
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          'transition-all group-hover:scale-110 group-hover:opacity-25',
          variant === 'small' && 'h-[65px] w-[65px]',
          variant === 'large' && 'h-[150px] w-[150px]',
        )}
      />
      <span className="absolute inset-0 grid place-items-center bg-[#1F1F27] opacity-0 transition-opacity group-hover:opacity-75">
        <SvgIcon
          iconName="keydrop-signet"
          className={cn(
            'scale-110 text-gold-400 transition-transform group-hover:scale-100',
            variant === 'small' && 'h-8 w-8',
            variant === 'large' && 'h-16 w-16',
          )}
        />
      </span>
    </Button>
  )
}
