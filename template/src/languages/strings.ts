import LocalizedStrings from 'react-native-localization'
import { en } from './translate/en'
// import { vi } from './translate/vi'

export const strings = new LocalizedStrings({
  en,
  // vi,
})

export const DEFAULT_LANGUAGE = 'en'
