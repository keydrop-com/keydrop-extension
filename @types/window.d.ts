declare global {
  interface Window {
    __token: string
    __refetchBalance: () => void
  }
}

export {}
