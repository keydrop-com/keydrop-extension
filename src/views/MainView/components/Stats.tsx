import { FC } from 'react'

import { ProfilePageResponse } from '@/types/API/http/profile'

interface StatsInterface {
  stats: ProfilePageResponse['stats']
}

interface StatInterface {
  value: number
  label: string
}

const Stat: FC<StatInterface> = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-3xl font-semibold text-gold-400">{value}</p>
      <p className="text-xs font-semibold uppercase text-[#B8BCD0]">{label}</p>
    </div>
  )
}

export const Stats: FC<StatsInterface> = ({ stats }) => {
  return (
    <div className="flex justify-around">
      <Stat value={stats.cases} label="Opened cases" />
      <Stat value={stats.upgrades} label="Skin upgrades" />
      <Stat value={stats.contract} label="Contracts" />
      <Stat value={stats.battle} label="Case Battles" />
      <Stat value={stats.freeCases} label="Daily cases" />
    </div>
  )
}
