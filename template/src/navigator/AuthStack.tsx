import { MainStack } from './Navigator'
import SignInScreen from '../scenes/Authentication/SignInScreen'
import React from 'react'

function AuthStack() {
  return (
    <>
      <MainStack.Screen
        name='SignIn'
        component={SignInScreen}
        options={{ title: 'Sign In' }}
      />
    </>
  )
}

export default AuthStack
