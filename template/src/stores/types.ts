import { TUser } from 'models/user'

export type ReduxState = {
  auth: AuthState
}

export type AuthState = {
  isLoading: boolean
  isSignOut: boolean
  user: TUser | null | undefined
  error: string | null | undefined
}
