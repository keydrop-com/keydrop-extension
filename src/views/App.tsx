import '@/i18n'
import '@/styles/index.css'

import { FC } from 'react'

import { useApp } from '@/context/AppContext'
import LoginView from '@/views/LoginView'

const App: FC = () => {
  const {
    appState: { loggedIn },
  } = useApp()

  if (!loggedIn) {
    return <LoginView />
  }

  return <></>
}

export default App
