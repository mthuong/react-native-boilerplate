/**
 * Navigator
 */
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useLocalizationContext } from 'localization'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { SignInParams } from 'scenes/Authentication/SignIn'
import { SignUpParams } from 'scenes/Authentication/SignUp'
import SplashScreen from 'scenes/Authentication/SplashScreen'
import { DetailsScreenParams } from '../scenes/Details'
import { HomeScreenParams } from '../scenes/Home'
import { authAsyncActions, authSlice } from '../stores/authReducer'
import { useAppDispatch, useAppSelector } from '../stores/hook'
import { AuthStackTypes, AuthStack } from './AuthStack'
import { HomeStack, HomeStackParamTypes } from './HomeStack'
import { navigationState, navigationRef } from './RootNavigation'
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

  const localization = useLocalizationContext()

  const screens = () => {
    if (!useToken) {
      return AuthStack(localization)
    }
    return HomeStack(localization)
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            navigationState.isReady = true
          }}>
          <MainStack.Navigator>{screens()}</MainStack.Navigator>
        </NavigationContainer>
      )}
    </View>
  )
}

export { Navigator }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
