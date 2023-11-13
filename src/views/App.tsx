import '@/i18n'
import '@/styles/index.css'

import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'

import { DEFAULT_APP_MOTION } from '@/constants/app'
import { useApp } from '@/context/AppContext'
import BaseLayout from '@/layouts/BaseLayout'
import MainLayout from '@/layouts/MainLayout'
import LoadingView from '@/views/LoadingView'
import LoginView from '@/views/LoginView'
import MainView from '@/views/MainView'
import SettingsView from '@/views/SettingsView'

const App: FC = () => {
  const {
    appState: { loggedIn, activeView, isLoading },
  } = useApp()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={loggedIn ? 'loggedIn' : 'notLoggedIn'} {...DEFAULT_APP_MOTION}>
        {isLoading && (
          <BaseLayout>
            <LoadingView />
          </BaseLayout>
        )}

        {!loggedIn && !isLoading && (
          <BaseLayout>
            <LoginView />
          </BaseLayout>
        )}

        {loggedIn && !isLoading && (
          <MainLayout>
            <motion.div key={activeView} {...DEFAULT_APP_MOTION}>
              {activeView === 'main-view' && <MainView />}
              {activeView === 'settings-view' && <SettingsView />}
            </motion.div>
          </MainLayout>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default App
