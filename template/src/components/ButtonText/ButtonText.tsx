import { Image } from 'components/image'
import { Text } from 'components/text'
import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ButtonTextProps } from './ButtonText.props'
import { Theme, useTheme } from 'theme'
import { ScaledSheet } from 'rn-scaled-sheet'

export function ButtonText(props: ButtonTextProps) {
  const {
    leftAsset,
    rightAsset,
    style,
    text,
    textPresets,
    textStyle,
    onPress,
    preset,
  } = props

  const theme = useTheme()
  const styles = makeStyles(theme)
  const textStyles = makeTextStyles(theme)

  const mergedTextStyle = [
    styles.text,
    (preset && textStyles[preset]) || textStyles.primary,
    textStyle && textStyle,
  ]
  const mergedButtonStyle = [
    styles.button,
    styles.container,
    (preset && styles[preset]) || styles.primary,
    style && style,
  ]

  return (
    <TouchableOpacity onPress={onPress} style={mergedButtonStyle}>
      <View style={styles.content}>
        {leftAsset && <Image asset={leftAsset} />}
        <Text style={mergedTextStyle} preset={textPresets} text={text} />
        {rightAsset && <Image asset={rightAsset} />}
      </View>
    </TouchableOpacity>
  )
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      alignSelf: 'stretch',
      borderRadius: theme.spacing[2],
      height: theme.spacing[7],
    },

    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },

    container: {
      alignSelf: 'stretch',
      minHeight: 30,
      minWidth: 30,
    },

    text: {
      flex: 1,
      // marginHorizontal: 10,
      textAlign: 'center',
    },

    primary: {
      backgroundColor: theme.colors.primaryButton,
    },

    secondary: {
      backgroundColor: theme.colors.secondaryButton,
    },

    flat: {
      backgroundColor: theme.colors.transparent,
    },
  })

const makeTextStyles = (theme: Theme) =>
  ScaledSheet.create({
    primary: {
      color: theme.colors.tertiaryText,
    },

    secondary: {
      color: theme.colors.secondaryText,
    },

    flat: {
      color: theme.colors.primaryText,
    },
  })
