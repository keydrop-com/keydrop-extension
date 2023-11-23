import i18next from 'i18next'
import Fetch from 'i18next-fetch-backend'
import { initReactI18next } from 'react-i18next'

import { SUPPORTED_LANGUAGES } from '@/constants/lang'

export default i18next
  .use(Fetch)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['main'],
    defaultNS: 'main',
    supportedLngs: Object.keys(SUPPORTED_LANGUAGES).map((v) => v.toLowerCase()),
    backend: {
      loadPath: `${window.location.origin}/locales/{{lng}}/{{ns}}.json`,
    },
  })

export const translate = i18next.t

export const changeLang = i18next.changeLanguage
