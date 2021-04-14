import { ButtonText } from 'components/ButtonText'
import { Image } from 'components/image'
import { Text } from 'components/text'
import { useLocalizationContext } from 'localization'
import { RootStackParamList } from 'navigator/Navigator'
import { navigate } from 'navigator/RootNavigation'
import { registerScreen } from 'navigator/RouteGeneric'
import { NAV_SCREENS } from 'navigator/RouteNames'
import React from 'react'
import { Dimensions, Keyboard, View, ScrollView } from 'react-native'
import { ScaledSheet } from 'rn-scaled-sheet'
import { authAsyncActions } from 'stores/authReducer'
import { useAppDispatch } from 'stores/hook'
import { theme } from 'theme'
import { Formik } from 'formik'
import { ISignIn } from 'services'
import * as yup from 'yup'
import regex from 'common/regex'
import { injectValue } from 'common/func'
import { TextInput } from 'components/TextInput'
import { TouchableOpacity } from 'react-native-gesture-handler'

export type SignInParams = undefined

const FieldNames = {
  email: 'email',
  password: 'password',
}

function _SignIn() {
  const dispatch = useAppDispatch()
  const languages = useLocalizationContext()

  const initialValues: ISignIn = {
    email: '',
    password: '',
  }

  const signInSchema = yup.object().shape({
    email: yup
      .string()
      .email(languages.ErrorInvalidEmail)
      .required(languages.ErrorRequiredEmail),
    password: yup
      .string()
      .required(languages.ErrorRequiredPassword)
      .matches(
        regex.passwordPattern,
        injectValue(languages.ErrorInvalidPassword, 8)
      )
      .min(8, injectValue(languages.ErrorInvalidPassword, 8)),
  })

  const onSignIn = async (values: ISignIn) => {
    Keyboard.dismiss()
    dispatch(authAsyncActions.signIn(values))
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        url='https://image.freepik.com/free-vector/abstract-colorful-floral-shape-with-logo_1035-8982.jpg'
        style={styles.logo}
        containerStyle={styles.logoView}
      />
      <Text text={languages.SignIn} preset='bold' />
      <Text text={languages.SignInSubTitle} preset='header' />
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={onSignIn}>
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.form}>
            <TextInput
              label={languages.Email}
              keyboardType='default'
              autoCapitalize='words'
              onChangeText={handleChange(FieldNames.email)}
              onBlur={handleBlur(FieldNames.email)}
              value={values.email}
              error={errors.email}
              clearButtonMode='while-editing'
            />
            <TextInput
              secureTextEntry
              label={languages.Password}
              maxLength={100}
              onChangeText={handleChange(FieldNames.password)}
              onBlur={handleBlur(FieldNames.password)}
              value={values.password}
              error={errors.password}
            />
            <ButtonText
              preset='primary'
              textPresets='bold'
              text={languages.SignIn}
              onPress={handleSubmit}
              style={styles.buttonSignIn}
            />
          </View>
        )}
      </Formik>
      <View style={styles.spacingView}>
        <Text>{languages.DontHaveAccount}</Text>
        <TouchableOpacity
          onPress={() => {
            navigate(NAV_SCREENS.SignUp)
          }}>
          <Text style={styles.textSignUp} text={languages.SignUp} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const SignIn = registerScreen<RootStackParamList, NAV_SCREENS.SignIn>(
  NAV_SCREENS.SignIn,
  _SignIn
)

export default SignIn

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: theme.spacing[5],
    backgroundColor: theme.colors.background,
  },
  logoView: {
    paddingTop: theme.spacing[6],
  },
  logo: {
    alignSelf: 'center',
    aspectRatio: 1,
    height: Dimensions.get('window').height * 0.2,
  },
  form: {
    marginTop: theme.spacing[5],
  },
  spacingView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-end',
    bottom: theme.spacing[7],
  },
  buttonSignIn: {
    marginTop: theme.spacing[5],
  },
  textSignUp: {
    color: theme.colors.primaryButton,
  },
})
