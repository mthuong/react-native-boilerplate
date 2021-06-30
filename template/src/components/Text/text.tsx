import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text as ReactNativeText,
  TextProps,
  TextStyle,
} from 'react-native'
import fonts from 'theme/fonts'
import fontSizes from 'theme/fonts/sizes'

export interface ITextProps extends TextProps {
  /**
   * Children components.
   *
   * @type {React.ReactNode}
   * @memberof TextProps
   */
  children?: React.ReactNode

  /**
   * Text to display if not using tx or nested components.
   *
   * @type {string}
   * @memberof TextProps
   */
  text?: string

  /**
   * optional type
   *
   * @type {StyleProp<TextStyle>}
   * @memberof TextProps
   */
  style?: StyleProp<TextStyle>

  /**
   * One of different types of text presets.
   *
   * @type {TextPresets}
   * @memberof TextProps
   */
  preset?: TextPresets

  /**
   * One of text size
   *
   * @type {TextSizes}
   * @memberof TextProps
   */
  size?: TextSizes
}

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: ITextProps) {
  // grab the props
  const {
    preset = 'default',
    text,
    children,
    style: styleOverride,
    ...rest
  } = props

  const content = text || children

  const style = [presets[preset] || presets.default, styleOverride]

  return (
    <ReactNativeText {...rest} style={style}>
      {content}
    </ReactNativeText>
  )
}

Text.defaultProps = {
  size: 'sm',
}

const styles = StyleSheet.create({
  /**
   * All text will start off looking like this.
   */
  BASE: {
    ...fonts.regular,
    color: '#000000',
    fontSize: fontSizes.sm,
  },
})

// All style here
const presets = {
  default: styles.BASE,

  bold: { ...styles.BASE, ...fonts.bold } as TextStyle,
  header: {
    ...styles.BASE,
    ...fonts.bold,
    fontSize: fontSizes.lg,
  } as TextStyle,
  label: { ...styles.BASE, ...fonts.medium } as TextStyle,
  light: { ...styles.BASE, ...fonts.light } as TextStyle,
  error: { ...styles.BASE, ...fonts.light, color: '#FE3B2F' },
}

export type TextPresets = keyof typeof presets

const sizes = {
  ...fontSizes,
}

export type TextSizes = keyof typeof sizes
