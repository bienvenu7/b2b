import { createAction, createReducer } from "@reduxjs/toolkit";

export const initializedSuccess = createAction('INITIALIZED_SUCCESS')
export const setStatusCode = createAction('SET_INFO')

const initialState = {
    appInitial: false,
    sendInfo: null
}

const appReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('INITIALIZED_SUCCESS', (state = initialState, action) => {
            state.appInitial = true
        })
        .addCase('SET_INFO', (state = initialState, action) => {
            state.sendInfo = action.payload
        })
})


export default appReducer