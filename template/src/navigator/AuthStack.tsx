import React from 'react'
import { useLocalizationContext } from 'languages'
import { MainStack } from './Navigator'
import SignIn, { SignInParams } from 'scenes/Authentication/SignIn'
import SignUp, { SignUpParams } from 'scenes/Authentication/SignUp'

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
        options={{
          ...SignUp.defaultOptions,
          title: languages.SignUp,
        }}
      />
    </>
  )
}

export { AuthStack }
