import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { Hr } from '@/components/Hr'
import { SvgIcon } from '@/components/SvgIcon'
import { useAppContext } from '@/context/AppContext'
import { ActiveView } from '@/types/app'
import { Stats } from '@/views/MainView/components/Stats/Stats'
import { UserProfile } from '@/views/MainView/components/UserProfile'

export const MainView: FC = () => {
  const { t } = useTranslation('mainView')

  const { appState, appSend } = useAppContext()
  const { userProfile, userBalance, appData, countersAnimations } = appState.context
  const { steamId } = appData

  const isCounterAnimationEnabled = countersAnimations[ActiveView.MAIN]

  const handleOnClick = (): void => {
    appSend({ type: 'ACTIVE_VIEW_CHANGE', value: ActiveView.INVENTORY })
  }

  const getUserBalance = (): void => {
    // BalanceClient.getUserBalance({ skinsValue: false }).then((balance) => {
    //   dispatch({ type: 'SET_USER_BALANCE', value: balance })
    // })
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
