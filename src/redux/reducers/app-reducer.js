import { createAction, createReducer } from "@reduxjs/toolkit";

export const initializedSuccess = createAction('INITIALIZED_SUCCESS')

const initialState = {
    appInitial: false
}

const appReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('INITIALIZED_SUCCESS', (state = initialState, action) => {
            state.appInitial = true
        })
})


export default appReducer