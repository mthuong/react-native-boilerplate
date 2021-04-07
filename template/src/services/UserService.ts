import { apiService } from './APIService'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

interface ILogin {
  username?: string
  password?: string
}

export async function login(params: ILogin) {
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
