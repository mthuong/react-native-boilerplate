export type IUser = {
  uid: string
  name: string
  email: string
}

export type ISignUp = {
  email: string
  password: string
  confirmPassword: string
  name: string
}

export type ISignIn = {
  email?: string
  password?: string
}
