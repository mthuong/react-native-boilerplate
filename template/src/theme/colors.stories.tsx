import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { ViewStyle, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'components/Text'
import { useTheme } from 'theme'
import { getProperty } from 'common/func'
import { ColorKey } from './colors'

storiesOf('theme/colors', module)
  .addDecorator((story) => <ScrollView>{story()}</ScrollView>)
  .add('LightTheme', () => {
    const theme = useTheme()
    const { colors } = theme
    const keys = Object.keys(colors) as ColorKey[]
    return keys.map((key) => {
      const style: ViewStyle = { backgroundColor: getProperty(colors, key) }

      return (
        <Text key={key} style={[styles.container, style]}>
          {key}
        </Text>
      )
    })
  })

const styles = StyleSheet.create({
  container: {
    height: 40,
    textAlign: 'center',
    color: 'purple',
  },
})
