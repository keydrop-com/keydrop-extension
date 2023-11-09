import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import AppProvider from '@/context/AppContext'
import App from '@/views/App'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <Suspense fallback="loading">
      <AppProvider>
        <App />
      </AppProvider>
    </Suspense>
  </StrictMode>,
)
