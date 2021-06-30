import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { Theme, ThemeContext } from 'theme'

export interface BoxProps extends ViewProps {
  horizontal?: boolean
  vertical?: boolean
  full?: boolean
  center?: boolean
  centerVertical?: boolean
  absoluteFillParent?: boolean
  children?: any
  paddingH?: boolean
  paddingV?: boolean
  padding?: boolean
  marginH?: boolean
  marginTop?: boolean
}

export const Box = (props: BoxProps) => {
  const styles = makeStyles(React.useContext(ThemeContext))
  const customStyles = Object.keys(props)
    // @ts-ignore
    .filter((key: string): boolean => !!styles[key])
    // @ts-ignore
    .map(key => styles[key])
  return (
    <View {...props} style={[customStyles, props.style]}>
      {props.children}
    </View>
  )
}
const makeStyles = ({ spacing }: Theme) =>
  StyleSheet.create({
    horizontal: {
      flexDirection: 'row',
    },
    vertical: {
      flexDirection: 'column',
    },
    full: {
      flex: 1,
    },
    centerVertical: {
      alignItems: 'center',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    paddingH: {
      paddingHorizontal: spacing[2],
    },
    paddingV: {
      paddingVertical: spacing[2],
    },
    padding: {
      padding: spacing[2],
    },
    absoluteFillParent: {
      ...StyleSheet.absoluteFillObject,
    },
    marginH: {
      marginHorizontal: spacing[2],
    },
    marginTop: {
      marginTop: spacing[2],
    },
  })
