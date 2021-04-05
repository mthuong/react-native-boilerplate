import * as React from 'react'
import {
  Text as ReactNativeText,
  TextProperties,
  StyleProp,
  TextStyle,
  StyleSheet,
} from 'react-native'
import fonts from '../../theme/fonts'
import colors from '../../theme/colors'
import fontSizes from '../../theme/fonts/sizes'

export interface TextProps extends TextProperties {
  /**
   * Children components
   *
   * @type {React.ReactNode}
   * @memberof TextProps
   */
  children?: React.ReactNode

  /**
   * Text which is look up via i18n
   *
   * @type {string}
   * @memberof TextProps
   */
  tx?: string

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
}

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    preset = 'default',
    tx,
    text,
    children,
    style: styleOverride,
    ...rest
  } = props

  // figure out which content to use
  // const i18nText = tx && translate(tx)
  const content = text || children // || i18nText

  const style = [presets[preset] || presets.default, styleOverride]

  return (
    <ReactNativeText {...rest} style={style}>
      {content}
    </ReactNativeText>
  )
}

const styles = StyleSheet.create({
  /**
   * All text will start off looking like this.
   */
  BASE: {
    ...fonts.regular,
    color: colors.text,
    fontSize: fontSizes.small,
  },
})

// All style here
export const presets = {
  default: styles.BASE,
  bold: { ...styles.BASE, ...fonts.bold } as TextStyle,
  header: { ...styles.BASE } as TextStyle,
  light: { ...styles.BASE, ...fonts.light } as TextStyle,
  error: { ...styles.BASE, color: colors.error },
}

export type TextPresets = keyof typeof presets
