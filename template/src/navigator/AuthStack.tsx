import React from 'react'
import SignIn, { SignInParams } from 'scenes/Authentication/SignIn'
import SignUp, { SignUpParams } from 'scenes/Authentication/SignUp'
import { MainStack } from './Navigator'
import { LocalizationContextType } from 'languages'

export type AuthStackTypes = SignInParams | SignUpParams

function AuthStack(context: LocalizationContextType) {
  const languages = context

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
