import { createAction, createReducer } from "@reduxjs/toolkit"

export const addCategory = createAction('ADD_CATEGORY')
export const setTotal = createAction('SET_TOTAL')
export const setInvoiceLink = createAction('SET_INVOICE_LINK')
export const setCategoryError = createAction('SET_ERROR_CATEGORY')
export const setPrice = createAction('SET_PRICE')
export const setPriceForCertificate = createAction('SET_PRICE_FOR_CERTIFICATE')
export const setTotalPackage = createAction('SET_TOTAL_PACKAGE')
export const pushTotal = createAction('PUSH_TOTAL')
export const removePreviewPackage = createAction('REMOVE_PREVIEW_PACKAGE')
export const updateCurrentPackage = createAction('UPDATE_PACKAGE')
export const updateTypePackage = createAction('UPDATE_TYPE')
export const updateHoursPackage = createAction('UPDATE_HOURS')
export const updateVolumePackage = createAction('UPDATE_VOLUME')
export const initPackage = createAction('INIT_PACKAGE')

const initialState = {
  cart: {
    userTariffPackages: [],
    total: null,
    costs: [],
    totalPackage: {},
    price: {
      package: null,
      certificate: null
    },
  },
  invoice: {
    link: null
  },
  form: {
    errors: { category: null, }
  }
}



const paymentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('ADD_CATEGORY', (state = initialState, action) => {
      if (action.payload != null) {
        state.cart.userTariffPackages.push(action.payload)
      }
    })
    .addCase('SET_TOTAL', (state = initialState, action) => {
      state.cart.total = action.payload
    })
    .addCase('SET_INVOICE_LINK', (state = initialState, action) => {
      state.invoice.link = action.payload
    })
    .addCase('SET_ERROR_CATEGORY', (state = initialState, action) => {
      state.form.errors.category = action.payload
    })
    .addCase('SET_PRICE', (state = initialState, action) => {
      state.cart.price.package = action.payload
    })
    .addCase('SET_PRICE_FOR_CERTIFICATE', (state = initialState, action) => {
      state.cart.price.certificate = action.payload
    })
    .addCase('SET_TOTAL_PACKAGE', (state = initialState, action) => {
      state.cart.totalPackage = action.payload
    })
    .addCase('PUSH_TOTAL', (state = initialState, action) => {
      if (action.payload == null) {
        state.cart.costs = []
      } else {
        state.cart.costs.push(action.payload)
      }
    })
    .addCase('REMOVE_PREVIEW_PACKAGE', (state = initialState, action) => {
      state.cart.userTariffPackages.splice(action.payload, 1)
    })
    .addCase('UPDATE_PACKAGE', (state = initialState, action) => {
      if (action.payload != null) {
        state.cart.userTariffPackages[action.payload.index] = action.payload.package
      }
    })
    .addCase('UPDATE_TYPE',(state = initialState, action) => {
      state.cart.userTariffPackages[action.payload.index].productType = action.payload.type
    })
    .addCase('UPDATE_HOURS', (state = initialState, action) => {
      state.cart.userTariffPackages[action.payload.index].answerTime = action.payload.hours
    })
    .addCase('UPDATE_VOLUME', (state = initialState, action)=>{
      state.cart.userTariffPackages[action.payload.index].volume = action.payload.volume
    })
    .addCase('INIT_PACKAGE', (state = initialState, action)=>{
      state.cart.userTariffPackages.push({productType: '', answerTime: '', volume: 1, userId: action.payload, isGift: false})
    })
})

export default paymentReducer