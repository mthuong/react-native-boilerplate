export interface IUser {
  uid: string
  name: string
  email: string
}

export interface ISignUp {
  email: string
  password: string
  confirmPassword: string
  name: string
}

export interface ISignIn {
  username?: string
  password?: string
}
