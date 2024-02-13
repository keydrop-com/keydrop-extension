declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_BROWSER_ENGINE: 'gecko' | 'chromium'
    REACT_APP_ENVIRONMENT: 'dev' | 'prod'
    REACT_APP_BASE_URL?: string
    REACT_APP_SESSION_COOKIE_NAME?: string
  }
}
