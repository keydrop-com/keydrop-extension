import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import { withTranslation } from 'react-i18next'

import { APP_VERSION, DEFAULT_APP_MOTION } from '@/constants/app'
import { useAppContext } from '@/context/AppContext'
import BaseLayout from '@/layouts/BaseLayout'
import MainLayout from '@/layouts/MainLayout'
import { ActiveView } from '@/types/app'
import LoadingView from '@/views/LoadingView'
import LoginView from '@/views/LoginView'
import MainView from '@/views/MainView'
import SettingsView from '@/views/SettingsView'

import { InventoryContextProvider } from '../context/InventoryContext/InvenyoryContext'
import { InventoryView } from './InventoryView/InventoryView'

const IS_DEV_MODE = process.env.REACT_APP_ENVIRONMENT === 'dev'

const App: FC = () => {
  const { appState } = useAppContext()
  const { context, matches } = appState
  const { activeView } = context

  const isLoggedIn = matches('loggedIn')
  const isLoading = matches('gettingData')

  return (
    <>
      {IS_DEV_MODE && (
        <p key="version" className="absolute right-0 top-0 z-[1000] p-1 text-2xs">
          DEV v{APP_VERSION}
        </p>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={isLoggedIn ? 'loggedIn' : 'notLoggedIn'} {...DEFAULT_APP_MOTION}>
          {isLoading && (
            <BaseLayout>
              <LoadingView />
            </BaseLayout>
          )}

          {isLoggedIn ? (
            <InventoryContextProvider>
              <MainLayout>
                <motion.div key={activeView} {...DEFAULT_APP_MOTION}>
                  {activeView === ActiveView.MAIN && <MainView />}
                  {activeView === ActiveView.SETTINGS && <SettingsView />}
                  {activeView === ActiveView.INVENTORY && <InventoryView />}
                </motion.div>
              </MainLayout>
            </InventoryContextProvider>
          ) : (
            <BaseLayout>
              <LoginView />
            </BaseLayout>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default withTranslation()(App)
