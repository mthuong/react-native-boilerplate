import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { TUser } from 'models'

import { ISignIn, ISignUp } from './types'

export async function login(params: ISignIn) {
  const { email: username, password } = params
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
    await firestore().collection('users').doc(user.uid).set({
      id: user.uid,
      name: params.name,
      email: params.email,
      createdAt: Date.now(),
    })
  } catch (error) {
    console.tron.log(error.message)
    throw error
  }
}

export async function getUser(uid: string) {
  try {
    const user = await firestore().collection<TUser>('users').doc(uid).get()
    const data = user.data()
    return data
  } catch (error) {
    console.tron.log(error.message)
    throw error
  }
}

export async function signOut() {
  try {
    await auth().signOut()
  } catch (error) {
    console.tron.log(error.message)
    throw error
  }
}
