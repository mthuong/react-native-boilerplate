import React, { useState } from 'react'
import { Appearance } from 'react-native'

import { DarkTheme, LightTheme, ThemeName } from './colors'
import fonts from './fonts'
import { spacing } from './spacing'
import { dimensions, sharedStyle } from './themes'

export type Theme = typeof defaultTheme

export const defaultTheme = {
  colors: Appearance.getColorScheme() === 'light' ? LightTheme : DarkTheme,
  sharedStyle,
  dimensions,
  fonts,
  spacing,
  changeTheme: (theme: ThemeName) => {
    theme
  },
}

export const ThemeContext = React.createContext(defaultTheme)

export const useTheme = () => React.useContext(ThemeContext)

const Provider = ({
  theme = 'light',
  children,
}: {
  theme?: ThemeName
  children: any
}) => {
  const [currentTheme, changeTheme] = useState(theme)

  const value: Theme = {
    ...defaultTheme,
    colors: currentTheme === 'light' ? LightTheme : DarkTheme,
    changeTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const ThemeProvider = Provider
