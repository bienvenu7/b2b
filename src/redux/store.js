import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reducers/app-reducer'
import authReducer from './reducers/auth-reducer'

export const store = configureStore({
  reducer: {
      auth: authReducer,
      app: appReducer,
  }
})