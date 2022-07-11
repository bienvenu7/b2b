import { cartTotal, postInvoices } from "../../api/payment/payment-api"
import { setInvoiceLink, setTotal } from "../reducers/payment-reducer"

export const postInvoiceThunk = (data) => async (dispatch) => {
    const response = await postInvoices(data)
    response.status == 201 && dispatch(setInvoiceLink(response.data))
}

export const getCartTotalThunk = (data) => async (dispatch) => {
    const response = await cartTotal(data)
    response.status == 201 && dispatch(setTotal(response.data.total))
}