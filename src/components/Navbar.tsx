import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { NavbarButtonInterface, NavigationButton } from '@/components/NavigationButton'
import { SvgIcon } from '@/components/SvgIcon'
import { KEYDROP_URLS } from '@/constants/urls'
import { useAppContext } from '@/context/AppContext'
import { ActiveView } from '@/types/app'

export const Navbar: FC = () => {
  const { t } = useTranslation('main', { keyPrefix: 'common.navbar' })
  const { appState, appSend } = useAppContext()
  const { activeView, initUserData } = appState.context
  const { userName, avatar } = initUserData

  const viewButtons: Omit<NavbarButtonInterface, 'onClick' | 'isActive'>[] = useMemo(
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
    appSend({ type: 'ACTIVE_VIEW_CHANGE', value })
  }

  return (
    <div className="flex h-[80px] items-center justify-between overflow-hidden rounded-[15px] bg-[#23232D]">
      <div className="px-[22px]">
        <Button className="p-0" href={KEYDROP_URLS.main}>
          <SvgIcon iconName="keydrop-logo" className="h-[35px] w-[153px]" />
        </Button>
      </div>
      <div className="flex h-full w-fit items-center gap-[22px] rounded-[15px] bg-[#1F1F27] pl-6 pr-2">
        <div className="flex items-center gap-4">
          {viewButtons.map((data) => (
            <NavigationButton
              key={data.view}
              onClick={handleOnClick}
              isActive={activeView === data.view}
              {...data}
            />
          ))}
        </div>
        <Avatar src={avatar} alt={userName} href={KEYDROP_URLS.profile} variant="small" />
      </div>
    </div>
  )
}
