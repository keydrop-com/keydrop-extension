import { FC } from 'react'

import { useApp } from '@/context/AppContext'
import BaseLayout from '@/layouts/BaseLayout'
import { Stats } from '@/views/MainView/components/Stats'

export const MainView: FC = () => {
  const {
    appState: { userProfile },
  } = useApp()
  return (
    <BaseLayout>
      <Stats stats={userProfile.stats} />
    </BaseLayout>
  )
}
