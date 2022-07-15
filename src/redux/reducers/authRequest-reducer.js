import { createAction, createReducer } from "@reduxjs/toolkit";

export const setBrands = createAction('SET_BRANDS')
export const initOrder = createAction('INIT_ORDER')

const initialState = {
    brands: [],
    order: null
}

const authRequestReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('SET_BRANDS', (state = initialState, action) => {
            state.brands = action.payload
        })
        .addCase('INIT_ORDER', (state=initialState, action)=>{
            state.order = action.payload
        })
})


export default authRequestReducer