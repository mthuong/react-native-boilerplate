import { ButtonText } from 'components/ButtonText'
import { useLocalizationContext } from 'languages'
import { navigate } from 'navigator/RootNavigation'
import React from 'react'
import { Keyboard, View, ActivityIndicator, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { registerScreen } from 'navigator/RouteGeneric'
import { RootStackParamList } from 'navigator/Navigator'
import { authAsyncActions } from 'stores/authReducer'
import { useAppDispatch, useAppSelector } from 'stores/hook'
import { NAV_SCREENS } from 'navigator/RouteNames'

export type SignInParams = undefined

function _SignIn() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const dispatch = useAppDispatch()
  const languages = useLocalizationContext()

  const isLoading = useAppSelector((state) => state.auth.isLoading)

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating />
      </View>
    )
  }
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
          dispatch(authAsyncActions.signIn({ username, password }))
        }}
      />
    </View>
  )
}

const SignIn = registerScreen<RootStackParamList, NAV_SCREENS.SignIn>(
  NAV_SCREENS.SignIn,
  _SignIn
)

export default SignIn

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
})
