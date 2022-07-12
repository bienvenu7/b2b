import { cartTotal, getPrice, postInvoices } from "../../api/payment/payment-api"
import { setInvoiceLink, setPrice, setTotal } from "../reducers/payment-reducer"

export const postInvoiceThunk = (data) => async (dispatch) => {
    const response = await postInvoices(data)
    response.status == 201 && dispatch(setInvoiceLink(response.data))
}

export const getCartTotalThunk = (data) => async (dispatch) => {
    console.log(data)
    const response = await cartTotal(data)
    response.status == 201 && dispatch(setTotal(response.data.total))
}

export const getPriceThunk = (data) => async (dispatch) => {
    const response = await getPrice(data)
    response.status == 200 && dispatch(setPrice(response.data.price))
}