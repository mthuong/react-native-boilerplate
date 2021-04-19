import React from 'react'
import { StyleSheet, Platform, View, ViewProps } from 'react-native'
import { Theme, useTheme } from 'theme'
import { hasNotch } from 'react-native-device-info'

type Props = {
  noStatusbar?: boolean
  bottomSpace?: boolean

  children?: React.ReactNode
} & ViewProps

export const Container = (props: Props) => {
  const styles = makeStyles(useTheme())
  return (
    <View
      {...props}
      style={[
        styles.container,
        props.bottomSpace && styles.bottomSpace,
        props.style,
      ]}>
      {!props.noStatusbar && <View style={styles.statusBar} />}
      {props.children}
    </View>
  )
}

const makeStyles = ({ colors, dimensions }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    statusBar: {
      backgroundColor: colors.statusBar,
      ...Platform.select({
        ios: {
          height: hasNotch() ? 44 : 20,
        },
        android: {
          height: 0,
        },
      }),
    },
    bottomSpace: {
      paddingBottom: dimensions.paddingBottom,
    },
  })
