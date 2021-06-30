import * as React from 'react'
import isEqual from 'react-fast-compare'
import { Controller, useForm } from 'react-hook-form'
import { WithTranslation, withTranslation } from 'react-i18next'
import { View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { ISignIn } from 'api'
import { injectValue } from 'common/func'
import regex from 'common/regex'
import { ButtonText } from 'components/ButtonText'
import { TextInput } from 'components/TextInput'
import { ScaledSheet } from 'rn-scaled-sheet'
import { Theme, useTheme } from 'theme'
import { object, string } from 'yup'

export type LoginFormProps = {
  onSubmit: (values: ISignIn) => void
} & WithTranslation

function _LoginForm(props: LoginFormProps) {
  const { onSubmit, t } = props

  const theme = useTheme()
  const styles = makeStyles(theme)

  const signInSchema = React.useMemo(
    () =>
      object().shape({
        email: string()
          .email(t('error:ErrorInvalidEmail'))
          .required(t('error:ErrorRequiredEmail')),
        password: string()
          .required(t('error:ErrorRequiredPassword'))
          .matches(
            regex.passwordPattern,
            injectValue(t('error:ErrorInvalidPassword'), 8)
          )
          .min(8, injectValue(t('error:ErrorInvalidPassword'), 8)),
      }),
    [t]
  )
  const { control, handleSubmit } = useForm<ISignIn>({
    resolver: yupResolver(signInSchema),
  })

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name='email'
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextInput
            label={t('Email')}
            error={error?.message}
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            clearButtonMode='while-editing'
          />
        )}
      />
      <Controller
        control={control}
        name='password'
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextInput
            secureTextEntry
            label={t('Password')}
            maxLength={100}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={error?.message}
          />
        )}
      />
      <ButtonText
        preset='primary'
        textPresets='bold'
        text={t('SignIn')}
        onPress={handleSubmit(onSubmit)}
        style={styles.buttonSignIn}
      />
    </View>
  )
}

export const LoginForm = React.memo(withTranslation()(_LoginForm), isEqual)

const makeStyles = (theme: Theme) =>
  ScaledSheet.create({
    form: {},
    buttonSignIn: {
      marginTop: theme.spacing[5],
    },
  })
