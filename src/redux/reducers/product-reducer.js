import { createAction, createReducer } from "@reduxjs/toolkit"

export const setProductTypes = createAction('SET_PRODUCT_TYPES')

const initialState = {
    types: []
}



const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('SET_PRODUCT_TYPES', (state = initialState, action) => {
            state.types = action.payload
        })
})

export default productReducer