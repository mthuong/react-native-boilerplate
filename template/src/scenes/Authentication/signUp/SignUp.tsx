import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ButtonText } from 'components/ButtonText'
import { Image } from 'components/image'
import { Text } from 'components/text'
import { useLocalizationContext } from 'languages'
import { strings } from 'languages/strings'
import { navigate } from 'navigator/RootNavigation'
import { registerScreen } from 'navigator/RouteGeneric'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { theme } from 'theme'
import { TextInput } from '../../../components/TextInput'
import { RootStackParamList } from '../../../navigator/Navigator'
import { NAV_SCREENS } from '../../../navigator/RouteNames'

type SignUpNavigationProp = StackNavigationProp<
  RootStackParamList,
  NAV_SCREENS.SignUp
>
type SignUpRoute = RouteProp<RootStackParamList, NAV_SCREENS.SignUp>

export type SignUpParams = {
  title: string
  headerShown?: boolean
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
        <Image
          url='https://image.freepik.com/free-vector/abstract-colorful-floral-shape-with-logo_1035-8982.jpg'
          style={styles.logo}
          containerStyle={styles.logoView}
        />
        <Text text={languages.SignUp} preset='bold' style={styles.title} />
        <Text text={languages.SignUpSubTitle} preset='header' />

        <View style={styles.form}>
          <TextInput
            label={languages.Name}
            keyboardType='default'
            autoCapitalize='words'
            maxLength={50}
            // onChangeText={(value) => {
            // registerUser.displayName = value
            // }}
            // value=''
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
            style={styles.buttonSignUp}
            textPresets='bold'
            textStyle={styles.buttonText}
            onPress={onPressRegister}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const defaultOptions: SignUpParams = {
  title: strings.SignUp,
  headerShown: false,
}

export default registerScreen<RootStackParamList, NAV_SCREENS.SignUp>(
  NAV_SCREENS.SignUp,
  SignUp,
  defaultOptions
)

const styles = StyleSheet.create({
  CONTAINER: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  inner: {
    marginHorizontal: theme.spacing[5],
  },
  logoView: {
    paddingTop: theme.spacing[6],
  },
  logo: {
    alignSelf: 'center',
    aspectRatio: 1,
    height: Dimensions.get('window').height * 0.2,
  },
  title: {},
  form: {
    marginTop: theme.spacing[5],
  },
  buttonSignUp: {
    height: 46,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    marginVertical: theme.spacing[4],
  },

  buttonText: {
    color: theme.colors.tertiaryText,
  },
})
