import { instance } from '../axios-instance'

export const getProductTypes = (page, limit) => {
    return instance.get(`product-types?page=${page}&limit=${limit}`)
}

