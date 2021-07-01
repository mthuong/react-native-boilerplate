import { TextStyle, ViewStyle } from 'react-native'
import { TextPresets } from 'components/Text'
import { ImageAssetTypes } from 'theme/images'

export interface ButtonTextProps {
  // Container style.
  style?: ViewStyle | ViewStyle[]

  // Text to display
  text?: string

  // Optional text style.
  textStyle?: TextStyle | TextStyle[]

  // One of different types of text presets.
  textPresets?: TextPresets

  // Left icon
  leftAsset?: ImageAssetTypes

  // Right icon.
  rightAsset?: ImageAssetTypes

  // One of different types of button presets
  preset?: 'primary' | 'secondary' | 'flat'

  // Event on press button
  onPress?(): void
}
