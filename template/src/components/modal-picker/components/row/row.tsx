import * as React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

export interface RowProps {
  style?: StyleProp<ViewStyle>
}

export function Row(props: React.PropsWithChildren<RowProps>) {
  const { style } = props
  return <View style={[ROW, style]}>{props.children}</View>
}

const ROW: ViewStyle = {
  flexDirection: 'row',
}
