import { cartTotal, getPrice, postInvoices } from "../../api/payment/payment-api"
import { setInvoiceLink, setPrice, setTotal } from "../reducers/payment-reducer"

export const postInvoiceThunk = (data) => async (dispatch) => {
    const response = await postInvoices(data)
    response.status == 201 && dispatch(setInvoiceLink(response.data))
}

export const getCartTotalThunk = (data) => async (dispatch) => {
    const response = await cartTotal(data)
    response.status == 201 && dispatch(setTotal(response.data.total))
}

export const getPriceThunk = (data) => async (dispatch) => {
    if (data == null){
        const response = await getPrice(data)
        response.status == 200 && dispatch(setPrice({package: null, certificate: response.data.certificate}))
    }
    else{
    const response = await getPrice(data)
    response.status == 200 && dispatch(setPrice({package: response.data.tariffPackage.price, certificate: response.data.certificate}))
    }
}