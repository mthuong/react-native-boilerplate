import * as React from 'react'
import { Text, View } from 'react-native'

export interface ErrorViewProps {
  error?: string
}

export function ErrorView(props: ErrorViewProps) {
  const { error } = props
  if (!error) {
    return null
  }
  return (
    <View>
      <Text>{error ?? 'Error'}</Text>
    </View>
  )
}
