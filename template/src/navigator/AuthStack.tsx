import { MainStack } from './Navigator'
import SignInScreen from '../scenes/Authentication/SignInScreen'
import React from 'react'
import { NAV_SCREENS } from './RouteNames'

function AuthStack() {
  return (
    <>
      <MainStack.Screen
        name={NAV_SCREENS.SignIn}
        component={SignInScreen}
        options={{ title: 'Sign In' }}
      />
    </>
  )
}

export default AuthStack
