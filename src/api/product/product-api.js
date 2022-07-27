import { instance } from '../axios-instance'

export const getProductTypes = (page, limit) => {
    return instance.get(`product-types?page=${page}&limit=${limit}`)
}

export const getProduct = (id) => {
    return instance.get(`products/${id}`)
}

export const getProducts = (data) => {
    return instance.post('products/get-products', data)
}

export const getResultsStatuses = () => {
    return instance.get('result-statuses', {params: {page: 1, limit: 100}})
}

export const getAllAngles = () => {
    return instance.get('angles', {params: {page: 1, limit: 100}})
}
