import * as React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { TextInputProps as InputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput'
import { theme } from '../../theme'

// @ts-ignore
export interface TextInputProps extends InputProps {
  containerStyle?: StyleProp<ViewStyle>

  theme?: ReactNativePaper.Theme
}

export function TextInput(props: TextInputProps) {
  const { containerStyle, ...restProps } = props

  return <Input {...restProps} theme={theme} />
}
