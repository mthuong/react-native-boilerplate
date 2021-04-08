import React, { createContext, useState, useContext } from 'react'
import { strings, DEFAULT_LANGUAGE } from './strings'

export const LocalizationContext = createContext({
  ...strings,
  setAppLanguage: (language: string) => {
    console.log('setAppLanguage - Please implement this function', language)
  },
  initializeAppLanguage: () => {
    console.log('initializeAppLanguage - Plz implement this function')
  },
  language: DEFAULT_LANGUAGE,
})

interface Props {
  children?: JSX.Element
}

const LocalizationProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE)

  const setAppLanguage = (l: string) => {
    strings.setLanguage(l)
    setLanguage(l)

    // Can improve by saving localize string here
  }

  const initializeAppLanguage = () => {
    // const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE)
    // if (currentLanguage) {
    //   setLanguage(currentLanguage)
    // } else {
    //   let localeCode = DEFAULT_LANGUAGE
    //   const supportedLocaleCodes = translations.getAvailableLanguages()
    //   const phoneLocaleCodes = RNLocalize.getLocales().map(
    //     (locale) => locale.languageCode
    //   )
    //   phoneLocaleCodes.some((code) => {
    //     if (supportedLocaleCodes.includes(code)) {
    //       localeCode = code
    //       return true
    //     }
    //   })
    setAppLanguage(DEFAULT_LANGUAGE)
    // }
  }

  return (
    <LocalizationContext.Provider
      value={{ ...strings, setAppLanguage, initializeAppLanguage, language }}>
      {children}
    </LocalizationContext.Provider>
  )
}

export const useLocalizationContext = () => useContext(LocalizationContext)

export default LocalizationProvider
