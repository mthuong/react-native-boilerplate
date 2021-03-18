import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isLoading: boolean
  isSignOut: boolean
  userToken: string | null | undefined
}

const initialState: AuthState = {
  isLoading: true,
  isSignOut: false,
  userToken: null,
}

interface SignInAction {
  username: string
  password: string
  isRememberMe: boolean
}

export const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<SignInAction>) => {},
  },
})
