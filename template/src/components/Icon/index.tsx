import React from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import { Theme, useTheme } from 'theme'

import icoMoonConfig from './selection.json'
import { IconTypes } from './types'

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig)

type IconProps = {
  name: IconTypes
  style?: StyleProp<TextStyle & ViewStyle>
  small?: boolean
  medium?: boolean
  large?: boolean
  white?: boolean
  tiny?: boolean
  secondary?: boolean
}

export const Icon = (props: IconProps) => {
  const { style, name } = props
  const styles = makeStyles(useTheme())
  if (!name) {
    return null
  }
  const textStyles = Object.keys(props)
    // @ts-ignore
    .filter(key => props[key])
    // @ts-ignore
    .map(key => styles[key])
    .filter(t => t)
  return (
    <IcoMoonIcon
      {...props}
      name={name}
      style={[
        styles.icon,
        textStyles,
        // @ts-expect-error
        style,
      ]}
    />
  )
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    icon: { fontSize: 25, color: colors.primary },
    secondary: {
      color: colors.secondaryText,
    },
    tiny: {
      fontSize: 14,
    },
    small: {
      fontSize: 20,
    },
    medium: {
      fontSize: 25,
    },
    large: {
      fontSize: 32,
    },
    white: {
      color: '#FFF',
    },
    black: {
      color: '#000',
    },
  })
