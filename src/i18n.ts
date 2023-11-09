import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Fetch from 'i18next-fetch-backend'
import { initReactI18next } from 'react-i18next'

export default i18next
  .use(Fetch)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ['default'],
    defaultNS: 'default',
    supportedLngs: ['en'],
    backend: {
      loadPath: `${window.location.origin}/locales/{{lng}}/{{ns}}.json`,
    },
  })
