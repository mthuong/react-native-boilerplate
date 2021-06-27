import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

interface SeparatorProps {
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  color?: string
  vertical?: boolean

  style?: ViewStyle
}

export function Separator(props: SeparatorProps) {
  const {
    color,
    marginLeft,
    marginRight,
    vertical,
    marginBottom,
    marginTop,
    style: customStyle,
  } = props

  let style: ViewStyle = { ...styles.SEPARATOR, ...customStyle }
  if (typeof marginLeft === 'number') {
    style.marginLeft = marginLeft
  }
  if (typeof marginRight === 'number') {
    style.marginRight = marginRight
  }
  if (typeof marginBottom === 'number') {
    style.marginBottom = marginBottom
  }
  if (typeof marginTop === 'number') {
    style.marginTop = marginTop
  }
  if (typeof color === 'string') {
    style.backgroundColor = color
  }

  if (vertical) {
    style = { ...style, ...styles.VERTICAL }
  } else {
    style = { ...style, ...styles.HORIZONTAL }
  }

  return <View style={style} />
}

const styles = StyleSheet.create({
  SEPARATOR: {
    alignSelf: 'stretch',
    backgroundColor: '#DDDDDD',
    height: 1,
  },

  HORIZONTAL: {
    height: 1,
    width: '100%',
  },

  VERTICAL: {
    width: 1,
    height: '100%',
  },
})
