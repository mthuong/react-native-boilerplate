import * as React from 'react'
import {
  StyleProp,
  StyleSheet,
  TextInput as Input,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native'
import { Separator } from 'components/separator'
import { Text } from 'components/Text'

export interface InputProps extends TextInputProps {
  /**
   * The text to use for the floating label.
   */
  label?: string

  // Error string will display under text field. If error is not empty, it will activate error style on input field
  error?: string

  // Container view style
  containerStyle?: StyleProp<ViewStyle>
}

export const TextInput = React.forwardRef<any, InputProps>(
  (props, ref): React.ReactElement => {
    const { error, label, containerStyle, ...rest } = props
    const errorStyle = error ? styles.error : {}
    console.tron.log('error', error)
    return (
      <View style={[styles.container, containerStyle]}>
        {!!label && (
          <Text preset='label' size='xs'>
            {label}
          </Text>
        )}
        <Input ref={ref} style={styles.input} {...rest} />
        <Separator style={errorStyle} />
        {!!error && <Text preset='error'>{error}</Text>}
      </View>
    )
  }
)

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
