import { createAction, createReducer } from '@reduxjs/toolkit';

export const setAuth = createAction('SET_AUTH');
export const setRegister = createAction('SET_REGISTER');

const initialState = {
  isAuth: false,
  isRegister: false,
  user: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    companyName: null,
    createdAt: null,
    role: null,
  },
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('SET_AUTH', (state = initialState, action) => {
      if (action.payload != null) {
        state.isAuth = true;
        state.user = action.payload;
      } else {
        state.isAuth = false;
        state.user.email = null;
        state.user.id = null;
        state.user.firstName = null;
        state.user.lastName = null;
        state.user.companyName = null;
        state.user.createdAt = null;
        state.user.role = null;
      }
    })
    .addCase('SET_REGISTER', (state = initialState) => {
      state.isRegister = true;
    });
});
