declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_BROWSER_ENGINE: 'gecko' | 'chromium'
    REACT_APP_ENVIRONMENT: 'dev' | 'prod'
  }
}
