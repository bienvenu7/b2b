import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reducers/app-reducer'
import authReducer from './reducers/auth-reducer'
import paymentReducer from './reducers/payment-reducer'
import productReducer from './reducers/product-reducer'

export const store = configureStore({
  reducer: {
      auth: authReducer,
      app: appReducer,
      payment: paymentReducer,
      products: productReducer
  }
})