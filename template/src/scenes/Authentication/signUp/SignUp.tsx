import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ButtonText } from 'components/ButtonText'
import { useLocalizationContext } from 'languages'
import { strings } from 'languages/strings'
import { navigate } from 'navigator/RootNavigation'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInput } from '../../../components/TextInput'
import { RootStackParamList } from '../../../navigator/Navigator'
import { NAV_SCREENS } from '../../../navigator/RouteNames'
import colors from '../../../theme/colors'
import { registerScreen } from 'navigator/RouteGeneric'

type SignUpNavigationProp = StackNavigationProp<
  RootStackParamList,
  NAV_SCREENS.SignUp
>
type SignUpRoute = RouteProp<RootStackParamList, NAV_SCREENS.SignUp>

export type SignUpParams = {
  title: string
}

interface Props {
  // navigation: SignUpNavigationProp
  // route: SignUpRoute
}

function SignUp(props: Props) {
  const onPressRegister = async () => {
    // const { navigation } = props
    // const success = await userStore.signUp()
    // if (success) {
    //   navigation!.navigate('Home')
    // }

    navigate(NAV_SCREENS.Home)
  }

  const languages = useLocalizationContext()

  return (
    <KeyboardAwareScrollView style={styles.CONTAINER}>
      <View style={styles.inner}>
        <TextInput
          placeholder={languages.Name}
          keyboardType='default'
          autoCapitalize='words'
          maxLength={50}
          onChangeText={(value) => {
            // registerUser.displayName = value
          }}
          value=''
        />

        <TextInput
          label={languages.Email}
          keyboardType='email-address'
          autoCapitalize='none'
          maxLength={100}
          onChangeText={(value) => {
            // registerUser.email = value
          }}
          // value={registerUser.email}
        />

        <TextInput
          label={languages.Phone}
          style={styles.PHONE_TEXT_FIELD}
          keyboardType='phone-pad'
          maxLength={13}
          onChangeText={(value) => {
            // registerUser.phone = value
          }}
          // value={registerUser.phone}
        />

        <TextInput
          secureTextEntry
          label={languages.Password}
          maxLength={100}
          onChangeText={(value) => {
            // registerUser.password = value
          }}
          // value={registerUser.password}
          // error={errorSignUp.errorPassword}
        />

        <TextInput
          secureTextEntry
          label={languages.ConfirmPassword}
          maxLength={100}
          // value={registerUser.confirmationPassword}
          // error={errorSignUp.errorConfirmationPassword}
        />

        <ButtonText
          text={languages.SignUp}
          style={styles.BUTTON}
          textPresets='bold'
          textStyle={styles.BUTTON_TEXT}
          onPress={onPressRegister}
        />
      </View>
    </KeyboardAwareScrollView>
  )
}

const defaultOptions: SignUpParams = {
  title: strings.SignUp,
}

export default registerScreen<RootStackParamList, NAV_SCREENS.SignUp>(
  NAV_SCREENS.SignUp,
  SignUp,
  defaultOptions
)

const styles = StyleSheet.create({
  CONTAINER: {
    flex: 1,
    backgroundColor: colors.background,
  },

  inner: {},

  avatar: { alignSelf: 'center' },

  IMAGE_WRAPPER: {
    marginTop: 46,
    alignSelf: 'center',
    marginBottom: 20,
  },

  IMAGE: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    tintColor: colors.primary,
    resizeMode: 'cover',
  },

  PHONE_TEXT_FIELD: {},

  BUTTON: {
    height: 46,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginVertical: 20,
  },

  BUTTON_TEXT: {
    color: 'white',
  },

  ICON_PLUS: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    tintColor: colors.primary,
  },

  ERROR_PHONE: {
    marginTop: 5,
  },

  PHONE_BIGGER_WRAPPER: {
    flex: 1,
  },
})
