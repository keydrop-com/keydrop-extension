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

export const Stats: FC<StatsInterface> = ({
  userProfile: { stats },
  isCounterAnimationEnabled,
}) => {
  const { t } = useTranslation('mainView', { keyPrefix: 'stats' })

  const statistics: Statistics = useMemo(
    () => [
      {
        value: stats.cases,
        label: t('cases.label'),
        iconName: 'cases-fill',
      },
      {
        value: stats.upgrades,
        label: t('upgrades.label'),
        iconName: 'upgrades-fill',
      },
      {
        value: stats.contract,
        label: t('contract.label'),
        iconName: 'contracts-fill',
      },
      {
        value: stats.battle,
        label: t('battle.label'),
        iconName: 'battles-fill',
      },
      {
        value: stats.freeCases,
        label: t('freeCases.label'),
        iconName: 'daily-fill',
      },
    ],
    [t, stats],
  )

  return (
    <div className="flex justify-around">
      {statistics.map((stat) => (
        <Stat key={stat.iconName} isCounterAnimationEnabled={isCounterAnimationEnabled} {...stat} />
      ))}
    </div>
  )
}
