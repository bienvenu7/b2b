import { createAction, createReducer } from "@reduxjs/toolkit";

export const setCertificateLink = createAction('SET_CERTIFICATE_LINK')

const initialState = {
    certificateLink: []
}

const filesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('SET_CERTIFICATE_LINK', (state = initialState, action) => {
            state.certificateLink = true
        })
})


export default filesReducer