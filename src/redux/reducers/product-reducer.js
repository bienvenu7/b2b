import { createAction, createReducer } from '@reduxjs/toolkit';

export const setProductTypes = createAction('SET_PRODUCT_TYPES');
export const setProduct = createAction('SET_PRODUCT');
export const setProducts = createAction('SET_PRODUCTS');
export const setResultStatuses = createAction('SET_RESULT_STATUSES');
export const setAnglesList = createAction('SET_ANGLES_LIST');
export const setBrandsList = createAction('SET_BRANDS');
export const setCheckStatuses = createAction('SET_CHECK_STATUSES');

const initialState = {
  types: [],
  product: null,
  products: null,
  resultStatuses: null,
  anglesList: null,
  brandsList: null,
  checkStatuses: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('SET_PRODUCT_TYPES', (state = initialState, action) => {
      state.types = action.payload;
    })
    .addCase('SET_PRODUCT', (state = initialState, action) => {
      state.product = action.payload;
    })
    .addCase('SET_PRODUCTS', (state = initialState, action) => {
      state.products = action.payload;
    })
    .addCase('SET_RESULT_STATUSES', (state = initialState, action) => {
      state.resultStatuses = action.payload;
    })
    .addCase('SET_ANGLES_LIST', (state = initialState, action) => {
      state.anglesList = action.payload;
    })
    .addCase('SET_BRANDS', (state = initialState, action) => {
      state.brandsList = action.payload;
    })
    .addCase('SET_CHECK_STATUSES', (state = initialState, action) => {
      state.checkStatuses = action.payload;
    });
});
