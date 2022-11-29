import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const Languagues = ['en', 'vi']

i18n
  .use(Backend)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    lng: localStorage.getItem('language'),
    debug: false,
    whitelist: Languagues,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
