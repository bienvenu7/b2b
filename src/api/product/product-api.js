import * as axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create(
    {
        baseURL: 'https://b2b-portal-dev.herokuapp.com/',
    }
)

const token = Cookies.get('jwt')


export const getProductTypes = (page, limit) => {
    return instance.get(`product-types?page=${page}&limit=${limit}`, {headers: {'Authorization': 'Bearer ' + token}})
}

