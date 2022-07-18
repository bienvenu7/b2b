import * as axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create(
    {
        baseURL: 'https://b2b-portal-dev.herokuapp.com/',
    }
)

const token = Cookies.get('jwt')


export const getBrands = (id) => {
    return instance.get(`product-types/${id}`, {headers: {'Authorization': 'Bearer ' + token}})
}

export const orderCreate = () => {
    return instance.post(`orders`, {}, {headers: {'Authorization': 'Bearer ' + token}})
}

export const createProduct = (data) =>{
    return instance.post(`products`, data, {headers: {'Authorization': 'Bearer ' + token}})
}

export const getBalance = () =>{
    return instance.get('user-tariff-packages/get-balance', {headers: {'Authorization': 'Bearer ' + token}})
}
