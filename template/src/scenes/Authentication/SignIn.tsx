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
import { useLocalizationContext } from 'languages'

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
  const languages = useLocalizationContext()

  return (
    <View>
      <TextInput
        label={languages.Username}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        label={languages.Password}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <ButtonText
        textPresets='bold'
        text={languages.SignUp}
        onPress={() => {
          navigate(NAV_SCREENS.SignUp)
        }}
      />
      <ButtonText
        textPresets='light'
        text={languages.SignIn}
        onPress={() => {
          Keyboard.dismiss()
          dispatch(signIn({ username, password }))
        }}
      />
    </View>
  )
}

export default SignIn
