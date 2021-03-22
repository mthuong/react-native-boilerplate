import React from 'react'
import SignInScreen from '../scenes/Authentication/SignInScreen'
import { MainStack } from './Navigator'
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

export { AuthStack }
