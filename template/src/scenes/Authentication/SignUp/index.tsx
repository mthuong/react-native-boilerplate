import { injectValue } from 'common/func'
import regex from 'common/regex'
import { ButtonText } from 'components/ButtonText'
import { Image } from 'components/image'
import { Text } from 'components/text'
import { Formik } from 'formik'
import { useLocalizationContext } from 'localization'
import { strings } from 'localization/strings'
import { registerScreen } from 'navigator/RouteGeneric'
import React from 'react'
import { Dimensions, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScaledSheet } from 'rn-scaled-sheet'
import { ISignUp } from 'services'
import { authAsyncActions } from 'stores/authReducer'
import { useAppDispatch } from 'stores/hook'
import { Theme, useTheme } from 'theme'
import * as Yup from 'yup'
import { TextInput } from '../../../components/TextInput'
import { RootStackParamList } from '../../../navigator/Navigator'
import { NAV_SCREENS } from '../../../navigator/RouteNames'
import { Container } from 'components/Container'
import { Header } from 'components/Header'

// type SignUpNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   NAV_SCREENS.SignUp
// >
// type SignUpRoute = RouteProp<RootStackParamList, NAV_SCREENS.SignUp>

export type SignUpParams = {
  title: string
}

// type Props = {
// navigation: SignUpNavigationProp
// route: SignUpRoute
// }

const FieldNames = {
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword',
  name: 'name',
}

function _SignUp() {
  const languages = useLocalizationContext()
  const dispatch = useAppDispatch()

  const theme = useTheme()
  const styles = makeStyles(theme)

  const onRegister = async (values: ISignUp) => {
    dispatch(authAsyncActions.signUp(values))
  }

  const initialValues: ISignUp = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  }

  const signUpSchema = Yup.object().shape({
    email: Yup.string()
      .email(languages.ErrorInvalidEmail)
      .required(languages.ErrorRequiredEmail),
    name: Yup.string()
      .required(languages.ErrorRequiredName)
      .min(3, ({ min }) => injectValue(languages.ErrorMinName, `${min}`))
      .max(50, ({ max }) => injectValue(languages.ErrorMaxName, `${max}`)),
    password: Yup.string()
      .required(languages.ErrorRequiredPassword)
      .matches(
        regex.passwordPattern,
        injectValue(languages.ErrorInvalidPassword, 8)
      )
      .min(8, injectValue(languages.ErrorInvalidPassword, 8)),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref(FieldNames.password)], languages.ErrorPasswordNotMatch)
      .required(languages.ErrorRequiredConfirmPassword),
  })

  return (
    <Container>
      <Header leftIcon='arrow_back_ios' backEnabled>
        {/* <TouchableOpacity full center horizontal>
          <Text f17 primary style={styles.title}>
            {props.category.name}
          </Text>
          <Icon secondary tiny name='arrow-bottom' />
        </TouchableOpacity> */}
      </Header>
      <KeyboardAwareScrollView
        style={styles.CONTAINER}
        extraScrollHeight={theme.dimensions.scrollViewExtraHeight}
        enableOnAndroid>
        <View style={styles.inner}>
          <Image
            url='https://image.freepik.com/free-vector/abstract-colorful-floral-shape-with-logo_1035-8982.jpg'
            style={styles.logo}
            containerStyle={styles.logoView}
          />
          <Text text={languages.SignUp} preset='bold' style={styles.title} />
          <Text text={languages.SignUpSubTitle} preset='header' />

          <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={onRegister}>
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={styles.form}>
                <TextInput
                  label={languages.Name}
                  keyboardType='default'
                  autoCapitalize='words'
                  onChangeText={handleChange(FieldNames.name)}
                  onBlur={handleBlur(FieldNames.name)}
                  value={values.name}
                  error={errors.name}
                  clearButtonMode='while-editing'
                />

                <TextInput
                  label={languages.Email}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  maxLength={100}
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

                <TextInput
                  secureTextEntry
                  label={languages.ConfirmPassword}
                  maxLength={100}
                  onChangeText={handleChange(FieldNames.confirmPassword)}
                  onBlur={handleBlur(FieldNames.confirmPassword)}
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                />

                <ButtonText
                  style={styles.buttonSignUp}
                  preset='primary'
                  text={languages.SignUp}
                  textPresets='bold'
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  )
}

const defaultOptions: SignUpParams = {
  title: strings.SignUp,
}

const SignUp = registerScreen<RootStackParamList, NAV_SCREENS.SignUp>(
  NAV_SCREENS.SignUp,
  _SignUp,
  defaultOptions
)
export default SignUp

const makeStyles = (theme: Theme) =>
  ScaledSheet.create({
    CONTAINER: {
      backgroundColor: theme.colors.backgroundColor,
    },
    inner: {
      marginHorizontal: theme.spacing[5],
    },
    logoView: {},
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
      height: theme.spacing[7],
      marginVertical: theme.spacing[4],
    },
  })
