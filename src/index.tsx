import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

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
    </Suspense>
  </StrictMode>,
)
