/**
 * Navigator
 */
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useLocalizationContext } from 'localization'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import SignIn, { SignInParams } from 'scenes/Authentication/SignIn'
import SignUp, { SignUpParams } from 'scenes/Authentication/SignUp'
import SplashScreen from 'scenes/Authentication/SplashScreen'
import { ReduxState } from 'stores/types'
import { DetailsScreen, DetailsScreenParams } from '../scenes/Details'
import { HomeScreen, HomeScreenParams } from '../scenes/Home'
import { authAsyncActions, authSlice } from '../stores/authReducer'
import { useAppDispatch, useAppSelector } from '../stores/hook'
import { navigationRef, navigationState } from './RootNavigation'
import { NAV_SCREENS } from './RouteNames'

export type RootStackParamList = {
  [NAV_SCREENS.Splash]: undefined

  [NAV_SCREENS.Home]: HomeScreenParams
  [NAV_SCREENS.Details]: DetailsScreenParams

  [NAV_SCREENS.SignIn]: SignInParams
  [NAV_SCREENS.SignUp]: SignUpParams
}

// Update the param types when you have more screen params
export type RootStackParamTypes =
  | SignInParams
  | SignInParams
  | HomeScreenParams
  | DetailsScreenParams

export const MainStack = createStackNavigator<RootStackParamList>()

type NavigationProps = ReturnType<typeof mapStateToProps>

function Navigator(props: NavigationProps) {
  const useToken = useAppSelector((state) => state.auth.user)
  // const isLoading = useAppSelector((state) => state.auth.isLoading)
  const { isLoading } = props
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
          <MainStack.Navigator screenOptions={{ headerShown: false }}>
            {!useToken ? (
              <>
                <MainStack.Screen
                  {...SignIn.screen}
                  options={{
                    ...SignIn.defaultOptions,
                    title: localization.SignIn,
                  }}
                />
                <MainStack.Screen
                  {...SignUp.screen}
                  options={{
                    ...SignUp.defaultOptions,
                    title: localization.SignUp,
                  }}
                />
              </>
            ) : (
              <>
                <MainStack.Screen
                  name={NAV_SCREENS.Home}
                  component={HomeScreen}
                  options={{ title: localization.Home }}
                />
                <MainStack.Screen
                  name={NAV_SCREENS.Details}
                  component={DetailsScreen}
                  options={{ title: 'My details' }}
                />
              </>
            )}
          </MainStack.Navigator>
        </NavigationContainer>
      )}
    </View>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  isLoading: state.auth.isLoading,
})

export default connect(mapStateToProps)(Navigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
