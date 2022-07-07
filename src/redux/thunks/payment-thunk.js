import { postInvoices } from "../../api/payment/payment-api"

export const postInvoiceThunk = (data) => async (dispatch) => {
    const response = await postInvoices(data)
}