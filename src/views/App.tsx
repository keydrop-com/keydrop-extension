import { AnimatePresence, motion } from 'framer-motion'
import { FC, JSX } from 'react'
import { withTranslation } from 'react-i18next'

import { APP_VERSION, DEFAULT_APP_MOTION } from '@/constants/app'
import { KEYDROP_URLS } from '@/constants/urls'
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

  const hostname = new URL(KEYDROP_URLS.main).hostname

  function renderDevAppInfo(): JSX.Element | null {
    if (!IS_DEV_MODE) return null

    return (
      <p key="version" className="absolute left-1/2 top-0 z-[1000] -translate-x-1/2 p-1 text-2xs">
        {hostname.toUpperCase()} | DEV v{APP_VERSION}
      </p>
    )
  }

  return (
    <>
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
      {renderDevAppInfo()}
    </>
  )
}

export default withTranslation()(App)
