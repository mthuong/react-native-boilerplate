import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from '../api'
import { snackbarSlice } from './snackbarReducer'
import { ISignIn, ISignUp } from 'api/types'
import { AuthState } from './types'
import { TUser } from 'models/user'
import { listenForConversationAdded } from './conversations/conversationsFunctions'
import { listenForUserAdded } from './conversations/usersFunctions'

const initialState: AuthState = {
  isLoading: true,
  isSignOut: false,
  user: null,
  error: undefined,
}

const signIn = createAsyncThunk(
  'signIn',
  async (body: ISignIn, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.login({
        email: body.email,
        password: body.password,
      })

      return response
    } catch (error) {
      dispatch(snackbarSlice.actions.show(error.message))

      return rejectWithValue(error.message)
    }
  }
)

const signUp = createAsyncThunk(
  'signUp',
  async (body: ISignUp, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.signUp(body)

      // Update user profile
      await userService.updateUser(response, body)

      return response
    } catch (error) {
      dispatch(snackbarSlice.actions.show(error.message))

      return rejectWithValue(error.message)
    }
  }
)

const signOut = createAsyncThunk(
  'signOut',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await userService.signOut()
    } catch (error) {
      dispatch(snackbarSlice.actions.show(error.message))

      return rejectWithValue(error.message)
    }
  }
)

const getUser = createAsyncThunk(
  'getUser',
  async (uid: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.getUser(uid)
      // Load conversations
      dispatch(listenForConversationAdded(response))
      // Load users
      dispatch(listenForUserAdded())
      return response
    } catch (error) {
      dispatch(snackbarSlice.actions.show(error.message))

      return rejectWithValue(error.message)
    }
  }
)

export const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    // signIn: (state, action: PayloadAction<SignInAction>) => {
    //   state.userToken = action.payload.username
    // },
    finishLoading: (state) => {
      state.isLoading = false
    },
  },
  extraReducers: {
    // [signIn.fulfilled.type]: (
    //   state,
    //   action: PayloadAction<FirebaseAuthTypes.User>
    // ) => {
    // state.user = action.payload.email
    // },
    // [signIn.rejected.type]: (state, action: PayloadAction<Error>) => {
    //   console.tron.log(action)
    // },

    // [signUp.fulfilled.type]: (
    //   state,
    //   action: PayloadAction<FirebaseAuthTypes.User>
    // ) => {
    // state.user = action.payload.email
    // },

    [getUser.fulfilled.type]: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload
      state.isLoading = false
    },
    [getUser.rejected.type]: (state) => {
      state.user = undefined
      state.isLoading = false
    },

    [signOut.fulfilled.type]: (state) => {
      state.user = undefined
      state.isLoading = false
    },
  },
})

const authReducer = authSlice.reducer
export default authReducer

export const authAsyncActions = { signIn, signUp, getUser, signOut }
