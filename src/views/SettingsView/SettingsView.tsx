import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Dropdown } from '@/components/Dropdown'
import { ViewBar } from '@/components/ViewBar'
import { useAppContext } from '@/context/AppContext'
import { ActiveView } from '@/types/app'

export const SettingsView: FC = () => {
  const { t } = useTranslation('settingsView')
  const { appSend } = useAppContext()

  const handleOnBackClick = (): void => {
    appSend({ type: 'ACTIVE_VIEW_CHANGE', value: ActiveView.MAIN })
  }

  return (
    <div className="grid grid-rows-[35px,430px] gap-[30px] px-5">
      <ViewBar title={t('title')} onBackClick={handleOnBackClick} />
      <div>
        <Dropdown
          options={[
            { label: 'Polish', value: 'pl' },
            { label: 'English', value: 'en' },
          ]}
        />
      </div>
    </div>
  )
}
