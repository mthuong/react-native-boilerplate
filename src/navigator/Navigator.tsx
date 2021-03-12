/**
 * Navigator
 */
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { DetailsScreen, DetailsScreenParams } from '../scenes/Details'
import { HomeScreen, HomeScreenParams } from '../scenes/Home'

export type RootStackParamList = {
  Home: HomeScreenParams | undefined
  Details: DetailsScreenParams | undefined
}

const MainStack = createStackNavigator<RootStackParamList>()

export function Navigator() {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'My home' }}
        />
        <MainStack.Screen
          name='Details'
          component={DetailsScreen}
          options={{ title: 'My details' }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  )
}
