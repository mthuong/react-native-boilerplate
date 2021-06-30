import * as React from 'react'
import {
  ActivityIndicator,
  Image as RNImage,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import FastImage from 'react-native-fast-image'

import images, { ImageAssetTypes } from '../../theme/images'

export interface ImageProps {
  /**
   * Children components
   *
   * @type {React.ReactNode}
   * @memberof TextProps
   */
  children?: React.ReactNode

  /**
   * Style overrides for the image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the image container
   */

  containerStyle?: StyleProp<ViewStyle>

  /**
   * The name of the icon
   */
  asset?: ImageAssetTypes

  /**
   * Image url.
   */
  url?: string
}

export function Image(props: ImageProps) {
  const [isLoading, setIsLoading] = React.useState(true)

  const { style: styleOverride, asset, url, containerStyle, children } = props
  const style: StyleProp<ImageStyle> = [styles.root, styleOverride]
  if (url) {
    return (
      <View style={containerStyle}>
        <FastImage
          // @ts-ignore
          style={style}
          source={{ uri: url }}
          onLoadEnd={() => setIsLoading(false)}
        />
        {isLoading && (
          <View style={styles.indicatorView}>
            <ActivityIndicator size='small' />
          </View>
        )}
        {children}
      </View>
    )
  }

  if (asset) {
    return (
      <View style={containerStyle}>
        <RNImage style={style} source={images[asset]} />
      </View>
    )
  }
  return <View />
}

const styles = StyleSheet.create({
  root: {
    resizeMode: 'contain',
  },
  indicatorView: {
    ...StyleSheet.absoluteFillObject,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
