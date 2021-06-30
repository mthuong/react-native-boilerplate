import * as React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import FastImage, { Source } from 'react-native-fast-image'
import fonts from 'theme/fonts'

export interface ButtonIconProps {
  style?: StyleProp<ViewStyle>
  image?: ImageSourcePropType
  imageUrl?: Source
  imageStyle?: StyleProp<ImageStyle>
  imageColor?: string
  textStyle?: TextStyle
  text?: string
  disabled?: boolean
  onPress?(): void
}

const ButtonImage: React.SFC<ButtonIconProps> = props => {
  const {
    style,
    image,
    // imageColor,
    imageStyle,
    textStyle,
    text,
    onPress,
    children,
    imageUrl,
    disabled,
    ...others
  } = props
  const renderText = text ? (
    <Text style={[styles.textStyle, textStyle]}>{text}</Text>
  ) : null
  return (
    <TouchableOpacity
      {...others}
      style={[styles.button, style]}
      onPress={disabled ? () => undefined : onPress}>
      {image ? (
        <Image source={image} style={[styles.image, imageStyle]} />
      ) : null}
      {imageUrl ? (
        <FastImage source={imageUrl} style={[styles.image, imageStyle]} />
      ) : null}
      {renderText}
      {children}
    </TouchableOpacity>
  )
}

ButtonImage.defaultProps = {
  image: '',
} as Partial<ButtonIconProps>

export { ButtonImage }

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#000000',
    fontSize: 12,
    textAlign: 'center',
    ...fonts.regular,
  },
  image: {},
})
