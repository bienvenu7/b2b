import * as axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create(
    {
        baseURL: 'https://b2b-portal-dev.herokuapp.com/',
    }
)

const token = Cookies.get('jwt')


export const postInvoices = (data) => {
    return instance.post('invoices', data, {headers: {'Authorization': 'Bearer ' + token}})
}

export const cartTotal = (data) => {
    return instance.post('invoices/get-cart-total', data, {headers: {'Authorization': 'Bearer ' + token}})
}

