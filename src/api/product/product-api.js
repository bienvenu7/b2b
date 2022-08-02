import { instance } from '../axios-instance'
import Cookies from 'js-cookie'

export const getProductTypes = (page, limit) => {
    return instance.get(`product-types?page=${page}&limit=${limit}`, {headers: {'Authorization': 'Bearer ' + Cookies.get('jwt')}})
}

export const getProduct = (id) => {
    return instance.get(`products/${id}`, {headers: {'Authorization': 'Bearer ' + Cookies.get('jwt')}})
}

export const getProducts = (data) => {
    return instance.post('products/get-products', {...data, page: 1, limit:100}, {headers: {'Authorization': 'Bearer ' + Cookies.get('jwt')}} )
}

export const getResultsStatuses = () => {
    return instance.get('result-statuses', {params: {page: 1, limit: 100},headers: {'Authorization': 'Bearer ' + Cookies.get('jwt')}})
}

export const getAllAngles = () => {
    return instance.get('angles', {params: {page: 1, limit: 100}, headers: {'Authorization': 'Bearer ' + Cookies.get('jwt')}})
}

export const addCertificate = (product) => {
    return instance.patch(`products/add-certificate/${product.id}`, {headers: {'Authorization': 'Bearer ' + Cookies.get('jwt')}})
}

export const updateProduct = (productId, data) => {
    return instance.patch(`products/${productId}`, data, {headers: {'Authorization': 'Bearer ' + Cookies.get('jwt')}})
}

export const getBrandsList = (page, limit) =>{
        return instance.get('brands', {params: {limit: limit ? limit : 200, page: page ? page : 1
        }, headers: {'Authorization': 'Bearer ' + Cookies.get('jwt')}}) 
}

export const getCheckStatuses = () =>{
        return instance.get('check-statuses', {headers: {'Authorization': 'Bearer ' + Cookies.get('jwt')}})
}