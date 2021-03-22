import React from 'react'
import { View, TextInput, Button } from 'react-native'

import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigator/Navigator'
import { RouteProp } from '@react-navigation/native'
import { useAppSelector, useAppDispatch } from '../../stores/hook'
import { authReducer } from '../../stores/authReducer'

type SignInNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>
type SignInRoute = RouteProp<RootStackParamList, 'SignIn'>

export type SignInParams = {}

type Props = {
  navigation: SignInNavigationProp
  route: SignInRoute
}

function SignInScreen(props: Props) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const dispatch = useAppDispatch()

  return (
    <View>
      <TextInput
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title='Sign in'
        onPress={() => {
          // signIn({ username, password })
          dispatch(
            authReducer.actions.signIn({
              username,
              password,
              isRememberMe: true,
            })
          )
        }}
      />
    </View>
  )
}

export default SignInScreen
