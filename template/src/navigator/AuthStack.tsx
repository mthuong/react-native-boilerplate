import React from 'react'
import SignIn from '../scenes/Authentication/SignIn'
import { MainStack } from './Navigator'
import { NAV_SCREENS } from './RouteNames'
import SignUp from '../scenes/Authentication/SignUp'

function AuthStack() {
  return (
    <>
      <MainStack.Screen
        name={NAV_SCREENS.SignIn}
        component={SignIn}
        options={{ title: 'Sign In' }}
      />
      <MainStack.Screen
        name={NAV_SCREENS.SignUp}
        component={SignUp}
        options={{
          title: 'Sign Up',
        }}
      />
    </>
  )
}

export { AuthStack }
