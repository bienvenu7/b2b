import { instance } from '../axios-instance'


export const getCertificate = (productId) => {
    return instance.get(`/file/get-certificate/${productId}`)
}