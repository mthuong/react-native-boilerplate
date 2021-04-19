import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import authReducer from './authReducer'
import snackbarReducer from './snackbarReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: {
      ignoredActions: ['signUp/fulfilled', 'signIn/fulfilled'],
    },
  }),
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
