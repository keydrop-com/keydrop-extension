require('@testing-library/jest-dom/extend-expect')

jest.mock('webextension-polyfill', () => require('jest-webextension-mock'))

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}))
