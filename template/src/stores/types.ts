import { TUser } from 'models'

export type ReduxState = {
  auth: AuthState
}

export type AuthState = {
  isLoading: boolean
  isSignOut: boolean
  user: TUser | null | undefined
  error: string | null | undefined
}
