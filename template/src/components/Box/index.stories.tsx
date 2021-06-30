import React from 'react'
import { StyleSheet, View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { Text } from 'components/Text'

import { Box } from '.'

storiesOf('components/Box', module)
  .addDecorator(story => <View>{story()}</View>)
  .add('center', () => (
    <Box center>
      <Text>center</Text>
    </Box>
  ))
  .add('full', () => (
    <Box horizontal style={styles.full}>
      <Box full style={styles.full1}></Box>
      <Box full style={styles.full2}></Box>
    </Box>
  ))
  .add('column', () => (
    <Box vertical style={styles.full}>
      <Box full style={styles.full1}></Box>
      <Box full style={styles.full2}></Box>
    </Box>
  ))
  .add('row', () => (
    <Box horizontal style={styles.full}>
      <Box full style={styles.full1}></Box>
      <Box full style={styles.full2}></Box>
    </Box>
  ))
  .add('padding', () => (
    <Box horizontal padding style={styles.full}>
      <Box full style={styles.full1}></Box>
      <Box full style={styles.full2}></Box>
    </Box>
  ))
  .add('paddingV', () => (
    <Box horizontal paddingV style={styles.full}>
      <Box full style={styles.full1}></Box>
      <Box full style={styles.full2}></Box>
    </Box>
  ))
  .add('paddingH', () => (
    <Box horizontal paddingH style={styles.full}>
      <Box full style={styles.full1}></Box>
      <Box full style={styles.full2}></Box>
    </Box>
  ))

const styles = StyleSheet.create({
  full: {
    height: 100,
    width: '100%',
    backgroundColor: '#eeeeee',
  },
  full1: {
    backgroundColor: 'green',
  },
  full2: {
    backgroundColor: 'yellow',
  },
  full3: {
    backgroundColor: 'grey',
  },
})
