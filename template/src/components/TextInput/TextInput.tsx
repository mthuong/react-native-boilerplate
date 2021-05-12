import * as React from 'react'
import {
  StyleSheet,
  TextInputProps,
  TextInput as Input,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { Text } from 'components/text'
import { Separator } from 'components/modal-picker/components/separator'

export interface InputProps extends TextInputProps {
  /**
   * The text to use for the floating label.
   */
  label?: string

  // Error string will display under text field. If error is not empty, it will activate error style on input field
  error?: string

  // Container view style
  containerStyles?: StyleProp<ViewStyle>
}

export function TextInput(props: InputProps) {
  const { error, label, containerStyles, ...rest } = props
  const errorStyle = error ? styles.error : {}
  return (
    <View style={[styles.container, containerStyles]}>
      {!!label && (
        <Text preset='label' size='xs'>
          {label}
        </Text>
      )}
      <Input style={styles.input} {...rest} />
      <Separator style={errorStyle} />
      {!!error && <Text preset='error'>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
  },
  input: {
    height: 36,
    fontSize: 18,
  },
  error: {
    backgroundColor: '#FE3B2F',
  },
})
