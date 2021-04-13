import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

export interface ISignIn {
  username?: string
  password?: string
}

export async function login(params: ISignIn) {
  const { username, password } = params
  try {
    const response: FirebaseAuthTypes.UserCredential = await auth().signInWithEmailAndPassword(
      username || '',
      password || ''
    )
    return response.user
  } catch (error) {
    // if (error.code === 'auth/email-already-in-use') {
    // error.message = 'That email address is already in use!'
    // }

    // if (error.code === 'auth/invalid-email') {
    // error.message = 'That email address is invalid!'
    // }

    console.tron.log(error)
    throw error
  }
}

export interface ISignUp {
  email: string
  password: string
  confirmPassword: string
  name: string
}

export async function signUp(params: ISignUp) {
  const { email, password } = params
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password
    )

    return response.user
  } catch (error) {
    // if (error.code === 'auth/email-already-in-use') {
    //   console.tron.log(error.message, 'That email address is already in use!')
    // }

    // if (error.code === 'auth/invalid-email') {
    //   console.tron.log('That email address is invalid!')
    // }
    console.tron.log(error)
    throw error
  }
}

export async function updateUser(
  user: FirebaseAuthTypes.User,
  params: ISignUp
) {
  try {
    await user.updateProfile({
      displayName: params.name,
    })
  } catch (error) {
    console.tron.log(error.message)
    throw error
  }
}
