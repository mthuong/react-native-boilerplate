import * as React from 'react'
import { TextInput as Input } from 'react-native-paper'
import { TextInputProps as InputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput'
import { theme } from '../../theme'

// @ts-ignore
export interface TextInputProps extends InputProps {
  theme?: ReactNativePaper.Theme
}

export function TextInput(props: TextInputProps) {
  const { ...restProps } = props

  return <Input {...restProps} theme={theme} />
}
