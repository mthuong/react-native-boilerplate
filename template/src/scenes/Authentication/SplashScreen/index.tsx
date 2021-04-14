import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { useLocalizationContext } from 'languages'
import { Text } from 'components/text'

function SplashScreen() {
  const languages = useLocalizationContext()
  return (
    <View style={styles.container}>
      <ActivityIndicator animating />
      <Text text={languages.Name} />
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
