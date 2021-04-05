import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from '../services'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { RootState } from './store'
import { snackbarSlice } from '.'

interface AuthState {
  isLoading: boolean
  isSignOut: boolean
  userToken: string | null | undefined
  error: string | null | undefined
}

const initialState: AuthState = {
  isLoading: true,
  isSignOut: false,
  userToken: null,
  error: undefined,
}

interface SignInAction {
  username?: string
  password?: string
}

export const signIn = createAsyncThunk('signIn', async (body: SignInAction, { rejectWithValue, dispatch }) => {
  try {
    const response = await userService.login({ username: body.username, password: body.password })
    return response
  } catch (error) {
    dispatch(snackbarSlice.actions.show(error.message))

    return rejectWithValue(error.message)
  }
})

export const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    // signIn: (state, action: PayloadAction<SignInAction>) => {
    //   state.userToken = action.payload.username
    // },
    signOut: (state) => {
      state.userToken = undefined
    },
  },
  extraReducers: {
    [signIn.fulfilled.type]: (state, action: PayloadAction<FirebaseAuthTypes.UserCredential>) => {
      console.tron.log(action)
    },
    [signIn.rejected.type]: (state, action: PayloadAction<Error>) => {
      console.tron.log(action)
    }
  }
})

const authReducer = authSlice.reducer
export default authReducer