import { apiService } from './APIService'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

interface ILogin {
  username: string
  password: string
}

async function login(params: ILogin) {
  const { username, password } = params
  try {
    const response: FirebaseAuthTypes.UserCredential = auth().signInWithEmailAndPassword(
      username,
      password
    )
    return response.user
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!')
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!')
    }

    console.error(error)
    return error
  }
}
