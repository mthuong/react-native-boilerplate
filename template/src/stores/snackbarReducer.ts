import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SnackBarAction {
  message: string | undefined
  visible: boolean
}

const initialState: SnackBarAction = {
  visible: false,
  message: undefined,
}

export const snackbarSlice = createSlice({
  name: 'snackbarReducer',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<string>) => {
      state.message = action.payload
      state.visible = true
    },
    hide: (state) => {
      state.message = undefined
      state.visible = false
    },
  },
})

const snackbarReducer = snackbarSlice.reducer
export default snackbarReducer
