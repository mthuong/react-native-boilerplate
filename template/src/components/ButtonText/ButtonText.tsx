import { Image } from 'components/image'
import { Text } from 'components/text'
import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ButtonTextProps } from './ButtonText.props'

export function ButtonText(props: ButtonTextProps) {
  const {
    leftAsset,
    rightAsset,
    style,
    text,
    textPresets,
    textStyle,
    tx,
    onPress,
  } = props

  const mergedTextStyle = [styles.TEXT, textStyle && textStyle]

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.BUTTON, styles.CONTAINER, style && style]}>
      <View style={styles.CONTENT}>
        {leftAsset && <Image asset={leftAsset} />}
        <Text
          style={mergedTextStyle}
          preset={textPresets}
          text={text}
          tx={tx}
        />
        {rightAsset && <Image asset={rightAsset} />}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  BUTTON: {
    flex: 1,
    alignSelf: 'stretch',
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
})
