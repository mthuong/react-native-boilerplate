import { ButtonText } from 'components/ButtonText'
import { useLocalizationContext } from 'languages'
import { navigate } from 'navigator/RootNavigation'
import React from 'react'
import { Keyboard, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { NAV_SCREENS } from '../../navigator/RouteNames'
import { signIn } from '../../stores/authReducer'
import { useAppDispatch } from '../../stores/hook'
import { registerScreen } from 'navigator/RouteGeneric'
import { RootStackParamList } from 'navigator/Navigator'

export type SignInParams = undefined

function SignIn() {
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
          languages.setAppLanguage('vi')
          Keyboard.dismiss()
          dispatch(signIn({ username, password }))
        }}
      />
    </View>
  )
}

export default registerScreen<RootStackParamList, NAV_SCREENS.SignIn>(
  NAV_SCREENS.SignIn,
  SignIn
)
