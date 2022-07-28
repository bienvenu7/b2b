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

export const getBalanceCert = () =>{
    return instance.get('user-certificate-packages/get-balance', {headers: {'Authorization': 'Bearer ' + token}})
}

export const uploadPhotoForProduct = (data) =>{
    //console.log(data)
    //return instance.post('file/photo', {productId: data.productId, angleId: data.angleId, photo: data.file}, {headers: {'Authorization': 'Bearer ' + token}})
    return instance.post('file/photo', data, {headers: {'Authorization': 'Bearer ' + token}})
}
