/**
 * Navigator
 */
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { SignInParams } from '../scenes/Authentication/SignInScreen'
import { DetailsScreenParams } from '../scenes/Details'
import { HomeScreenParams } from '../scenes/Home'
import { useAppSelector } from '../stores/hook'
import AuthStack from './AuthStack'
import HomeStack from './HomeStack'

export type RootStackParamList = {
  Home: HomeScreenParams | undefined
  Details: DetailsScreenParams | undefined
  SignIn: SignInParams | undefined
}

export const MainStack = createStackNavigator<RootStackParamList>()

function Navigator() {
  const useToken = useAppSelector((state) => state.authReducer.userToken)
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        {useToken == null ? AuthStack() : HomeStack()}
      </MainStack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
