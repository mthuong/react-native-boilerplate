import { defaultNS, resources } from '.'

// react-i18next versions lower than 11.11.0
declare module 'react-i18next' {
  type TDefaultResources = DefaultResources & typeof resources['en']
  interface Resources extends TDefaultResources {}
}

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: typeof resources['en']
  }
}
