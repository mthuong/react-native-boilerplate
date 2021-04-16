import * as React from 'react'
import { TextInput as Input } from 'react-native-paper'
// eslint-disable-next-line import/no-unresolved
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput'
import { StyleSheet } from 'react-native'
import { Text } from 'components/text'

// @ts-ignore
export interface InputProps extends TextInputProps {
  theme?: ReactNativePaper.Theme

  // Error string will display under text field. If error is not empty, it will activate error style on input field
  error?: string
}

export function TextInput(props: InputProps) {
  const { error, ...rest } = props
  return (
    <>
      <Input mode='flat' style={styles.input} {...rest} error={!!error} />
      {!!error && <Text preset='error'>{error}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ffffff',
  },
})
