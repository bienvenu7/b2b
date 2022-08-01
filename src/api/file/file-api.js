import { instance } from '../axios-instance'
import Cookies from 'js-cookie'


export const getCertificate = (productId) => {
    return instance.get(`/file/get-certificate/${productId}`, {headers: {'Authorization': 'Bearer ' + Cookies.get('jwt')}})
}