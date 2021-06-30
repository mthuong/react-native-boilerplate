import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native'
import { ISignIn } from 'api'
import { Image } from 'components/image'
import { Text } from 'components/Text'
import { RootStackParamList } from 'navigator/Navigator'
import { navigate } from 'navigator/RootNavigation'
import { registerScreen } from 'navigator/RouteGeneric'
import { NAV_SCREENS } from 'navigator/RouteNames'
import { ScaledSheet } from 'rn-scaled-sheet'
import { authAsyncActions } from 'stores/authReducer'
import { useAppDispatch } from 'stores/hook'
import { Theme, useTheme } from 'theme'

import { LoginForm } from './components/LoginForm'

export type SignInParams = undefined

function _SignIn() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const theme = useTheme()
  const styles = makeStyles(theme)

  const initialValues: ISignIn = {
    email: 'tom@gmail.com',
    password: 'Init123456',
  }

  const onSignIn = useCallback(
    (values: ISignIn) => {
      console.tron.log('Sign in')

      dispatch(authAsyncActions.signIn(values))
    },
    [dispatch]
  )

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}>
      <Image
        url='https://image.freepik.com/free-vector/abstract-colorful-floral-shape-with-logo_1035-8982.jpg'
        style={styles.logo}
        containerStyle={styles.logoView}
      />
      <Text text={t('signin:SignIn')} preset='bold' />
      <Text text={t('signin:SignInSubTitle')} preset='header' />

      <LoginForm onSubmit={onSignIn} />

      <View style={styles.spacingView}>
        <Text>{t('signin:DontHaveAccount')}</Text>
        <TouchableOpacity
          onPress={() => {
            navigate(NAV_SCREENS.SignUp)
          }}>
          <Text style={styles.textSignUp} text={t('signin:SignUp')} />
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

const makeStyles = (theme: Theme) =>
  ScaledSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
    },
    container: {
      flexGrow: 1,
      paddingHorizontal: theme.spacing[5],
    },
    logoView: {
      paddingTop: theme.spacing[6],
    },
    logo: {
      alignSelf: 'center',
      aspectRatio: 1,
      height: Dimensions.get('window').height * 0.2,
    },
    spacingView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      bottom: theme.dimensions.paddingBottom,
      marginTop: 50, // I dont know why need add margin here to prevent spacing view does not overlap form view
    },
    textSignUp: {
      color: theme.colors.primaryButton,
    },
  })
