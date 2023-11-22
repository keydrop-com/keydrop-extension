import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import { withTranslation } from 'react-i18next'

import { DEFAULT_APP_MOTION } from '@/constants/app'
import { useAppContext } from '@/context/AppContext'
import BaseLayout from '@/layouts/BaseLayout'
import MainLayout from '@/layouts/MainLayout'
import { ActiveView } from '@/types/app'
import LoadingView from '@/views/LoadingView'
import LoginView from '@/views/LoginView'
import MainView from '@/views/MainView'
import SettingsView from '@/views/SettingsView'

import { InventoryView } from './InventoryView/InventoryView'

const App: FC = () => {
  const { appState } = useAppContext()
  const { context, matches } = appState
  const { activeView } = context

  const isLoggedIn = matches('loggedIn')
  const isLoading = matches('gettingData')

  return (
    <AnimatePresence mode="wait">
      <motion.div key={isLoggedIn ? 'loggedIn' : 'notLoggedIn'} {...DEFAULT_APP_MOTION}>
        {isLoading && (
          <BaseLayout>
            <LoadingView />
          </BaseLayout>
        )}

        {isLoggedIn ? (
          <MainLayout>
            <motion.div key={activeView} {...DEFAULT_APP_MOTION}>
              {activeView === ActiveView.MAIN && <MainView />}
              {activeView === ActiveView.SETTINGS && <SettingsView />}
              {activeView === ActiveView.INVENTORY && <InventoryView />}
            </motion.div>
          </MainLayout>
        ) : (
          <BaseLayout>
            <LoginView />
          </BaseLayout>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default withTranslation()(App)
