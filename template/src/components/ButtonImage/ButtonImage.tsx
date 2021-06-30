import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'components/image'

import { ButtonImageProps } from './ButtonImage.props'

export function ButtonImage(props: ButtonImageProps) {
  const { asset, url, imageStyle, style, onPress, children } = props
  return (
    <TouchableOpacity
      style={[styles.CONTAINER, style && style]}
      onPress={onPress}>
      {isValidUrl(url) ? (
        <Image style={imageStyle} url={url} />
      ) : (
        <Image style={imageStyle} asset={asset} />
      )}
      {children}
    </TouchableOpacity>
  )
}

function isValidUrl(input?: string): boolean {
  const tokens = ['https://', 'http://', 'file://', 'content://']
  if (input && typeof input === 'string') {
    return tokens.filter(item => input.indexOf(item) > -1).length > 0
  }
  return false
}

const styles = StyleSheet.create({
  CONTAINER: {
    alignSelf: 'stretch',
    minHeight: 44,
    minWidth: 44,
    alignContent: 'center',
    justifyContent: 'center',
  },
})
