import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import AppProvider from '@/context/AppContext'
import InventoryProvider from '@/context/InventoryContext'
import App from '@/views/App'

import { LoadingView } from './views/LoadingView/LoadingView'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <Suspense fallback={<LoadingView />}>
      <AppProvider>
        <InventoryProvider>
          <App />
        </InventoryProvider>
      </AppProvider>
    </Suspense>
  </StrictMode>,
)
