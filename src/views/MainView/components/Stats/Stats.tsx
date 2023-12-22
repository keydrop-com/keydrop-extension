import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ProfilePageResponse } from '@/types/API/http/profile'
import { Stat, StatInterface } from '@/views/MainView/components/Stats/Stat'

interface StatsInterface {
  userProfile: ProfilePageResponse
  isCounterAnimationEnabled: boolean
}

type Statistics = Omit<
  StatInterface,
  'isAnimationEnabled' | 'isAnimationEnabledChange' | 'isCounterAnimationEnabled'
>[]

export const Stats: FC<StatsInterface> = ({ isCounterAnimationEnabled }) => {
  const { t } = useTranslation('main', { keyPrefix: 'userView.stats' })

  const statistics: Statistics = useMemo(
    () => [
      {
        value: 2142,
        label: t('cases.label'),
        iconName: 'cases-fill',
      },
      {
        value: 420,
        label: t('upgrades.label'),
        iconName: 'upgrades-fill',
      },
      {
        value: 96,
        label: t('contract.label'),
        iconName: 'contracts-fill',
      },
      {
        value: 21,
        label: t('battle.label'),
        iconName: 'battles-fill',
      },
      {
        value: 37,
        label: t('freeCases.label'),
        iconName: 'daily-fill',
      },
    ],
    [t],
  )

  return (
    <div className="flex justify-around">
      {statistics.map((stat) => (
        <Stat key={stat.iconName} isCounterAnimationEnabled={isCounterAnimationEnabled} {...stat} />
      ))}
    </div>
  )
}
