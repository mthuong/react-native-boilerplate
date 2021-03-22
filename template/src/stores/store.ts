import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import authReducer from './authReducer';

const rootReducer = combineReducers({
  counterReducer,
  authReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
