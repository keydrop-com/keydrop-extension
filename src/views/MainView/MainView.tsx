import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { Hr } from '@/components/Hr'
import { SvgIcon } from '@/components/SvgIcon'
import { useApp } from '@/context/AppContext'
import ProfileClient from '@/services/http/ProfileClient'
import { ActiveView } from '@/types/app'
import { Stats } from '@/views/MainView/components/Stats/Stats'
import { UserProfile } from '@/views/MainView/components/UserProfile'

export const MainView: FC = () => {
  const { t } = useTranslation('mainView')
  const {
    appState: {
      userProfile,
      userBalance,
      appData: { steamId },
      countersAnimations,
    },
    dispatch,
  } = useApp()

  const isCounterAnimationEnabled = countersAnimations[ActiveView.MAIN]

  const handleOnClick = (): void => {
    dispatch({ type: 'SET_ACTIVE_VIEW', value: ActiveView.INVENTORY })
  }

  const getUserBalance = (): void => {
    ProfileClient.getUserBalance({ skinsValue: false }).then((balance) => {
      dispatch({ type: 'SET_USER_BALANCE', value: balance })
    })
  }

  useEffect(getUserBalance, [])

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[30px] px-5">
        <UserProfile
          steamId={steamId}
          userProfile={userProfile}
          userBalance={userBalance}
          isCounterAnimationEnabled={isCounterAnimationEnabled}
        />
        <Button className="button--primary h-[50px] w-full gap-2" onClick={handleOnClick}>
          <SvgIcon iconName="user-fill" className="relative bottom-0.5 h-[25px] w-[25px]" />
          <span>{t('inventory.button.label')}</span>
        </Button>
      </div>
      <Hr text={t('yourStatistics.hr')} />
      <Stats userProfile={userProfile} isCounterAnimationEnabled={isCounterAnimationEnabled} />
    </div>
  )
}
