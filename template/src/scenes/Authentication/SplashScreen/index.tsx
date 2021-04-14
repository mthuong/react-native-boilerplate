import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { Text } from 'components/text'

interface Props {
  text?: string
}

function SplashScreen(props: Props) {
  const { text } = props
  return (
    <View style={styles.container}>
      <ActivityIndicator animating />
      <Text text={text} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
})
