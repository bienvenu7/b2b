import { createAction, createReducer } from "@reduxjs/toolkit";

export const setAuth = createAction("SET_AUTH");
export const setRegister = createAction("SET_REGISTER")

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

const authReducer = createReducer(initialState, (builder) => {
  builder
  .addCase("SET_AUTH", (state = initialState, action) => {
    if (action.payload != null) {
      state.isAuth = true;
      /*state.user.email = action.payload.email
                state.user.id = action.payload.id
                state.user.firstName = action.payload.firstName
                state.user.lastName = action.payload.lastName
                state.user.companyName = action.payload.companyName
                state.user.createdAt = action.payload.createdAt
                state.user.role = action.payload.role.name*/
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
  .addCase("SET_REGISTER", (state = initialState) => {
    state.isRegister = true
  })
});

export default authReducer;
