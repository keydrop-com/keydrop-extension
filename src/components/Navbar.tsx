import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { SvgIcon } from '@/components/SvgIcon'
import { KEYDROP } from '@/constants/urls'
import { useApp } from '@/context/AppContext'
import { ActiveView } from '@/types/app'
import { IconsNames } from '@/types/icons'
import { cn } from '@/utils/styles'

type NavbarButton = {
  label: string
  view: ActiveView
  icon: IconsNames
}

export const Navbar: FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'navbar' })
  const {
    appState: {
      activeView,
      userProfile: {
        user: { username, avatar },
      },
    },
    dispatch,
  } = useApp()

  const viewButtons: NavbarButton[] = useMemo(
    () => [
      {
        label: t('button.main.label'),
        view: ActiveView.MAIN,
        icon: 'user-fill',
      },
      {
        label: t('button.settings.label'),
        view: ActiveView.SETTINGS,
        icon: 'settings-fill',
      },
    ],
    [t],
  )

  const handleOnClick = (value: ActiveView): void => {
    dispatch({ type: 'setActiveView', value })
  }

  return (
    <div className="flex h-[80px] items-center justify-between overflow-hidden rounded-[15px] bg-[#23232D]">
      <div className="px-[22px]">
        <Button className="p-0" href={KEYDROP.main}>
          <SvgIcon iconName="keydrop-logo" className="h-[35px] w-[153px]" />
        </Button>
      </div>
      <div className="flex h-full w-fit items-center gap-[22px] rounded-[15px] bg-[#1F1F27] pl-6 pr-2">
        <div className="flex items-center gap-4">
          {viewButtons.map(({ view, icon, label }) => (
            <Button
              key={view}
              title={label}
              onClick={() => handleOnClick(view)}
              className="button--primary h-[35px] w-[35px] rounded-[5px] bg-transparent p-0"
            >
              <SvgIcon
                iconName={icon}
                className={cn('h-4 w-4', activeView === view && '!text-gold-400')}
              />
            </Button>
          ))}
        </div>
        <Button
          href={KEYDROP.profile}
          className="h-[65px] w-[65px] overflow-hidden rounded-[10px] border-none p-0"
        >
          <img src={avatar} alt={username} className="h-[65px] w-[65px]" />
        </Button>
      </div>
    </div>
  )
}
