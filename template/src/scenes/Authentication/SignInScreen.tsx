import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Button, TextInput, View } from 'react-native'
import { RootStackParamList } from '../../navigator/Navigator'
import { authReducer } from '../../stores/authReducer'
import { useAppDispatch } from '../../stores/hook'
import { NAV_SCREENS } from '../../navigator/RouteNames'

type SignInNavigationProp = StackNavigationProp<
  RootStackParamList,
  NAV_SCREENS.SignIn
>
type SignInRoute = RouteProp<RootStackParamList, NAV_SCREENS.SignIn>

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
