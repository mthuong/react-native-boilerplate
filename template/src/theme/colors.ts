export const LightTheme = {
  statusBar: '#ffffff',
  navigationBar: '#ffffff',
  backgroundColor: '#ffffff',
  transparent: '#00000000',

  primary: '#53B175',

  primaryText: '#000000',
  secondaryText: '#999898',
  tertiaryText: '#ffffff',
  errorText: '#FE3B2F',
  placeholder: '#999898',

  tabBar: '#FFB802',
  backdrop: '#EFEEEF',
  shadow: '#000000',
  line: '#999898',
  disabled: '#999898',

  primaryButton: '#53B175',
  secondaryButton: '#F2F3F2',

  borderColor: '#999898',
}

export type Color = typeof LightTheme
export type ColorKey = keyof Color

export const DarkTheme: Color = {
  statusBar: '#000000',
  navigationBar: '#000000',
  backgroundColor: '#ffffff',
  transparent: '#00000000',

  primary: '#53B175',

  primaryText: '#000000',
  secondaryText: '#999898',
  tertiaryText: '#ffffff',
  errorText: '#FE3B2F',
  placeholder: '#999898',

  tabBar: '#FFB802',
  backdrop: '#EFEEEF',
  shadow: '#000000',
  line: '#999898',
  disabled: '#999898',

  primaryButton: '#53B175',
  secondaryButton: '#F2F3F2',

  borderColor: '#999898',
}

export type ThemeName = 'light' | 'dark'
