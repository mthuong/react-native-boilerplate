/**
 * Navigator
 */
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { navigationRef, isReadyRef } from './RootNavigation'
import { SignInParams } from '../scenes/Authentication/SignInScreen'
import { DetailsScreenParams } from '../scenes/Details'
import { HomeScreenParams } from '../scenes/Home'
import { useAppSelector, useAppDispatch } from '../stores/hook'
import { authReducer } from '../stores/authReducer'
import { NAV_SCREENS } from './RouteNames'
import { AuthStack } from './AuthStack'
import { HomeStack } from './HomeStack'

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

  const dispatch = useAppDispatch()

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      dispatch(
        authReducer.actions.signIn({
          username: user.email || '',
        })
      )
    } else {
      dispatch(authReducer.actions.signOut())
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

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

export { Navigator }
