import '@/i18n'
import '@/styles/index.css'
import 'react-toastify/dist/ReactToastify.css'

import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

import AppContextProvider from '@/context/AppContext'
import App from '@/views/App'

import { LoadingView } from './views/LoadingView/LoadingView'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <Suspense fallback={<LoadingView />}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
      <ToastContainer theme="dark" position="bottom-right" />
    </Suspense>
  </StrictMode>,
)
