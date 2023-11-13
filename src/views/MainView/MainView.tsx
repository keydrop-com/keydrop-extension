import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Hr } from '@/components/Hr'
import { useApp } from '@/context/AppContext'
import ProfileClient from '@/services/http/ProfileClient'
import { BalanceResponse } from '@/types/API/http/profile'
import { Stats } from '@/views/MainView/components/Stats'
import { UserProfile } from '@/views/MainView/components/UserProfile'

export const MainView: FC = () => {
  const { t } = useTranslation('mainView')
  const {
    appState: {
      userProfile,
      appData: { steamId },
    },
  } = useApp()
  const [userBalance, setUserBalance] = useState<null | BalanceResponse>(null)

  useEffect(() => {
    ProfileClient.getUserBalance({ skinsValue: false }).then((balance) => {
      setUserBalance(balance)
    })
  }, [])

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[30px] px-5">
        <UserProfile userProfile={userProfile} steamId={steamId} userBalance={userBalance} />
      </div>
      <Hr text={t('yourStatistics.hr')} />
      <Stats userProfile={userProfile} />
    </div>
  )
}
