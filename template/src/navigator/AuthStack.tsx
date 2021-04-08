import { useLocalizationContext } from 'languages'
import React from 'react'
import { SignUpParams } from 'scenes/Authentication/SignUp/SignUp'
import SignIn, { SignInParams } from '../scenes/Authentication/SignIn'
import SignUp from '../scenes/Authentication/SignUp'
import { MainStack } from './Navigator'

export type AuthStackTypes = SignInParams | SignUpParams

function AuthStack() {
  const languages = useLocalizationContext()

  return (
    <>
      <MainStack.Screen
        {...SignIn.screen}
        options={{ ...SignIn.defaultOptions, title: languages.SignIn }}
      />
      <MainStack.Screen
        {...SignUp.screen}
        options={{ ...SignUp.defaultOptions, title: languages.SignUp }}
      />
    </>
  )
}

export { AuthStack }
