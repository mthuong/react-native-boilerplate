import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigator/Navigator'
import { RouteProp } from '@react-navigation/native'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
type HomeScreenRoute = RouteProp<RootStackParamList, 'Home'>

type Props = {
  navigation: HomeScreenNavigationProp
  route: HomeScreenRoute
}

export function HomeScreen(props: Props) {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title='Go to Details'
        onPress={() => navigation.navigate('Details', { userId: 'hehe' })}
      />
    </View>
  )
}

export type HomeScreenParams = {}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})
