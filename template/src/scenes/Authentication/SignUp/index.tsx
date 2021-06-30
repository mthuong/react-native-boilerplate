import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert, Button, Dimensions, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ISignUp } from 'api'
import { injectValue } from 'common/func'
import regex from 'common/regex'
import { ButtonText } from 'components/ButtonText'
import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { Image } from 'components/image'
import { Text } from 'components/Text'
import { TextInput } from 'components/TextInput'
import i18n from 'localization/i18n'
import { RootStackParamList } from 'navigator/Navigator'
import { registerScreen } from 'navigator/RouteGeneric'
import { NAV_SCREENS } from 'navigator/RouteNames'
import { ScaledSheet } from 'rn-scaled-sheet'
import { authAsyncActions } from 'stores/authReducer'
import { useAppDispatch } from 'stores/hook'
import { Theme, useTheme } from 'theme'
import * as Yup from 'yup'

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

function _SignUp() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const theme = useTheme()
  const styles = makeStyles(theme)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp & { firstName: string }>()

  const onRegister = async (values: ISignUp) => {
    Alert.alert('onRegister')
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
      .email(t('error:ErrorInvalidEmail'))
      .required(t('error:ErrorRequiredEmail')),
    name: Yup.string()
      .required(t('error:ErrorRequiredName'))
      .min(3, ({ min }) => injectValue(t('error:ErrorMinName'), `${min}`))
      .max(50, ({ max }) => injectValue(t('error:ErrorMaxName'), `${max}`)),
    password: Yup.string()
      .required(t('error:ErrorRequiredPassword'))
      .matches(
        regex.passwordPattern,
        injectValue(t('error:ErrorInvalidPassword'), 8)
      )
      .min(8, injectValue(t('error:ErrorInvalidPassword'), 8)),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('error:ErrorPasswordNotMatch'))
      .required(t('error:ErrorRequiredConfirmPassword')),
  })

  console.log(errors)

  return (
    <Container>
      <Header leftIcon='arrow_back_ios' backEnabled></Header>
      <View
        style={styles.CONTAINER}
        // extraScrollHeight={theme.dimensions.scrollViewExtraHeight}
        // enableOnAndroid
      >
        <View style={styles.inner}>
          <Image
            url='https://image.freepik.com/free-vector/abstract-colorful-floral-shape-with-logo_1035-8982.jpg'
            style={styles.logo}
            containerStyle={styles.logoView}
          />
          <Text text={t('signin:SignUp')} preset='bold' style={styles.title} />
          <Text text={t('signin:SignUpSubTitle')} preset='header' />

          <View style={styles.form}>
            <Controller
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextInput
                  label={t('signin:Name')}
                  keyboardType='default'
                  autoCapitalize='words'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={error?.message}
                  clearButtonMode='while-editing'
                />
              )}
              name='name'
              rules={{
                required: {
                  value: true,
                  message: t('error:ErrorRequiredName'),
                },
                // min: {
                //   value: 3,
                //   message: injectValue(languages.ErrorMinName, `${3}`),
                // },
                // minLength: {
                //   value: 3,
                //   message: injectValue(languages.ErrorMinName, `${3}`),
                // },
                // maxLength: {
                //   value: 50,
                //   message: injectValue(languages.ErrorMaxName, `${50}`),
                // },
              }}
              defaultValue=''
            />

            {/* <TextInput
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
            /> */}

            <Button
              // style={styles.buttonSignUp}
              // preset='primary'
              title={t('signin:SignUp')}
              // textPresets='bold'
              onPress={handleSubmit(onRegister)}
            />
          </View>
        </View>
      </View>
    </Container>
  )
}

const defaultOptions: SignUpParams = {
  title: i18n.t('signin:SignUp'),
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
