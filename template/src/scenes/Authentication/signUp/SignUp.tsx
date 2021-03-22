import { ButtonText } from 'components/button-text'
import Content from 'components/content/content'
import { SignUpField } from 'components/signup-field'
import { Text } from 'components/text'
import { TextField } from 'components/text-field'
import React from 'react'
import {
  Keyboard,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'
import colors from '../../../theme/colors'

interface SignUpProps {}

export default class SignUp extends React.PureComponent<SignUpProps> {
  static navigationOptions = {
    headerShown: true,
    headerTitle: translate('signup.title'),
  }

  nameField: any
  emailField: any
  phoneField: any
  addressField: any
  passwordField: any
  confirmationPasswordField: any

  componentWillUnmount() {
    const {
      rootStore: { userStore },
    } = this.props
    userStore.clearRegisterUser()
  }

  onPressRegister = async () => {
    const {
      rootStore: { userStore },
      navigation,
    } = this.props
    const success = await userStore.signUp()
    if (success) {
      navigation!.navigate('Home')
    }
  }

  onPressAvatar = async () => {
    try {
      const {
        rootStore: {
          userStore: { registerUser },
        },
      } = this.props
      const { uri } = await imageUtils.showImagePicker(!!registerUser.photoURL)
      registerUser.photoURL = uri || ''
    } catch (e) {
      // @ts-ignore
      console.tron.log('select avatar error', e)
    }
  }

  render() {
    const {
      rootStore: { userStore },
    } = this.props
    const { registerUser, errorSignUp } = userStore

    return (
      <Content style={CONTAINER} extraScrollHeight={70}>
        <View>
          <StatusBar barStyle={'default'} />
          <TouchableOpacity
            style={{ alignSelf: 'center' }}
            onPress={this.onPressAvatar}>
            <View style={IMAGE_WRAPPER}>
              <Image
                style={IMAGE}
                url={registerUser.photoURL}
                asset='ic_guest'
              />
              <Image style={ICON_PLUS} asset='ic_plus' />
            </View>
          </TouchableOpacity>

          <SignUpField
            forwardedRef={(ref: any) => {
              this.nameField = ref
            }}
            txLabel={'common.name'}
            keyboardType={'default'}
            autoCapitalize={'words'}
            maxLength={50}
            onSubmitEditing={() => {
              this.emailField && this.emailField.focus()
            }}
            onChangeText={(value) => {
              registerUser.displayName = value
            }}
            value={registerUser.displayName}
            error={errorSignUp.errorName}
          />

          <SignUpField
            forwardedRef={(ref: any) => {
              this.emailField = ref
            }}
            txLabel={'common.email'}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            maxLength={100}
            onSubmitEditing={() => {
              this.phoneField && this.phoneField.focus()
            }}
            onChangeText={(value) => {
              registerUser.email = value
            }}
            value={registerUser.email}
            error={errorSignUp.errorEmail}
          />

          <View style={PHONE_CONTAINER}>
            <Text tx={'common.phone'} preset={'bold'} style={PHONE_NATION} />
            <View style={PHONE_BIGGER_WRAPPER}>
              <View style={PHONE_WRAPPER}>
                <Text tx={'signup.vietNamNumber'} style={PHONE_LABEL} />
                <TextField
                  forwardedRef={(ref: any) => {
                    this.phoneField = ref
                  }}
                  style={PHONE_TEXT_FIELD}
                  keyboardType={'phone-pad'}
                  onSubmitEditing={() => {
                    this.addressField && this.addressField.focus()
                  }}
                  maxLength={13}
                  onChangeText={(value) => {
                    registerUser.phone = value
                  }}
                  value={registerUser.phone}
                />
              </View>
              {!!errorSignUp.errorPhone && (
                <Text
                  preset={'error'}
                  text={errorSignUp.errorPhone}
                  style={ERROR_PHONE}
                />
              )}
            </View>

            <Text style={PHONE_ERROR} />
          </View>

          <SignUpField
            forwardedRef={(ref: any) => {
              this.addressField = ref
            }}
            txLabel={'common.address'}
            keyboardType={'default'}
            autoCapitalize={'words'}
            maxLength={50}
            onSubmitEditing={() => {
              this.passwordField && this.passwordField.focus()
            }}
            onChangeText={(value) => {
              registerUser.address = value
            }}
            value={registerUser.address}
            error={errorSignUp.errorAddress}
          />

          <SignUpField
            forwardedRef={(ref: any) => {
              this.passwordField = ref
            }}
            secureTextEntry
            txLabel={'common.password'}
            maxLength={100}
            onSubmitEditing={() => {
              this.confirmationPasswordField &&
                this.confirmationPasswordField.focus()
            }}
            onChangeText={(value) => {
              registerUser.password = value
            }}
            value={registerUser.password}
            error={errorSignUp.errorPassword}
          />

          <SignUpField
            forwardedRef={(ref: any) => {
              this.confirmationPasswordField = ref
            }}
            secureTextEntry
            txLabel={'common.confirmationPassword'}
            maxLength={100}
            onChangeText={(value) => {
              registerUser.confirmationPassword = value
            }}
            value={registerUser.confirmationPassword}
            error={errorSignUp.errorConfirmationPassword}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
          />

          <ButtonText
            tx={'login.register'}
            style={BUTTON}
            textPresets={'bold'}
            textStyle={BUTTON_TEXT}
            onPress={this.onPressRegister}
          />
        </View>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  CONTAINER: {
    flex: 1,
    backgroundColor: colors.background,
  },

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

  PHONE_CONTAINER: {
    marginHorizontal: 20,
  },

  PHONE_WRAPPER: {
    flexDirection: 'row',
  },

  PHONE_LABEL: { fontSize: 14, marginTop: 4 },

  PHONE_NATION: {
    marginRight: 5,
    fontSize: 13,
    color: pallete.gray,
  },

  PHONE_TEXT_FIELD: {
    height: 35,
    borderBottomColor: pallete.gray,
    borderBottomWidth: 1,
    flex: 1,
  },
  PHONE_ERROR: { marginBottom: 5, color: pallete.red },

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
