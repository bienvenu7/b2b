export const getUserTariffPackages = (state) =>{
    return state.payment.cart.userTariffPackages
}

export const getCartTotal = (state) => {
    return state.payment.cart.total
}

export const getInvoiceLink = (state) => {
    return state.payment.invoice.link
}

export const getCategoryError = (state) => {
    return state.payment.form.errors.category
}