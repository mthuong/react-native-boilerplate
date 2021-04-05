import { ViewStyle, TextStyle } from 'react-native'
import { TextPresets } from 'components/text';
import { ImageAssetTypes } from 'theme';


export interface ButtonTextProps {
  // Container style.
  style?: ViewStyle | ViewStyle[]

  // Text which is look up via i18n
  tx?: string

  // Text to display if not using tx.
  text?: string

  // Optional text style.
  textStyle?: TextStyle | TextStyle[]

  // One of different types of text presets.
  textPresets?: TextPresets

  // Left icon
  leftAsset?: ImageAssetTypes

  // Right icon.
  rightAsset?: ImageAssetTypes

  // Event on press button
  onPress?(): void
}
