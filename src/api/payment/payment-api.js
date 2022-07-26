import { instance } from '../axios-instance'

export const postInvoices = (data) => {
    return instance.post('invoices', data)
}

export const cartTotal = (data) => {
    return instance.post('invoices/get-cart-total', data)
}

export const getPrice = (data) => {
    if (data == null){
        return instance.get(`tariff-packages/get-price`)
    }
    return instance.get(`tariff-packages/get-price?productTypeId=${data.id}&volume=${data.volume}&answerTime=${data.answerTime}`)
}
