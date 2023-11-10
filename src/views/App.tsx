import '@/i18n'
import '@/styles/index.css'

import { FC } from 'react'

import { useApp } from '@/context/AppContext'
import LoginView from '@/views/LoginView'
import MainView from '@/views/MainView'

const App: FC = () => {
  const {
    appState: { loggedIn, activeView },
  } = useApp()

  if (!loggedIn) {
    return <LoginView />
  }

  switch (activeView) {
    case 'main-view':
      return <MainView />
    default:
      return <></>
  }
}

export default App
