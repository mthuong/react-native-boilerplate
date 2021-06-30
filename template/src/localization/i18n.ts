/* eslint-disable @typescript-eslint/no-empty-function */
import { initReactI18next } from 'react-i18next'
import i18n, { LanguageDetectorAsyncModule } from 'i18next'

import { defaultNS, resources } from './locales'

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback: any) => {
    callback('en')
  },
  init: () => {},
  cacheUserLanguage: () => {},
}
/**
 * Config i18n for app
 */
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',

    resources: resources,

    // have a common namespace used around the full app
    ns: ['common', 'error', 'signin', 'chat'],
    defaultNS,
    debug: false,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  })

export default i18n

export function translate(key: string, option?: any) {
  return key ? i18n.t(key, option) : ''
}
