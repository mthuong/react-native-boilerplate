import React from 'react'
import { ScrollView, StyleSheet, ViewStyle } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { getProperty } from 'common/func'
import { Text } from 'components/Text'
import { useTheme } from 'theme'

import { ColorKey } from './colors'

storiesOf('theme/colors', module)
  .addDecorator(story => <ScrollView>{story()}</ScrollView>)
  .add('LightTheme', () => {
    const theme = useTheme()
    const { colors } = theme
    const keys = Object.keys(colors) as ColorKey[]
    return keys.map(key => {
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
