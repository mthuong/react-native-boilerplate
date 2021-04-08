import React from 'react'
import SignIn, { SignInParams } from '../scenes/Authentication/SignIn'
import { MainStack, RootStackParamList } from './Navigator'
import { NAV_SCREENS } from './RouteNames'
import SignUp from '../scenes/Authentication/SignUp'
import { useLocalizationContext } from 'languages'
import { SignUpParams } from 'scenes/Authentication/SignUp/SignUp'

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
