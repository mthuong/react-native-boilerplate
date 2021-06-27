import { ImageStyle, ViewStyle } from 'react-native'
import { ImageAssetTypes } from 'theme/images'

export interface ButtonImageProps {
  /**
   * Children components
   *
   * @type {React.ReactNode}
   * @memberof TextProps
   */
  children?: React.ReactNode

  // Container style.
  style?: ViewStyle

  // Image style
  imageStyle?: ImageStyle

  // Name of icon
  asset?: ImageAssetTypes

  // Image url
  url?: string

  // On press callback
  onPress?(): void
}
