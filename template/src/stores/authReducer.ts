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
  username?: string
  password?: string
}

export const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<SignInAction>) => {
      state.userToken = action.payload.username
    },
    signOut: (state) => {
      state.userToken = undefined
    }
  },
})

export default authReducer.reducer
