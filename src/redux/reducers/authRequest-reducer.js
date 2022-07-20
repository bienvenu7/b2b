import { createAction, createReducer } from "@reduxjs/toolkit";

export const setBrands = createAction('SET_BRANDS')
export const initOrder = createAction('INIT_ORDER')
export const setBalance = createAction('SET_BALANCE')
export const setAngles = createAction('SET_ANGLES')

const initialState = {
    brands: [],
    order: null,
    balance: [],
    angles: [],
}

const authRequestReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('SET_BRANDS', (state = initialState, action) => {
            state.brands = action.payload
        })
        .addCase('INIT_ORDER', (state=initialState, action)=>{
            state.order = action.payload
        })
        .addCase('SET_BALANCE', (state=initialState, action)=>{
            state.balance = action.payload
        })
        .addCase('SET_ANGLES', (state = initialState, action) => {
            state.angles = action.payload
        })
})


export default authRequestReducer