import { Image } from 'components/image'
import { Text } from 'components/text'
import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ButtonTextProps } from './ButtonText.props'
import { spacing } from 'theme/spacing'

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

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    borderRadius: spacing[2],
    height: spacing[7],
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
    backgroundColor: '#53B175',
  },

  secondary: {
    backgroundColor: '#F2F3F2',
  },

  flat: {
    backgroundColor: 'transparent',
  },
})

const textStyles = StyleSheet.create({
  primary: {
    color: '#ffffff',
  },

  secondary: {
    color: '#999898',
  },

  flat: {
    color: '#000000',
  },
})
