/**
 * Navigator
 */
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { SignInParams } from 'scenes/Authentication/SignIn'
import { SignUpParams } from 'scenes/Authentication/SignUp'
import SplashScreen from 'scenes/Authentication/SplashScreen'
import { DetailsScreenParams } from '../scenes/Details'
import { HomeScreenParams } from '../scenes/Home'
import { authAsyncActions, authSlice } from '../stores/authReducer'
import { useAppDispatch, useAppSelector } from '../stores/hook'
import { AuthStack, AuthStackTypes } from './AuthStack'
import { HomeStack, HomeStackParamTypes } from './HomeStack'
import { isReadyRef, navigationRef } from './RootNavigation'
import { NAV_SCREENS } from './RouteNames'

export type RootStackParamList = {
  [NAV_SCREENS.Splash]: undefined

  [NAV_SCREENS.Home]: HomeScreenParams
  [NAV_SCREENS.Details]: DetailsScreenParams

  [NAV_SCREENS.SignIn]: SignInParams
  [NAV_SCREENS.SignUp]: SignUpParams
}

// Update the param types when you have more screen params
export type RootStackParamTypes = HomeStackParamTypes | AuthStackTypes

export const MainStack = createStackNavigator<RootStackParamList>()

function Navigator() {
  const useToken = useAppSelector((state) => state.auth.user)
  const isLoading = useAppSelector((state) => state.auth.isLoading)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    // Handle user state changes
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
      if (user) {
        // Save user info into store
        dispatch(authAsyncActions.getUser(user.uid))
      } else {
        dispatch(authSlice.actions.finishLoading())
      }
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [dispatch])

  const screens = () => {
    if (isLoading) {
      return (
        <MainStack.Screen name={NAV_SCREENS.Splash} component={SplashScreen} />
      )
    }
    if (!useToken) {
      return AuthStack()
    }
    return HomeStack()
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        isReadyRef.current = true
      }}>
      <MainStack.Navigator>{screens()}</MainStack.Navigator>
    </NavigationContainer>
  )
}

export { Navigator }
