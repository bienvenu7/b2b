import { createAction, createReducer } from "@reduxjs/toolkit"

export const setRequests = createAction('SET_REQUESTS')
export const setResultStatuses = createAction('SET_RESULT_STATUSES')

const initialState = {
    requests: null,
    resultStatuses: null,
}



const dashboardReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('SET_REQUESTS', (state = initialState, action) => {
            state.requests = action.payload
        })
        .addCase('SET_RESULT_STATUSES', (state = initialState, action) => {
            state.resultStatuses = action.payload
        })
})

export default dashboardReducer