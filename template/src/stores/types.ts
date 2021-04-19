import { IUser } from 'services'

export type ReduxState = {
  auth: AuthState
}

export type AuthState = {
  isLoading: boolean
  isSignOut: boolean
  user: IUser | null | undefined
  error: string | null | undefined
}
