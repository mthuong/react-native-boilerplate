import LocalizedStrings from 'react-native-localization'
import { en } from './translate/en'
// import { vi } from './translate/vi'

export let strings = new LocalizedStrings({
  en: en,
  // vi: vi,
})

export const DEFAULT_LANGUAGE = 'en'
