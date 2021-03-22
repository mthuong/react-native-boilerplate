/**
 * Navigator
 */
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { navigationRef, isReadyRef } from './RootNavigation'
import { SignInParams } from '../scenes/Authentication/SignInScreen'
import { DetailsScreenParams } from '../scenes/Details'
import { HomeScreenParams } from '../scenes/Home'
import { useAppSelector } from '../stores/hook'
import AuthStack from './AuthStack'
import HomeStack from './HomeStack'
import { NAV_SCREENS } from './RouteNames'

export type RootStackParamList = {
  [NAV_SCREENS.Home]: HomeScreenParams | undefined
  [NAV_SCREENS.Details]: DetailsScreenParams | undefined
  [NAV_SCREENS.SignIn]: SignInParams | undefined
}

// Update the param types when you have more screen params
export type RootStackParamTypes =
  | HomeScreenParams
  | DetailsScreenParams
  | SignInParams
  | undefined

export const MainStack = createStackNavigator<RootStackParamList>()

function Navigator() {
  const useToken = useAppSelector((state) => state.authReducer.userToken)
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // @ts-ignore
        isReadyRef.current = true
      }}>
      <MainStack.Navigator>
        {useToken == null ? AuthStack() : HomeStack()}
      </MainStack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
