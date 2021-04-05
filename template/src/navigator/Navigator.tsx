/**
 * Navigator
 */
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { navigationRef, isReadyRef } from './RootNavigation'
import { SignInParams } from '../scenes/Authentication/SignIn'
import { DetailsScreenParams } from '../scenes/Details'
import { HomeScreenParams } from '../scenes/Home'
import { useAppSelector, useAppDispatch } from '../stores/hook'
import { authSlice, signIn } from '../stores/authReducer'
import { NAV_SCREENS } from './RouteNames'
import { AuthStack } from './AuthStack'
import { HomeStack } from './HomeStack'
import { SignUpParams } from '../scenes/Authentication/signUp/SignUp'

export type RootStackParamList = {
  [NAV_SCREENS.Home]: HomeScreenParams | undefined
  [NAV_SCREENS.Details]: DetailsScreenParams | undefined
  [NAV_SCREENS.SignIn]: SignInParams | undefined
  [NAV_SCREENS.SignUp]: SignUpParams | undefined
}

// Update the param types when you have more screen params
export type RootStackParamTypes =
  | HomeScreenParams
  | DetailsScreenParams
  | SignInParams
  | SignUpParams
  | undefined

export const MainStack = createStackNavigator<RootStackParamList>()

function Navigator() {
  const useToken = useAppSelector((state) => state.auth.userToken)

  const dispatch = useAppDispatch()

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      dispatch(
        signIn({
          username: user.email || '',
        })
      )
    } else {
      dispatch(authSlice.actions.signOut())
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
