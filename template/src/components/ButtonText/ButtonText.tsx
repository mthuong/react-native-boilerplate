import { Image } from 'components/image'
import { Text } from 'components/text'
import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ButtonTextProps } from './ButtonText.props'
import { theme } from 'theme'

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

  const mergedTextStyle = [
    styles.TEXT,
    (preset && textStyles[preset]) || textStyles.primary,
    textStyle && textStyle,
  ]
  const mergedButtonStyle = [
    styles.BUTTON,
    styles.CONTAINER,
    (preset && styles[preset]) || styles.primary,
    style && style,
  ]

  return (
    <TouchableOpacity onPress={onPress} style={mergedButtonStyle}>
      <View style={styles.CONTENT}>
        {leftAsset && <Image asset={leftAsset} />}
        <Text style={mergedTextStyle} preset={textPresets} text={text} />
        {rightAsset && <Image asset={rightAsset} />}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  BUTTON: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: theme.spacing[2],
  },

  CONTENT: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  CONTAINER: {
    alignSelf: 'stretch',
    minHeight: 30,
    minWidth: 30,
  },

  TEXT: {
    flex: 1,
    marginHorizontal: 10,
    textAlign: 'center',
  },

  primary: {
    backgroundColor: theme.colors.primaryButton,
  },

  secondary: {
    backgroundColor: theme.colors.secondaryButton,
  },
})

const textStyles = StyleSheet.create({
  primary: {
    color: theme.colors.tertiaryText,
  },

  secondary: {
    color: theme.colors.text,
  },
})
