import { createAction, createReducer } from "@reduxjs/toolkit"

export const setAuth = createAction('SET_AUTH')

const initialState = {
    isAuth: false,
}

const authReducer = createReducer( initialState, (builder) => {
    builder
    .addCase('SET_AUTH', (state=initialState, action) =>{
        state.isAuth = !state.isAuth
    })
})

export default authReducer