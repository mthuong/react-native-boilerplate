import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, Keyboard } from 'react-native'
import { RootStackParamList } from '../../navigator/Navigator'
import { signIn } from '../../stores/authReducer'
import { useAppDispatch } from '../../stores/hook'
import { NAV_SCREENS } from '../../navigator/RouteNames'
import { TextInput, Button } from 'react-native-paper'
import { ButtonText } from 'components/ButtonText'
import { SignUpParams } from './SignUp/SignUp'
import { navigate } from 'navigator/RootNavigation'

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

function SignIn(props: Props) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const dispatch = useAppDispatch()

  return (
    <View>
      <TextInput label='Username' value={username} onChangeText={setUsername} />
      <TextInput
        label='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <ButtonText
        textPresets='bold'
        text='Sign up'
        onPress={() => {
          navigate(NAV_SCREENS.SignUp)
        }}
      />
      <ButtonText
        textPresets='light'
        text='Sign in'
        onPress={() => {
          Keyboard.dismiss()
          dispatch(signIn({ username, password }))
        }}
      />
    </View>
  )
}

export default SignIn
