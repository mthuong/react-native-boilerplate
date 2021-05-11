import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import authReducer from './authReducer'
import snackbarReducer from './snackbarReducer'
import conversationsReducer from './conversations/conversationsReducer'
import usersReducer from './conversations/usersReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
  conversations: conversationsReducer,
  users: usersReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: {
      ignoredActions: ['signUp/fulfilled', 'signIn/fulfilled'],
      // Ignore these field paths in all actions
      ignoredActionPaths: [],
      // Ignore these paths in the state
      ignoredPaths: [],
    },
  }),
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
