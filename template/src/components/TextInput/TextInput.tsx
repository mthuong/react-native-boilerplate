import * as React from 'react'
import { TextInput as Input } from 'react-native-paper'
// eslint-disable-next-line import/no-unresolved
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput'
import { theme } from 'theme'
import { StyleSheet } from 'react-native'

// @ts-ignore
export interface InputProps extends TextInputProps {
  theme?: ReactNativePaper.Theme
}

export function TextInput(props: InputProps) {
  return <Input theme={theme} mode='flat' style={styles.input} {...props} />
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.background,
  },
})
